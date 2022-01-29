<script>
  export let color;
  export let block;
  export let loading = false;
  export let disabled = false;

</script>

<button
  disabled={disabled || loading}
  class:loading
  class:primary={color == 'primary'}
  class:warning={color == 'warning'}
  class:danger={color == 'danger'}
  class:success={color == 'success'}
  class:info={color == 'info'}
  class:block={block == true}
  on:click|preventDefault>
  {#if loading}<span class="lnr lnr-sync spinner" />{/if}
  <slot />
</button>

<style lang="scss">
  button {
    padding: 0.7em 1em;
    margin: 0 0.5em 0 0.5em;

    font-size: 1rem;
    color: var(--button-color);
    text-align: center;
    line-height: 1;
    white-space: nowrap;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    display: inline-block;
    outline: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    transition: all 0.25s;

    background-color: var(--default-color);

    &:hover {
      opacity: 0.85;
    }

    &:not(:last-child) {
      border-right: none;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
      background-color: #313131;
    }

    &.primary {
      background-color: var(--primary-color);
      color: var(--button-inverse-color);
    }
    &.warning {
      background-color: var(--warning-color);
      color: var(--button-inverse-color);
    }
    &.danger {
      background-color: var(--danger-color);
      color: var(--button-inverse-color);
    }
    &.success {
      background-color: var(--success-color);
      color: var(--button-inverse-color);
    }
    &.info {
      background-color: var(--info-color);
      color: var(--button-inverse-color);
    }
    &.block {
      width: 100%;
    }
    .spinner {
      display: none;
      -webkit-animation: spin 2s infinite linear;
      animation: spin 2s infinite linear;
    }

    &.loading {
      .spinner {
        display: inline-block;
      }
    }
  }
  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }

</style>
