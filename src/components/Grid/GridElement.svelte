<script>
  export let title;
  export let action = false;

</script>

<div class="grid-element" class:action on:click>
  {#if title}
    <h2>{title}</h2>
    <div class="circle" />
  {/if}
  <slot />
</div>

<style lang="scss">
  .grid-element {
    background: var(--background-color);
    border: 1px solid rgba(0, 0, 0, 0.3);
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    color: var(--text-color);
    margin: 1em;
    padding: 1em;
    cursor: pointer;
    opacity: 0.65;
    white-space: pre-line;
    line-height: 1.5rem;
    transition: all 0.5s;
    word-break: break-word;
    // width: 10rem;
    // height: 12rem;
    border-radius: 1em;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    // max-width: 12rem;

    h2 {
      margin: 0 0 1rem 0;
    }

    &.action {
      // text-align: center;
      // font-size: 3rem;
      // background: red;
      .circle {
        background: var(--success-color);
      }
    }

    &:hover {
      opacity: 1;
      transform: scale(1.01);
      z-index: 997;
    }
  }

</style>
