<script lang="ts">
  import { _, locales } from "svelte-i18n";
  import Modal from "carbon-components-svelte/src/Modal/Modal.svelte";
  import TextInput from "carbon-components-svelte/src/TextInput/TextInput.svelte";
  import Form from "carbon-components-svelte/src/Form/Form.svelte";
  import FormGroup from "carbon-components-svelte/src/FormGroup/FormGroup.svelte";
  import Select from "carbon-components-svelte/src/Select/Select.svelte";
  import SelectItem from "carbon-components-svelte/src/Select/SelectItem.svelte";
  import { ProjectInterface } from "src/schema/project/project.interface";

  export let showCreateProject: boolean;
  export let book: ProjectInterface;
  export let createProject;

  $: checkForm = book.title !== "" && book.author !== "";

  const languages = $locales.map(language => {
    return {
      value: language,
      text: $_(`settings.appereance.language.${language}`),
    };
  });

</script>

<Modal
  open={showCreateProject}
  modalHeading={`${$_('overview.modals.newProject.header')}`}
  primaryButtonText={$_('overview.modals.newProject.button')}
  primaryButtonDisabled={!checkForm}
  secondaryButtonText="取消"
  iconDescription="关闭对话框"
  on:click:button--primary={createProject}
  on:click:button--secondary={() => (showCreateProject = false)}
  on:open={() => console.log('apen')}
  on:close={() => (showCreateProject = false)}>
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
