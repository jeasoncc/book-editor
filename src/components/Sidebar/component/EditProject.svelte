<script lang="ts">
  import { _ } from "svelte-i18n";
  import Form from "carbon-components-svelte/src/Form/Form.svelte";
  import FormGroup from "carbon-components-svelte/src/FormGroup/FormGroup.svelte";
  import Modal from "carbon-components-svelte/src/Modal/Modal.svelte";
  import TextInput from "carbon-components-svelte/src/TextInput/TextInput.svelte";
  import Select from "carbon-components-svelte/src/Select/Select.svelte";
  import SelectItem from "carbon-components-svelte/src/Select/SelectItem.svelte";
  import { projects } from "src/db/storeProjects";
  import { chapters } from "src/db/storeChapters";
  import { state } from "src/db/storeState";
  import { scenes } from "src/db/storeScenes";
  import { ProjectInterface } from "src/schema/project/project.interface";
  import { push } from "svelte-spa-router";
  import { dialogFn, PropObject } from "src/components/Dialog/Dialog";
  import moment from "moment";
  export let show = false;

  export let book: ProjectInterface;

  const save = () => {
    if (book.title !== "") {
      projects.setProject(book);
      show = false;
      setTimeout(() => {
        const DialogConfig: PropObject = {
          kind: "info-square",
          title: "修改成功",
          subtitle: `${book.title}已经修改成功`,
          caption: moment().format(),
        };
        dialogFn(DialogConfig);
      }, 200);
    }
  };

  const removeProject = project => {
    let confirmed = confirm($_("overview.project.confirmDelete"));
    if (confirmed == true) {
      $chapters
        .filter(ch => ch.project == project)
        .forEach(chapter => {
          scenes.removeAllScenes(chapter.id);
        });
      chapters.removeAllChapters(project);
      projects.removeProject(project);

      scenes.removeAllScenes(project);
      state.setCurrentProject("");
      push("/");
    }
  };

  const languages = ["zh", "en"].map(language => {
    return {
      value: language,
      text: $_(`settings.appereance.language.${language}`),
    };
  });

</script>

<Modal
  modalHeading={$_('sidebar.editProject')}
  primaryButtonText={$_('sidebar.modal.edit.buttonSave')}
  open={show}
  secondaryButtons={[{ text: '取消' }, { text: '删除' }]}
  iconDescription="关闭对话框"
  on:click:button--primary={save}
  on:click:button--secondary={({ detail }) => {
    if (detail.text === '取消') show = false;
    if (detail.text === '删除') {
      removeProject(book.id);
    }
  }}
  on:open={() => console.log('apen')}
  on:close={() => (show = false)}>
  <Form>
    <FormGroup>
      <TextInput
        size="xl"
        labelText={$_('export.title')}
        placeholder={$_('placeholder.title')}
        bind:value={book.title} />
    </FormGroup>
    <FormGroup>
      <TextInput
        size="xl"
        labelText={$_('export.author')}
        placeholder={$_('export.author')}
        bind:value={book.author} />
    </FormGroup>
    <FormGroup>
      <TextInput
        size="xl"
        labelText={$_('export.publisher')}
        placeholder={$_('export.helpers.publisher')}
        bind:value={book.publisher} />
    </FormGroup>
    <FormGroup>
      <TextInput
        size="xl"
        labelText={$_('export.description')}
        placeholder={$_('export.helpers.description')}
        bind:value={book.description} />
    </FormGroup>
    <FormGroup>
      <Select
        size="xl"
        labelText={$_('export.language')}
        bind:selected={book.language}>
        {#each languages as language}
          <SelectItem value={language.value} text={language.text} />
        {/each}
      </Select>
    </FormGroup>
  </Form>
</Modal>
