<script lang="ts">
  import { ProjectInterface } from "src/schema/project/project.interface";
  import { projects } from "src/db/storeProjects";
  import { scenes } from "src/db/storeScenes";
  import { chapters } from "src/db/storeChapters";
  import { state } from "src/db/storeState";
  import { _ } from "svelte-i18n";
  import SideNav from "carbon-components-svelte/src/UIShell/SideNav/SideNav.svelte";
  import SideNavItems from "carbon-components-svelte/src/UIShell/SideNav/SideNavItems.svelte";
  import SideNavMenu from "carbon-components-svelte/src/UIShell/SideNav/SideNavMenu.svelte";
  import SideNavLink from "carbon-components-svelte/src/UIShell/SideNav/SideNavLink.svelte";
  import SideNavDivider from "carbon-components-svelte/src/UIShell/SideNavDivider.svelte";
  import Fade16 from "carbon-icons-svelte/lib/Fade16";
  import AddAlt20 from "carbon-icons-svelte/lib/AddAlt20";
  import CreateChapter from "./component/CreateChapter.svelte";
  import CreateScene from "./component/CreateScene.svelte";
  import EditChapter from "./component/EditChapter.svelte";
  import EditScene from "./component/EditScene.svelte";
  import EditProject from "./component/EditProject.svelte";
  import AlignBoxBottomCenter16 from "carbon-icons-svelte/lib/AlignBoxBottomCenter16";
  import AddAlt16 from "carbon-icons-svelte/lib/AddAlt16";
  import Edit16 from "carbon-icons-svelte/lib/Edit16";
  import nzhcn from "nzh/cn";
  import { ProjectClass } from "src/schema/project/project.class";
  import { get } from "svelte/store";
  import ArrowLeft16 from "carbon-icons-svelte/lib/ArrowLeft16";
  import { push } from "svelte-spa-router";
  import { SceneInterface } from "src/schema/scene/scene.interface";
  import SceneContextMenu from "./component/SceneContextMenu.svelte";
  import { isFullScreen } from "src/store";
  import { routerLinkFn } from "src/tools/router-link-fn";
  import { ChapterInterface } from "src/schema/chapter/chapter.Interface";
  import ChapterContextMenu from "./component/ChapterContextMenu.svelte";
  import { removeChapter } from "src/tools/removeChapter";

  let sceneTargetElements: HTMLElement[] = [];
  let chapterTargetElements: HTMLElement[] = [];
  let currentScene: SceneInterface = undefined;
  let currentChapter: ChapterInterface = undefined;

  let filterChapters: ChapterInterface [] = []
  let showSceneContentMenu = false
  let showChapterContentMenu = false

  $: {
    if ($chapters.length && $scenes.length) {        
      chapterTargetElements = Array.from(
        document.querySelectorAll(".rightChapterMenuElement")
      );
      sceneTargetElements = Array.from(
        document.querySelectorAll(".rightSceneMenuElement")
      );
    }
  }

  let nextSceneTitle: string = "";
  let book: ProjectInterface = new ProjectClass();
  $: {
    if ($projects.length && $state.currentProject) {
      book = get(projects).filter(
        (cur: ProjectInterface) => cur.id === $state.currentProject
      )[0];
    }
  }
  $: {
    if($projects.length && $state.currentProject && $chapters.length) {
      filterChapters = JSON.parse(JSON.stringify(
        $chapters
        .filter(chapter => chapter.project == $state.currentProject)
        .sort((a, b) => a.order - b.order)
        ))
    }
  }
  const modals = {
    reArrange: false,
    createChapter: false,
    editProject: false,
    createScene: {
      show: false,
      chapter: "",
    },
    editChapter: {
      show: false,
      data: {},
    },
    editScene: {
      show: false,
      data: {},
    },
  };
  const changeChapterOpen = (chapter: ChapterInterface) => {
    chapters.setChapterOpen(chapter.id, chapter.open);
  };

  const createScene = chapterId => {
    const currentScenes = get(scenes).filter(
      (cur: SceneInterface) => cur.chapter === chapterId
    );
    nextSceneTitle = `第${nzhcn.encodeS(currentScenes.length + 1)}章：`;
    modals.createScene.chapter = chapterId;
    modals.createScene.show = true;
  };

  const editChapterFn = (chapter:ChapterInterface) => {
    modals.editChapter.data = chapter;
    modals.editChapter.show = true;
  };

  const editScene = event => {
    console.info(event)
    // modals.editScene.data = event.detail;
    modals.editScene.show = true;
  };

  const deleteChapterFn = () => {
    removeChapter(currentChapter.id, () => console.log("2121"))
  }

  const deleteSceneFn = e => {
    let confirmed = confirm("请确认删除?");
    if (confirmed == true) {
      scenes.removeScene(currentScene.id);
      if ($state.currentScene === currentScene.id) {
        push("/book");
      }
    }
  };

</script>

{#if $state.currentProject && !$isFullScreen}
  {#if chapterTargetElements.length} 
    <ChapterContextMenu 
     targetElements = {chapterTargetElements}
     deleteFn={deleteChapterFn}
     editFn={editScene}
    />
  {/if}
  {#if sceneTargetElements.length} 
    <SceneContextMenu 
      targetElements = {sceneTargetElements} 
      deleteFn={deleteSceneFn} 
      editFn={editScene}
    />
  {/if}

  <EditProject {book} bind:show={modals.editProject} />
  <CreateChapter bind:show={modals.createChapter} />
  <CreateScene
    projectId={$state.currentProject}
    chapterId={modals.createScene.chapter}
    title={nextSceneTitle}
    bind:show={modals.createScene.show} />
  <EditChapter
    bind:show={modals.editChapter.show}
    bind:data={modals.editChapter.data} />
  <EditScene bind:show={modals.editScene.show} {currentScene} />
  <SideNav isOpen={true}>
    <SideNavItems>
      {#each filterChapters as chapter, chapterIndex}
        <div class="rightChapterMenuElement"
        on:contextmenu={() => {
          currentChapter = chapter;
        }}
        >
          <SideNavMenu
          icon={Fade16}
          bind:expanded={chapter.open}
          on:click={() => changeChapterOpen(chapter)}
          text={chapter.title}>
          <SideNavLink
            icon={AddAlt20}
            on:click={() => createScene(chapter.id)}
            text={$_('sidebar.createScene')} />
          <SideNavLink
            icon={Edit16}
            on:click={() => editChapterFn(chapter)}
            text={$_('sidebar.editChapter')} />

          {#each $scenes
            .filter(scene => scene.chapter == chapter.id)
            .sort((a, b) => a.order - b.order) as scene, sceneIndex}
            <div
              on:mouseleave={() => {
                scenes.setSceneshoeEdit(scene.id, false);
              }}
              on:mouseenter={() => {
                scenes.setSceneshoeEdit(scene.id, true);
              }}
            >
              <div
                class="rightSceneMenuElement"
                data-value={scene.id}
                data-chapterIndex={chapterIndex}
                data-sceneIndex={sceneIndex}
                on:click={() => routerLinkFn(scene.id)}
                on:contextmenu={() => {
                  currentScene = scene;
                }}>
                <SideNavLink
                isSelected={scene.id === $state.currentScene}
                  on:click={() => routerLinkFn(scene.id)}
                  icon={AlignBoxBottomCenter16}
                  text={scene.title}
                  class="sideNavMenuItem" />
              </div>
            </div>
          {/each}
        </SideNavMenu>
        </div>
      {/each}

      {#if $state.currentProject}
        <SideNavDivider />
        <SideNavLink
          icon={AddAlt16}
          on:click={() => (modals.createChapter = true)}
          text={$_('sidebar.createChapter')} />
        <div>
          <SideNavLink
            icon={ArrowLeft16}
            on:click={() => push('/')}
            text={$_('sidebar.exist')} />
        </div>
      {:else}
        <SideNavLink text="没有创建小说" />
      {/if}
    </SideNavItems>
  </SideNav>
{/if}
