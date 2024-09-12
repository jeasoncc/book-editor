<script lang="ts">
  import Modal from "carbon-components-svelte/src/Modal/Modal.svelte";

  export let show: boolean = false;

  export const toggle_fn = (args: boolean) => {
    return !args
  }

</script>

<Modal
  open={show}
  modalHeading="help"
  primaryButtonText="sure"
  iconDescription="close the description"
  on:click:button--primary={() => (show = !show)}
  on:close={() => (show = !show)}>
  <h2 slot="header">help</h2>

    <p>If you need Help, you can send message xiaomiquan@aliyun.com</p>

</Modal>
