<script>
  import { getRandomNumber } from "../../utils";
  import { Field } from ".";

  export let label;
  export let id = label + getRandomNumber();

  export let value;
  export let helper;
  export let placeholder;

</script>

<Field bind:id bind:label bind:helper bind:placeholder>
  <textarea {id} rows="3" bind:value {placeholder} />
</Field>

<style lang="scss">
  textarea {
    width: 100%;
    height: auto;
    resize: vertical;
    background: none;
    border: 1px solid #999;
    color: var(--text-color);
    border-radius: 0.125rem;
    font-size: 0.8rem;
    opacity: 0.65;
    border: none;
    border-bottom: 1px solid #999;
    background: linear-gradient(
        to bottom,
        transparent 95%,
        var(--primary-color) 95%
      )
      no-repeat;
    background-size: 0 100%;
    transition: background-size 0.2s ease;
    &:focus {
      border-bottom: 0.1px solid var(--primary-color);
      background-size: 100% 100%;
      outline: 0;
      opacity: 1;
    }
  }

</style>
