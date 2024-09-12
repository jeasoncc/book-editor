<script>
  import { getRandomNumber } from "../../utils";
  import { Field } from ".";

  export let label;
  export let id = label + getRandomNumber();

  export let value;
  export let options = [];
  export let helper;
  export let placeholder;

</script>

<Field bind:id bind:label bind:helper bind:placeholder>
  <select {id} bind:value {placeholder}>
    {#each options as option}
      <option value={option.value}>{option.text}</option>
    {/each}
  </select>
</Field>

<style lang="scss">
  // select {
  //   background-color: var(--select-background);
  //   width: 100%;
  //   // border: solid;
  //   font-size: 1rem;
  //   color: var(--text-color);
  //   -webkit-text-fill-color: var(--text-color);
  //   border: 0;
  //   border-bottom: 0.5px solid #999;
  //   cursor: pointer;
  //   height: 2rem;
  //   background: linear-gradient(
  //       to bottom,
  //       transparent 95%,
  //       var(--primary-color) 95%
  //     )
  //     no-repeat;
  //   background-size: 0 100%;
  //   transition: background-size 0.2s ease;

  //   &:focus {
  //     border-bottom: 0.5px solid var(--primary-color);
  //     background-size: 100% 100%;
  //     outline: 0;
  //     opacity: 1;
  //   }
  // }
  // option {
  //   color: var(--text-color);
  //   background: var(--background-color);
  // }

</style>
