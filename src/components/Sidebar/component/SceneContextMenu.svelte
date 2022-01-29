<script lang="ts">
  import ContextMenu from "carbon-components-svelte/src/ContextMenu/ContextMenu.svelte";
  import ContextMenuDivider from "carbon-components-svelte/src/ContextMenu/ContextMenuDivider.svelte";
  import ContextMenuGroup from "carbon-components-svelte/src/ContextMenu/ContextMenuGroup.svelte";
  import ContextMenuOption from "carbon-components-svelte/src/ContextMenu/ContextMenuOption.svelte";
  import CopyFile16 from "carbon-icons-svelte/lib/CopyFile16";
  import EditOff16 from "carbon-icons-svelte/lib/EditOff16";
  export let targetElements: HTMLElement[];
  export let deleteFn: (e: CustomEvent<any>) => any;
  export let editFn: (e: CustomEvent<any>) => any;

</script>

<ContextMenu target={targetElements}>
  <ContextMenuOption
    indented
    labelText="修改章节"
    on:click={editFn}
    icon={EditOff16} />
  <ContextMenuDivider />
  <ContextMenuOption
    indented
    disabled
    labelText="复制章节"
    shortcutText="⌘C"
    icon={CopyFile16} />
  <ContextMenuDivider />
  <ContextMenuOption disabled indented labelText="单章导出">
    <ContextMenuGroup labelText="Export options">
      <ContextMenuOption id="pdf" labelText="PDF" disabled />
      <ContextMenuOption id="txt" labelText="TXT" disabled />
      <ContextMenuOption id="word" labelText="WORD" disabled />
      <ContextMenuOption id="text" labelText="TEXT" disabled />
      <ContextMenuOption id="markdown" labelText="MARKDOWN" disabled />
    </ContextMenuGroup>
  </ContextMenuOption>
  <ContextMenuDivider />
  <ContextMenuOption
    indented
    kind="danger"
    labelText="删除"
    on:click={deleteFn} />
</ContextMenu>
