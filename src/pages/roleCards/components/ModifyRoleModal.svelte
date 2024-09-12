<script lang="ts">
  import Modal from "carbon-components-svelte/src/Modal/Modal.svelte";
  import TextInput from "carbon-components-svelte/src/TextInput/TextInput.svelte";
  import TextArea from "carbon-components-svelte/src/TextArea/TextArea.svelte";
  import Form from "carbon-components-svelte/src/Form/Form.svelte";
  import FormGroup from "carbon-components-svelte/src/FormGroup/FormGroup.svelte";
  import Toggle from "carbon-components-svelte/src/Toggle/Toggle.svelte";
  import RoleInterface from "../../../schema/role/role.interface";
  import InputTag from "./../../../components/forms/InputTag.svelte";
  import { _ } from "svelte-i18n";
  export let showModifyRole: boolean;
  export let role: RoleInterface;
  export let modalHeading: string;
  export let primaryButtonText: string;

  export let modifyRoleFn;
  export let removeRoleFn;

  let aliasInputValue = "";
  let imageInputValue = "";
  let identityInputValue = "";
  let relationshipsInputValue = "";

</script>

<Modal
  size="xl"
  bind:open={showModifyRole}
  {modalHeading}
  {primaryButtonText}
  primaryButtonDisabled={role.name.length === 0}
  secondaryButtons={[{ text: $_('roleCenterPage.menu.cancelButtonText') }, { text: $_('roleCenterPage.menu.deleteButtonText') }]}
  iconDescription={$_('roleCenterPage.menu.iconDescription')}
  on:click:button--primary={modifyRoleFn}
  on:click:button--secondary={({ detail }) => {
    if (detail.text === $_('roleCenterPage.menu.cancelButtonText')) showModifyRole = false;
    if (detail.text === $_('roleCenterPage.menu.deleteButtonText')) {
      removeRoleFn(role.id);
    }
  }}
  on:open={() => console.log('apen')}
  on:close={() => (showModifyRole = false)}>
  <Form>
    <FormGroup>
      <TextInput
        size="xl"
        autofocus
        labelText={$_('roleCenterPage.form.name.title')}
        placeholder={$_('roleCenterPage.form.name.placeholder')}
        helperText={$_('roleCenterPage.form.name.placeholder')}
        bind:value={role.name} />
    </FormGroup>
    <FormGroup>
      <InputTag
        bind:value={aliasInputValue}
        bind:alias={role.alias}
        props={{ size: 'xl', placeholder: $_('roleCenterPage.form.alias.placeholder'), helperText: $_('roleCenterPage.form.alias.helperText') }} />
    </FormGroup>
    <FormGroup>
      <InputTag
        bind:value={imageInputValue}
        bind:alias={role.image}
        props={{ size: 'xl', placeholder: $_('roleCenterPage.form.image.placeholder'), helperText: $_('roleCenterPage.form.image.helperText') }} />
    </FormGroup>
    <FormGroup>
      <InputTag
        bind:value={identityInputValue}
        bind:alias={role.identity}
        props={{ size: 'xl', placeholder: $_('roleCenterPage.form.identity.placeholder'), helperText: $_('roleCenterPage.form.identity.helperText') }} />
    </FormGroup>
    <FormGroup>
      <InputTag
        bind:value={relationshipsInputValue}
        bind:alias={role.relationships}
        props={{ size: 'xl', placeholder: $_('roleCenterPage.form.relationships.placeholder'), helperText: $_('roleCenterPage.form.relationships.helperText') }} />
    </FormGroup>

    <FormGroup>
      <TextArea
        size="xl"
        labelText={$_('roleCenterPage.form.basicSettings.helperText')}
        placeholder={$_('roleCenterPage.form.basicSettings.placeholder')}
        bind:value={role.basicSettings} />
    </FormGroup>
    <FormGroup>
      <TextArea
        size="xl"
        labelText={$_('roleCenterPage.form.experience.helperText')}
        placeholder={$_('roleCenterPage.form.experience.placeholder')}
        bind:value={role.experience} />
    </FormGroup>
    <FormGroup>
      <Toggle
        labelText={$_('roleCenterPage.form.showTip.helperText')}
        bind:toggled={role.showTip}
        labelA={$_('roleCenterPage.form.showTip.lableLeft')}
        labelB={$_('roleCenterPage.form.showTip.laberRight')} />
    </FormGroup>
  </Form>
</Modal>
