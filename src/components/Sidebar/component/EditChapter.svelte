<script lang="ts">
  import { _ } from "svelte-i18n";
  // import { chapters } from "../../storesold";
  import Modal from "carbon-components-svelte/src/Modal/Modal.svelte";
  import TextInput from "carbon-components-svelte/src/TextInput/TextInput.svelte";
  import { chapters } from "src/db/storeChapters";
  import { scenes } from "src/db/storeScenes";
  import { removeChapter } from "src/tools/removeChapter";

  export let show = false;
  export let data;

  const editChapter = () => {
    chapters.setChapterTitle(data.id, data.title);
    show = false;
  };

  const removeChapterFn = chapterId => {
    removeChapter(chapterId, () => (show = false));
  };

</script>

{#if show}
  <Modal
    modalHeading={$_('sidebar.editChapter')}
    primaryButtonText={$_('sidebar.modal.edit.buttonSave')}
    open={show}
    secondaryButtons={[{ text: '取消' }, { text: '删除' }]}
    iconDescription="关闭对话框"
    on:click:button--primary={editChapter}
    on:click:button--secondary={({ detail }) => {
      if (detail.text === '取消') show = false;
      if (detail.text === '删除') {
        removeChapterFn(data.id);
      }
    }}
    on:open={() => console.log('apen')}
    on:close={() => (show = false)}>
    <TextInput
      labelText={$_('sidebar.modal.title')}
      placeholder={$_('placeholder.title')}
      inline
      bind:value={data.title} />
  </Modal>
{/if}
