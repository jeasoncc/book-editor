<script>
  import ClickableTile from "carbon-components-svelte/src/Tile/ClickableTile.svelte";
  export let title;
  export let action = false;

</script>

<ClickableTile class="card-book" on:click>
  {#if title}
    <h2>{title}</h2>
    <div class="circle" class:action />
  {/if}
  <slot />
</ClickableTile>
