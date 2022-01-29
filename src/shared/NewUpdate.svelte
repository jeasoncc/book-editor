<script>
  import { _ } from "svelte-i18n";
  import pkg from "./../../package.json";
  import Modal from "carbon-components-svelte/src/Modal/Modal.svelte";
  export let show = true;

</script>

<Modal
  open={show}
  modalHeading={$_('common.update.title')}
  primaryButtonText="确定"
  iconDescription="关闭对话框"
  on:click:button--primary={() => (show = false)}
  on:open={() => console.log('apen')}
  on:close={() => (show = false)}>
  <h2 slot="header">{$_('common.update.title')}</h2>
  <h3>小密圈写作：当前版本: {pkg.version}</h3>
  <p>
    当前版本为测试版本，请在使用时注意时常导出自己的小说，以免遇到为未知问题
  </p>
</Modal>
