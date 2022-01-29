<script>
  import {
    onMount,
    onDestroy,
    beforeUpdate,
    createEventDispatcher,
  } from "svelte";
  import { replaceFlag, editorjsInitSuccess } from "../../storesold";
  import EditorJS from "@editorjs/editorjs";
  import Marker from "@editorjs/marker";
  export let active = true;
  export let data = [];
  let editor;
  const dispatch = createEventDispatcher();
  onMount(() => {
    console.log("onMount");
    editor = initFn();
    editor.isReady
      .then(() => {
        console.log("Editor.js is ready to work!");
        editorjsInitSuccess.set(true);
        /** Do anything you need after editor initialization */
      })
      .catch(reason => {
        console.log(`Editor.js initialization failed because of ${reason}`);
      });
    window.addEventListener("hashchange", routeChange, false);
  });

  onDestroy(() => {
    console.log("onDestroy");
    window.removeEventListener("hashchange", routeChange, false);
  });
  beforeUpdate(async () => {
    // determine whether we should auto-scroll
    // once the DOM is updated...
  });

  async function saveEditor() {
    const outputdata = await editor.save();
    dispatch("saveEditor", outputdata);
  }

  const routeChange = () => {
    console.log(data);
    if (!data || !data.blocks.length) {
      console.log("coming");
      editor.destroy();
      editor = initFn();
      return;
    }
    editor.blocks.render(data);
  };
  $: {
    if ($editorjsInitSuccess && $replaceFlag) {
      console.log($editorjsInitSuccess);
      console.log("replaceFlag = " + $replaceFlag);
      console.log("这里是editorjs 输出的");
      (async () => {
        await editor.blocks.render(data);
        replaceFlag.set(false);
      })();
    }
  }
  const initFn = () => {
    return new EditorJS({
      holder: "editorjs",
      inlineToolbar: ["bold", "italic"],
      tools: {
        Marker: {
          class: Marker,
          shortcut: "CMD+SHIFT+M",
        },
      },
      onReady: () => {
        console.log("Editor.js is ready to work2!");
      },

      onChange: () => {
        saveEditor();
        console.log("Now I know that Editor's content changed!");
      },
      autofocus: true,
      placeholder: "让我们开始一个伟大的故事吧！",
      data: data,
      readOnly: active,
    });
  };

</script>

<div id="editorjs" />

<style global>
  .ce-block--selected .ce-block__content {
    background: var(--cds-ui-01, #f4f4f4);
  }

</style>
