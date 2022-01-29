<script>
  import { _ } from "svelte-i18n";
  import Modal from "carbon-components-svelte/src/Modal/Modal.svelte";
  import TextInput from "carbon-components-svelte/src/TextInput/TextInput.svelte";
  // import { chapters } from "src/storesold";
  import { state } from "src/db/storeState";
  import { chapters } from "src/db/storeChapters";

  export let show = false;

  let title = "";

  const createChapter = () => {
    chapters.createChapter($state.currentProject, title);
    show = false;
    title = "";
  };

</script>

{#if show}
  <Modal
    open={show}
    modalHeading={`${$_('sidebar.modal.newChapter.header')}`}
    primaryButtonText={$_('sidebar.modal.newChapter.button')}
    primaryButtonDisabled={title.length === 0}
    secondaryButtonText="取消"
    iconDescription="关闭对话框"
    on:click:button--primary={createChapter}
    on:click:button--secondary={() => (show = false)}
    on:open={() => console.log('apen')}
    on:close={() => (show = false)}>
    <TextInput
      labelText={$_('sidebar.modal.title')}
      placeholder={$_('placeholder.title')}
      inline
      bind:value={title} />
  </Modal>
{/if}
