<script lang="ts">
  // eslint-disable no-alert */
  import Grid from "carbon-components-svelte/src/Grid/Grid.svelte";
  import Row from "carbon-components-svelte/src/Grid/Row.svelte";
  import Tag from "carbon-components-svelte/src/Tag/Tag.svelte";
  import TextInput from "carbon-components-svelte/src/TextInput/TextInput.svelte";
  export let props: any; // incorrect no-unsafe-member-access error
  export let value: string; // incorrect no-unsafe-member-access error
  export let alias: string[] = []; // incorrect no-unsafe-member-access error
  const tagColor = [
    "red",
    "magenta",
    "purple",
    "blue",
    "cyan",
    "teal",
    "green",
    "gray",
    "cool-gray",
    "warm-gray",
  ];

  const addAlias = () => {
    alias.push(value);
    alias = JSON.parse(JSON.stringify(alias));
    value = "";
  };
  const closeFn = (e: MouseEvent, index: number) => {
    alias = alias.filter((cur, i) => i !== index);
  };

</script>

<!-- {#if alias.length} -->

<!-- {/if} -->
<TextInput {...props} bind:value on:change={addAlias} />
<Grid fullWidth>
  <Row>
    {#each alias as alia, index}
      <div class="animate__animated animate__lightSpeedInRight TAGbutton">
        <Tag
          type={tagColor[index % tagColor.length]}
          on:click={e => closeFn(e, index)}>
          {alia}
        </Tag>
      </div>
    {/each}
  </Row>
</Grid>

<style global>
  .TAGbutton .bx--tag {
    cursor: pointer;
  }
  .TAGbutton .bx--tag:hover {
    opacity: 0.8;
  }

</style>
