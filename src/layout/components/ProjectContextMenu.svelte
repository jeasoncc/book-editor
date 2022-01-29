<script lang="ts">
  import ContextMenu from "carbon-components-svelte/src/ContextMenu/ContextMenu.svelte";
  import ContextMenuDivider from "carbon-components-svelte/src/ContextMenu/ContextMenuDivider.svelte";
  import ContextMenuGroup from "carbon-components-svelte/src/ContextMenu/ContextMenuGroup.svelte";
  import ContextMenuOption from "carbon-components-svelte/src/ContextMenu/ContextMenuOption.svelte";
  import ContextMenuRadioGroup from "carbon-components-svelte/src/ContextMenu/ContextMenuRadioGroup.svelte";
  import CopyFile16 from "carbon-icons-svelte/lib/CopyFile16";
  import Delete16 from "carbon-icons-svelte/lib/Delete16";
  import EditOff16 from "carbon-icons-svelte/lib/EditOff16";
  import Cut16 from "carbon-icons-svelte/lib/Cut16";
  export let targetElements;
  export let editProjectFn;
  export let deleteFn;

</script>

<ContextMenu target={targetElements}>
  <ContextMenuOption
    indented
    labelText="修改章节"
    on:click={editProjectFn}
    icon={EditOff16} />
  <ContextMenuDivider />
  <ContextMenuOption
    indented
    kind="danger"
    labelText="删除"
    icon={Delete16}
    on:click={deleteFn} />
</ContextMenu>
