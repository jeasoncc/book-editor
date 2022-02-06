<script lang="ts">
  import { ProjectInterface } from "./../schema/project/project.interface";
  import { projects } from "./../db/storeProjects";
  import HeaderComponent from "src/components/Header/Header.svelte";
  import SidebarComponent from "src/components/Sidebar/Sidebar.svelte";
  import { routes } from "./../routes/route.book.config";
  import Content from "carbon-components-svelte/src/UIShell/Content.svelte";
  import Router from "svelte-spa-router";

  import { state } from "src/db/storeState";
  import { get } from "svelte/store";
  import { ProjectClass } from "src/schema/project/project.class";
  import Footer from "src/components/footer/Footer.svelte";
  import { SceneInterface } from "src/schema/scene/scene.interface";
  import { scenes } from "src/db/storeScenes";
  import { onMount } from "svelte";
  import { setInitTyping } from "src/db/init/initTyping";
  
  const routeLoaded = (value: any) => {
    console.log(value);
  };
  let currenProject: ProjectInterface = new ProjectClass();
  let currentScence: SceneInterface;
  $: {
    if ($state.currentProject && $projects.length) {
      currenProject = get(projects).find((cur: ProjectInterface) => {
        return cur.id === $state.currentProject;
      });
    }
    if ($state.currentProject && $scenes.length) {
      currentScence = get(scenes).find((cur: SceneInterface) => {
        return cur.id === $state.currentScene;
      });
    }
  }
  onMount(async () => {
    await setInitTyping();
  });

</script>

<HeaderComponent />
<SidebarComponent />
<Content class="main">
  <Router {routes} on:routeLoaded={routeLoaded} />
</Content>
<Footer {currenProject} {currentScence} />
