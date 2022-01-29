<script>
  export let columns = 2;

</script>

<div
  class="grid"
  class:four={columns === 4}
  class:three={columns === 3}
  class:two={columns === 2}>
  <slot />
</div>

<style lang="scss">
  .grid {
    display: grid;
    // justify-items: center;
    // align-items: center;

    &.two {
      grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    }
    &.three {
      grid-template-columns: repeat(auto-fit, minmax(15rem, 3fr));
    }
    &.four {
      grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    }
  }

</style>
