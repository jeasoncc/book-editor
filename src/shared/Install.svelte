<script>
  import { intern } from "../storesold";
  import { _ } from "svelte-i18n";
  import Disclaimer from "./Disclaimer.svelte";
  import FormGroup from "carbon-components-svelte/src/FormGroup/FormGroup.svelte";
  import Toggle from "carbon-components-svelte/src/Toggle/Toggle.svelte";
  import ComposedModal from "carbon-components-svelte/src/ComposedModal/ComposedModal.svelte";
  import ModalBody from "carbon-components-svelte/src/ComposedModal/ModalBody.svelte";
  import ModalFooter from "carbon-components-svelte/src/ComposedModal/ModalFooter.svelte";
  let disclaimer = false;
  let showDisclaimer = true;

</script>

<ComposedModal
  preventCloseOnClickOutside
  on:click:button--primary={() => ($intern.installed = true)}
  open={showDisclaimer}
  persistent="true">
  <ModalBody hasForm>
    <Disclaimer />
    <br />
    <br />
    <br />
    <br />
    <FormGroup>
      <Toggle
        labelText={$_('install.disclaimer.title')}
        bind:toggled={disclaimer}
        labelA={$_('install.disclaimer.noaction')}
        labelB={$_('install.disclaimer.action')} />
    </FormGroup>
  </ModalBody>
  <ModalFooter
    primaryButtonText={$_('install.action')}
    primaryButtonDisabled={!disclaimer} />
</ComposedModal>
