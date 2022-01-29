<script lang="ts">
  import { projects } from "./../db/storeProjects";
  import { fade } from "svelte/transition";
  import WordComponent from "./Export/ExportDialog.svelte";
  import ClickableTile from "carbon-components-svelte/src/Tile/ClickableTile.svelte";
  import { state } from "src/db/storeState";
  import { get } from "svelte/store";
  import { ProjectInterface } from "src/schema/project/project.interface";
  import { ProjectClass } from "src/schema/project/project.class";
  import Export from "./Export/RTF/collectData";
  import { saveFile } from "src/bridge";
  import { TextExportClass } from "src/tools/export-text";
  import { _ } from "svelte-i18n";

  let showTextModal = false;
  let showWordModal = false;
  let showRTFModal = false;

  let currentProject: ProjectInterface = new ProjectClass();
  const downLoadTextFn = async (fileName: string) => {
    let generateDownload = new TextExportClass($state.currentProject);
    const data = await generateDownload.fetchData();
    const blob = new Blob([data.document], {
      type: "text/plain",
    });
    const file = await saveFile(blob, fileName);
    return file.download();
  };
  const downloadFn = async (fileName: string) => {
    let generateDownload = new Export($state.currentProject);
    const data = await generateDownload.fetchData();
    const blob = new Blob([data.document], {
      type: "text/plain",
    });
    const file = await saveFile(blob, fileName);
    return file.download();
  };
  $: {
    if ($projects.length && $state.currentProject) {
      currentProject = get(projects).find(
        (project: ProjectInterface) => project.id === $state.currentProject
      );
    }
  }

</script>

<WordComponent
  title={$_('export.text.subtitle')}
  bind:show={showTextModal}
  fileName={`${currentProject.title}.txt`}
  downloadFn={() => downLoadTextFn(`${currentProject.title}.text`)} />
<WordComponent
  title={$_('export.word.subtitle')}
  fileName={`${currentProject.title}.doc`}
  downloadFn={() => downloadFn(`${currentProject.title}.doc`)}
  bind:show={showWordModal} />
<WordComponent
  fileName={`${currentProject.title}.rtf`}
  title={$_('export.rtf.explain')}
  bind:show={showRTFModal}
  downloadFn={() => downloadFn(`${currentProject.title}.rtf`)} />
<div class="export" in:fade={{ duration: 100 }}>
  {#if $state.currentProject}
    <ClickableTile on:click={() => (showTextModal = !showTextModal)}>
      {$_('export.text.subtitle')}
    </ClickableTile>
    <br />
    <ClickableTile on:click={() => (showWordModal = !showWordModal)}>
      {$_('export.word.subtitle')}
    </ClickableTile>
    <br />
    <ClickableTile on:click={() => (showRTFModal = !showRTFModal)}>
      {$_('export.rtf.subtitle')}
    </ClickableTile>
  {/if}
</div>

<style>
  .export {
    margin: auto;
    max-width: 800px;
  }

</style>
