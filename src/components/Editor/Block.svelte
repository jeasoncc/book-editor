<script>
  import deepClone from "deep-clone";
  import { createEventDispatcher } from "svelte";
  import { content, i18n, isActive } from "./stores";

  import Heading from "./blocks/Heading.svelte";
  import Paragraph from "./blocks/Paragraph.svelte";
  import Code from "./blocks/Code.svelte";
  import Quote from "./blocks/Quote.svelte";
  import Edit from "./actions/Edit.svelte";
  // import Create from "./actions/Create.svelte";

  export let block;
  export let i;

  const dispatch = createEventDispatcher();
  const blocks = {
    paragraph: Paragraph,
    heading: Heading,
    code: Code,
    quote: Quote,
  };

  const getComponent = type => {
    return blocks[type];
  };

  const handleChange = e => {
    dispatch("activateHistory");
    $content.blocks[e.detail.index].data.text = e.detail.content;
  };

</script>

<!-- {#if $isActive}
  <Create on:create={(e) => content.addBlock(i, e.detail, '')} />
{/if} -->
<div class="omnia-block">
  <svelte:component
    this={getComponent(block.type)}
    index={i}
    data={deepClone(block.data)}
    on:change={handleChange}
    on:remove={() => content.removeBlock(i, true, true)}
    placeholder={$i18n.placeholder} />
  {#if $isActive}
    <Edit
      on:switch={e => content.switchBlock(i, e.detail)}
      on:remove={() => content.removeBlock(i, false, true)} />
  {/if}
</div>

<style>
</style>
