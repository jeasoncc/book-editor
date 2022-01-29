<script lang="ts">
  import { _ } from "svelte-i18n";
  import Modal from "carbon-components-svelte/src/Modal/Modal.svelte";

  export let show: boolean = false;

</script>

<Modal
  open={show}
  modalHeading={$_('feedback.title')}
  primaryButtonText="确定"
  iconDescription="关闭对话框"
  on:click:button--primary={() => (show = false)}
  on:open={() => console.log('apen')}
  on:close={() => (show = false)}>
  <h2 slot="header">{$_('feedback.title')}</h2>

  <div>
    <p>本软件由小密圈独立开发。</p>
    <p>
      如果在使用过程中遇到任何问题，包括但不限于错误报告，改进建议，请联系作者，我会在第一时间帮助你。
      <br />
      微信：chinavcc
      <br />
      QQ: 245567577
      <br />
      QQ内部测试群： 771278209(推荐)
      <br />
      公众号： 网文小密圈
      <br />
      邮箱: xiaomiquan@aliyun.com
    </p>
  </div>
</Modal>
