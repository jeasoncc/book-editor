<script>
  import Line from "../svg/line.svelte";
  import {
    closeWindow,
    resizeWindow,
    minimizeWindow,
    isRunningElectron,
  } from "src/bridge";
  import { _ } from "svelte-i18n";
  import Close16 from "carbon-icons-svelte/lib/Close16";
  import Maximize16 from "carbon-icons-svelte/lib/Maximize16";
  import Minimize16 from "carbon-icons-svelte/lib/Minimize16";
  import Warning16 from "carbon-icons-svelte/lib/Warning16";
  import Header from "carbon-components-svelte/src/UIShell/GlobalHeader/Header.svelte";
  import HeaderUtilities from "carbon-components-svelte/src/UIShell/GlobalHeader/HeaderUtilities.svelte";
  import HeaderGlobalAction from "carbon-components-svelte/src/UIShell/HeaderGlobalAction.svelte";
  import SkipToContent from "carbon-components-svelte/src/UIShell/SkipToContent.svelte";
  import Support from "../../shared/Support.svelte";

  let showHelp = false;

</script>

<Support bind:show={showHelp} />
<Header
  company={$_('overviewListPage.company.title')}
  style="-webkit-app-region:  no-drag">
  <HeaderUtilities style="-webkit-app-region: no-drag">
    <HeaderGlobalAction
      aria-label="帮助"
      style="-webkit-app-region: no-drag"
      on:click={() => (showHelp = true)}
      icon={Warning16} />
    {#if isRunningElectron}
      <HeaderGlobalAction
        aria-label="最小化窗口"
        style="-webkit-app-region: no-drag"
        on:click={minimizeWindow}
        icon={Line} />
      <HeaderGlobalAction
        aria-label="最大化"
        style="-webkit-app-region: no-drag"
        on:click={resizeWindow}
        icon={Maximize16}
        closeIcon={Minimize16} />
      <HeaderGlobalAction
        aria-label="关闭"
        style="-webkit-app-region: no-drag"
        on:click={closeWindow}
        icon={Close16} />
    {/if}
  </HeaderUtilities>
</Header>
