<script lang="ts">
  import { _ } from "svelte-i18n";
  import Modal from "carbon-components-svelte/src/Modal/Modal.svelte";
  import moment from "moment";
  import { dialogFn, PropObject } from "src/components/Dialog/Dialog";

  export let show: boolean;
  export let title: string;
  export let downloadFn: () => any;
  export let fileName: string;

  const fn = async () => {
    const res = await downloadFn();
    if (res.saved == true) {
      show = false;
      setTimeout(() => {
        const DialogConfig: PropObject = {
          kind: "info",
          title: "导出成功",
          subtitle: `${fileName}已经成功导出`,
          caption: moment().format("YYYY-MM-DD:HH:mm:ss"),
        };
        dialogFn(DialogConfig);
      }, 1000);
    }
  };

</script>

<Modal
  open={show}
  modalHeading="导出"
  primaryButtonText={$_('export.action.export')}
  secondaryButtonText="取消"
  iconDescription="关闭对话框"
  on:click:button--primary={fn}
  on:click:button--secondary={() => (show = false)}
  on:open={() => console.log('apen')}
  on:close={() => (show = false)}>
  <p>{title}，准备生成文件</p>
</Modal>
