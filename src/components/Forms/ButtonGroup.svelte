<script>
  export let small;

</script>

<div class="button-group animate__animated animate__fadeInDown" class:small>
  <slot />
</div>

<style lang="scss">
  div.button-group {
    margin: 1rem;
    justify-content: center;
    display: flex;

    &.small {
      margin: 0.5rem;
    }

    &:after {
      content: "";
      clear: both;
      display: table;
    }
  }

</style>
