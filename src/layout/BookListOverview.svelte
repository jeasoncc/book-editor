<script lang="ts">
  import CreateBook from "./../components/Card/CreateBook.svelte";
  import CardBook from "../components/Card/CardBook.svelte";
  import CreateProject from "src/pages/Overview/CreateProject.svelte";
  import Grid from "carbon-components-svelte/src/Grid/Grid.svelte";
  import Row from "carbon-components-svelte/src/Grid/Row.svelte";
  import Column from "carbon-components-svelte/src/Grid/Column.svelte";
  import Header from "src/components/Header/HeaderBookList.svelte";
  import Content from "carbon-components-svelte/src/UIShell/Content.svelte";
  import { state } from "./../db/storeState";
  import { _ } from "svelte-i18n";
  import { projects } from "src/db/storeProjects";
  import { push } from "svelte-spa-router";
  import { ProjectInterface } from "src/schema/project/project.interface";
  import { ProjectClass } from "src/schema/project/project.class";
  import { dialogFn, PropObject } from "src/components/Dialog/Dialog";
  import { chapters } from "src/db/storeChapters";
  import moment from "moment";
  import ProjectContextMenu from "./components/ProjectContextMenu.svelte";
  import EditProject from "src/components/Sidebar/component/EditProject.svelte";
  import { afterUpdate } from "svelte";
  import { scenes } from "src/db/storeScenes";
  import { typings } from "src/db/storeTyping";

  let targetElements: Element[];
  let showCreateProject = false;
  let showEditProject = false;
  let book: ProjectInterface = new ProjectClass();
  let editBook: ProjectInterface;

  const deleteFn = () => {
    let confirmed = confirm($_("overview.project.confirmDelete"));
    if (confirmed == true) {
      $chapters
        .filter(ch => ch.project == editBook.id)
        .forEach(chapter => {
          scenes.removeAllScenes(chapter.id);
        });
      chapters.removeAllChapters(editBook.id);
      projects.removeProject(editBook.id);
      scenes.removeAllScenes(editBook.id);
      typings.removeAllScenes(editBook.id);
    }
    setTimeout(() => {
      const DialogConfig: PropObject = {
        kind: "warning",
        title: $_("overviewListPage.tip.delete"),
        subtitle: `${editBook.title}已经删除成功`,
        caption: moment().format(),
      };
      dialogFn(DialogConfig);
    }, 200);
  };
  const editProjectFn = () => {
    showEditProject = true;
  };
  afterUpdate(() => {
    if ($projects.length) {
      targetElements = Array.from(document.querySelectorAll(".bx--col-sm-4"));
    }
  });

  type ResType = {
    create: boolean;
    project: ProjectInterface;
  };
  const createBookFn = () => {
    let res: ResType = projects.createProject(book);
    if (res.create) {
      const DialogConfig: PropObject = {
        kind: "success",
        title: $_("overviewListPage.tip.success"),
        subtitle: res.project.title,
        caption: res.project.createDate,
      };
      dialogFn(DialogConfig);
      showCreateProject = false;
      book = new ProjectClass();
      state.setCurrentProject(res.project.id);
    }
    setTimeout(() => {
      chapters.createChapter(res.project.id, "第一卷");
      const DialogConfig: PropObject = {
        kind: "success",
        title: "自动创建第一卷成功",
        subtitle: "已经自动为您创建了第一卷",
        caption: moment().format(),
      };
      dialogFn(DialogConfig);
    }, 1000);
  };
  const intoBookDetailFn = (project: ProjectInterface) => {
    state.setCurrentProject(project.id);
    push("/book");
  };

</script>

<Header />

<Content>
  <CreateProject
    bind:book
    bind:showCreateProject
    createProject={createBookFn} />
  {#if editBook}
    <EditProject bind:book={editBook} bind:show={showEditProject} />
  {/if}
  {#if $projects.length}
    <ProjectContextMenu {targetElements} {deleteFn} {editProjectFn} />
  {/if}
  <div class="overview">
    <Grid>
      <Row>
        <Column sm={4} md={4} lg={4}>
          <CreateBook on:click={() => (showCreateProject = true)} />
        </Column>
        {#if $projects}
          {#each $projects as project}
            <Column sm={4} md={4} lg={4}>
              <CardBook
                title={project.title}
                on:contextmenu={() => {
                  editBook = project;
                }}
                on:click={() => intoBookDetailFn(project)}>
                <p><span>{project.author}</span></p>
              </CardBook>
            </Column>
          {/each}
        {/if}
      </Row>
    </Grid>
  </div>
</Content>

<style>
  .overview {
    max-width: 800px;
    margin: auto;
    text-align: center;
  }

</style>
