<script lang="ts">
  import { _ } from "svelte-i18n";
  import { push } from "svelte-spa-router";
  import Modal from "carbon-components-svelte/src/Modal/Modal.svelte";
  import TextInput from "carbon-components-svelte/src/TextInput/TextInput.svelte";
  import { scenes } from "src/db/storeScenes";
  import { SceneInterface } from "src/schema/scene/scene.interface";

  export let show = false;
  export let currentScene: SceneInterface;

  const editScene = () => {
    scenes.setSceneTitle(currentScene.id, currentScene.title);
    show = false;
  };

  const removeScene = sceneId => {
    let confirmed = confirm($_("sidebar.delete.scene"));
    if (confirmed == true) {
      show = false;
      // push("/write");
      window.setTimeout(() => scenes.removeScene(sceneId), 200);
    }
  };

</script>

{#if currentScene}
  <Modal
    modalHeading={$_('sidebar.editScene')}
    primaryButtonText={$_('sidebar.modal.edit.buttonSave')}
    open={show}
    secondaryButtons={[{ text: '取消' }, { text: '删除' }]}
    iconDescription="关闭对话框"
    on:click:button--primary={editScene}
    on:click:button--secondary={({ detail }) => {
      if (detail.text === '取消') show = false;
      if (detail.text === '删除') {
        removeScene(currentScene.id);
      }
    }}
    on:open={() => console.log('apen')}
    on:close={() => (show = false)}>
    <TextInput
      labelText={$_('sidebar.modal.title')}
      placeholder={$_('placeholder.title')}
      inline
      bind:value={currentScene.title} />
  </Modal>
{/if}
