<script lang="ts">
  import RoleInterface from "src/schema/role/role.interface";
  import EditorJS from "@editorjs/editorjs";
  import Marker from "@editorjs/marker";
  import Undo from "editorjs-undo";
  import DragDrop from "editorjs-drag-drop";
  import Underline from "@editorjs/underline";
  import Flag16 from "carbon-icons-svelte/lib/Flag16";
  import GroupObjectsSave16 from "carbon-icons-svelte/lib/GroupObjectsSave16";
  import CenterSquare16 from "carbon-icons-svelte/lib/CenterSquare16";
  import Grid from "carbon-components-svelte/src/Grid/Grid.svelte";
  import Search16 from "carbon-icons-svelte/lib/Search16";
  import CreateScene from "./../components/Sidebar/component/CreateScene.svelte";
  import AlignBoxMiddleCenter16 from "carbon-icons-svelte/lib/AlignBoxMiddleCenter16";
  import {
    searchShortCutFn,
    saveChapterShortCutFn,
    creatNewChapterShortCutFn,
  } from "./../shortcut/index.js";
  import Search from "./Write/Search.svelte";
  import { push } from "svelte-spa-router";
  import { dialogFn, PropObject } from "./../components/Dialog/Dialog";
  import { onMount, onDestroy, beforeUpdate } from "svelte";
  import { _ } from "svelte-i18n";
  import Overview from "./Write/Overview.svelte";
  import Placeholder from "../shared/Placeholder.svelte";
  import Button from "carbon-components-svelte/src/Button/Button.svelte";
  import TipCards from "./Write/cards.svelte";
  import Tag from "carbon-components-svelte/src/Tag/Tag.svelte";
  import { isRunningElectron } from "../bridge";
  import Tooltip from "../components/Editorjs/plugins/tooTip/index";
  import TipCard from "../components/Editorjs/plugins/tipCard/index";

  import { state } from "src/db/storeState";
  import { scenes } from "src/db/storeScenes";
  import moment from "moment";
  import { roles } from "src/db/storeRoles";
  import findandreplacedomtext from "findandreplacedomtext";

  type TypeParams = {
    sceneId: string;
  };
  export let params: TypeParams;
  let readonly = false;
  let editor: EditorJS;
  let currentScene;
  let showCards = false;
  let filteredCards = [];
  let showSearchComponet = false;
  let createSceneshow = false;
  if (isRunningElectron) {
    console.log("runing in isRunningElectron");
  }

  // $: {
  //   if ($state.currentProject) {
  //     currentScene = get(projects).filter(
  //       (cur: ProjectInterface) => cur.id === $state.currentProject
  //     )[0];
  //   }
  // }

  // $: {
  //   try {
  //     console.log(params);

  //     console.log(filteredCards);
  //     currentScene = $scenes.find(scene => scene.id == params.sceneId);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // $: {
  //   // if (!currentScene) push("/book");
  //   try {
  //     state.setCurrentTitle(
  //       params.sceneId ? currentScene.title : "No scene selected!"
  //     );
  //   } catch (error) {
  //     // push("/book");
  //   }
  // }
  // beforeUpdate(() => {
  //   if (!currentScene) push("/book");
  // });

  // const routeChange = () => {
  //   // if(!currentScene || !currentScene.content) return push("/book")
  //   try {
  //     const data = currentScene.content;
  //     if (!data || !data.blocks.length) {
  //       console.log("coming");
  //       editor.destroy();
  //       editor = initFn();
  //       return;
  //     }
  //     editor.blocks.render(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const editorReRenderFn = async () => {
  //   try {
  //     const data = currentScene.content;
  //     await editor.blocks.render(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const initFn = () => {
    return new EditorJS({
      holder: "editorjs",
      // inlineToolbar: ["bold", "italic", "Marker"],
      tools: {
        Marker: {
          class: Marker,
          shortcut: "CMD+SHIFT+M",
        },
        underline: {
          class: Underline,
        },
        tooltip: {
          class: Tooltip,
          config: {
            location: "bottom",
            highlightColor: "#FFEFD5",
            underline: true,
            backgroundColor: "#154360",
            textColor: "#FDFEFE",
          },
        },
      },
      onReady: () => {
        new Undo({ editor });
        new DragDrop(editor);
        console.log("Editor.js is ready to work2!");
      },
      onChange: () => {
        // saveEditorFn();
      },
      autofocus: true,
      placeholder: "让我们开始一个伟大的故事吧！",
      // data: currentScene.content,
      readOnly: readonly,
    });
  };
  onMount(() => {
    // if (!currentScene) push("/book");
    try {
      editor = initFn();
    } catch (error) {
      console.log(error);
    }
    // window.addEventListener("hashchange", routeChange, false);
  });
  // onDestroy(() => {
  //   cmdF.remove();
  //   cmdS.remove();
  //   cmdN.remove();
  //   window.removeEventListener("hashchange", routeChange, false);
  // });

  // const saveEditorFn = async () => {
  //   const outputdata = await editor.save().then();
  //   console.log(editor.sanitizer);
  //   console.log(outputdata);
  //   scenes.setSceneContent(params.sceneId, outputdata);
  //   filteredCards = $roles.filter(
  //     (role: RoleInterface) =>
  //       role.showTip && role.project === $state.currentProject
  //   );
  //   console.log(filteredCards);
  // };
  // const selfSaveEditorFn = async () => {
  //   console.log("saved");
  //   const outputdata = await editor.save();
  //   scenes.setSceneContent(params.sceneId, outputdata);
  //   const DialogConfig: PropObject = {
  //     kind: "success",
  //     title: "创建成功",
  //     subtitle: $state.currentTitle,
  //     caption: moment().format("YYYY-MM-DD-HH:mm:ss"),
  //   };
  //   dialogFn(DialogConfig);
  // };

  // const edirotReolaceSaverFn = async () => {
  //   const outputdata = await editor.save();
  //   scenes.setSceneContent(params.sceneId, outputdata);
  // };
  // let cmdF = searchShortCutFn(() => (showSearchComponet = true));
  // let cmdS = saveChapterShortCutFn(selfSaveEditorFn);
  // let cmdN = creatNewChapterShortCutFn(() => (createSceneshow = true));

</script>

<!-- <TipCards {showCards} {filteredCards} />
 <Search
   bind:show={showSearchComponet}
   {editorReRenderFn}
   {edirotReolaceSaverFn} /> -->
{#if currentScene}
  <CreateScene
    bind:show={createSceneshow}
    bind:chapter={currentScene.chapter} />
  <Grid condensed>
    {#if $state.currentProject}
      {#if params.sceneId !== null}
        <div class="editorToolbar">
          <div style="justify-content:space-between" class="inner">
            <div>
              <Button
                icon={AlignBoxMiddleCenter16}
                size="small"
                kind="ghost"
                on:click={() => (createSceneshow = !createSceneshow)}
                iconDescription="新建章节「⌘ N」" />
              <!-- <Button
                icon={GroupObjectsSave16}
                size="small"
                kind="ghost"
                on:click={selfSaveEditorFn}
                iconDescription="保存「⌘ S」大部分时候，您不需要点击此按钮，小密圈会在您每次输入后自动保存" /> -->
              <!-- <Button
                icon={CenterSquare16}
                size="small"
                kind="ghost"
                on:click={() => console.log(2121)}
                iconDescription={$_('write.toolbar.focus')} />
              <Button
                icon={Search16}
                size="small"
                kind="ghost"
                on:click={() => (showSearchComponet = !showSearchComponet)}
                iconDescription="搜索替换「⌘ F」" /> -->
            </div>
            {#if filteredCards.length > 0}
              <Button
                icon={Flag16}
                size="small"
                kind="ghost"
                on:click={() => (showCards = true)}
                iconDescription="提示卡：会根据文中的关键字匹配提示卡片中的信息" />
            {/if}
            <!-- <Tag>字数：{countWordsFn(currentScene)}</Tag> -->
          </div>
        </div>

        <div class="editpane">
          <h1
            contenteditable
            bind:textContent={currentScene.title}
            on:input={() => scenes.setSceneTitle(currentScene.id, currentScene.title)} />
          <br />
          <br />
          <br />
          <br />
          <div id="editorjs" />
        </div>
        <br />
        <br />
        <br />
      {:else}
        <Overview />
      {/if}
    {:else}
      <Placeholder />
    {/if}
  </Grid>
{/if}

<style lang="scss">
  * {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0) !important;
    -webkit-focus-ring-color: rgba(255, 255, 255, 0) !important;
    outline: 0 !important;
  }
  .editpane {
    > h1 {
      text-align: center;
    }
  }
  .editorToolbar {
    position: sticky;
    position: -webkit-sticky;
    top: 0;

    padding: 1rem;
    font-size: 1.5rem;
    margin-bottom: 2rem;
    z-index: 8;

    .inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-content: center;
      margin: auto;
      // max-width: 700px;
    }
  }

</style>
