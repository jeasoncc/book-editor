<script>
  import { createEventDispatcher } from "svelte";

  import IconCode from "../icons/IconCode.svelte";
  import IconParagraph from "../icons/IconParagraph.svelte";
  import IconQuote from "../icons/IconQuote.svelte";
  import IconHeading from "../icons/IconHeading.svelte";
  import { i18n } from "../stores";

  const dispatch = createEventDispatcher();

</script>

<div class="omnia-create">
  <button
    title={$i18n.blocks.paragraph}
    on:click={() => dispatch('create', 'paragraph')}>
    <IconParagraph />
  </button>
  <button
    title={$i18n.blocks.quote}
    on:click={() => dispatch('create', 'quote')}>
    <IconQuote />
  </button>
  <button
    title={$i18n.blocks.heading}
    on:click={() => dispatch('create', 'heading')}>
    <IconHeading />
  </button>
  <button title={$i18n.blocks.code} on:click={() => dispatch('create', 'code')}>
    <IconCode />
  </button>
</div>

<style>
  .omnia-create {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: auto;
    align-content: start;
    opacity: 0;
    transition: opacity 0.1s;
  }
  .omnia-create:hover {
    opacity: 1;
  }
  button {
    flex: 0 0 auto;
    background: none;
    border: none;
    cursor: pointer;
    transition: transform 0.1s;
  }
  button:hover {
    transform: scale(1.2);
  }
  @media (max-width: 960px) {
    .omnia-create {
      opacity: 0.1;
    }
  }

</style>
