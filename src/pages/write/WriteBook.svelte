<script lang="ts">
  import RoleInterface from "src/schema/role/role.interface";
  import Grid from "carbon-components-svelte/src/Grid/Grid.svelte";
  import ToolBar from "./component/ToolBar.svelte";
  import { editorjsInitFn } from "./utils/editorjsInitFn";
  import { defaltConent, SceneClass } from "src/schema/scene/scene.class";
  import { state } from "src/db/storeState";
  import { scenes } from "src/db/storeScenes";
  import { get } from "svelte/store";
  import { dialogFn, PropObject } from "src/components/Dialog/Dialog";
  import moment from "moment";
  import { isSaved } from "src/store";
  import { roles } from "src/db/storeRoles";
  import { roleTootip } from "./utils/roleTooTip";
  import { sanitizerHtml } from "./utils/sanitizerHtml";
  import { cleanTrimFn } from "./utils/cleanTrimFn";
  import SearchComponent from "./Search.svelte";
  import { onDestroy, onMount } from "svelte";
  import { autoSymbolFn } from "./utils/autoSymbol";
  import { scrollCenterFn } from "./utils/scrollCenter";
  let editorElement: HTMLElement;
  let searchShow = false;
  let currentScene = new SceneClass();
  $: filteredRoles = $roles.filter(
    (role: RoleInterface) => role.project == $state.currentProject
  );
  const autoSymbol = (e: any) => autoSymbolFn(e, editor);
  onMount(() => {
    setTimeout(async () => {
      editorElement.addEventListener("input", autoSymbol, false);
    }, 1000);
  });
  onDestroy(() => {
    editorElement.removeEventListener("input", autoSymbol, false);
  });
  const cleanTrimButttonFn = async () => {
    let outputdata = await editor.save();
    outputdata = cleanTrimFn(outputdata);
    scenes.setSceneContent(currentScene.id, outputdata);
    const DialogConfig: PropObject = {
      kind: "info",
      title: "排版成功",
      subtitle: currentScene.title,
      caption: moment().format("YYYY-MM-DD-HH:mm:ss"),
    };
    dialogFn(DialogConfig);
    await editor.render(currentScene.content);
  };

  const saveEditorAutoFn = async () => {
    scrollCenterFn(editor);
    isSaved.set(true);
    let outputdata = await editor.save();
    outputdata = sanitizerHtml(outputdata, editor);
    scenes.setSceneContent(currentScene.id, outputdata);
    setTimeout(() => {
      isSaved.set(false);
    }, 1000);
  };
  const saveEdiotrManualFn = async () => {
    let outputdata = await editor.save();
    outputdata = sanitizerHtml(outputdata, editor);
    scenes.setSceneContent(currentScene.id, outputdata);
    const DialogConfig: PropObject = {
      kind: "success",
      title: "保存成功",
      subtitle: currentScene.title,
      caption: moment().format("YYYY-MM-DD-HH:mm:ss"),
    };
    dialogFn(DialogConfig);
    await editor.render(currentScene.content);
    await editor.caret.setToNextBlock();
    setTimeout(() => {
      filteredRoles.map((role: RoleInterface) => {
        roleTootip(role);
      });
    }, 1000);
  };
  const editorReRenderFn = async () => {
    try {
      const data = currentScene.content;
      await editor.blocks.render(data);
    } catch (error) {
      console.log(error);
    }
  };
  const edirotReolaceSaverFn = async () => {
    const outputdata = await editor.save();
    scenes.setSceneContent(currentScene.id, outputdata);
  };
  const editor = editorjsInitFn(saveEditorAutoFn);

  $: {
    try {
      if (
        $scenes.length &&
        $state.currentScene &&
        currentScene.id !== $state.currentScene
      ) {
        currentScene = get(scenes).find(
          scene => scene.id == $state.currentScene
        );
        editor.isReady.then(() => {
          if (!currentScene.content.blocks.length) {
            editor.blocks.render(defaltConent);
          }
          editor.blocks.render(currentScene.content);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

</script>

<Grid id="editpane">
  <ToolBar {saveEdiotrManualFn} {cleanTrimButttonFn} bind:searchShow />
  <SearchComponent
    show={searchShow}
    {currentScene}
    {editorReRenderFn}
    {edirotReolaceSaverFn} />
  <div class="editpane">
    <div bind:this={editorElement} id="editorjs" />
  </div>
</Grid>
