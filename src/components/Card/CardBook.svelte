<script lang="ts">
  import ClickableTile from "carbon-components-svelte/src/Tile/ClickableTile.svelte";
  export let title: string;
  export let action = false;

</script>

<div on:contextmenu>
  <ClickableTile class="card-book list-book" on:click>
    {#if title}
      <h2>{title}</h2>
      <div class="circle" class:action />
    {/if}
    <slot />
  </ClickableTile>
</div>
