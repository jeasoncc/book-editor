<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  const click = () => {
    dispatch("click");
  };

</script>

<tr on:click={click}>
  <slot />
</tr>

<style lang="scss">
  tr {
    width: 100%;
    transition: all 0.5s ease;
    cursor: pointer;

    &:hover {
      background-color: var(--menu-active);
    }
  }

</style>
