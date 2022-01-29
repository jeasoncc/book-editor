<script lang="ts">
  import Modal from "carbon-components-svelte/src/Modal/Modal.svelte";
  import Accordion from "carbon-components-svelte/src/Accordion/Accordion.svelte";
  import AccordionItem from "carbon-components-svelte/src/Accordion/AccordionItem.svelte";
  import { _ } from "svelte-i18n";
  export let showCards;
  export let filteredCards;

</script>

<Modal
  open={showCards}
  modalHeading={$_('write.toolbar.cards')}
  primaryButtonText="取消"
  iconDescription="关闭对话框"
  on:click:button--primary={() => (showCards = false)}
  on:click:button--secondary={() => (showCards = false)}
  on:open={() => console.log('apen')}
  on:close={() => (showCards = false)}
  bind:show={showCards}>
  <Accordion>
    {#each filteredCards as card}
      <AccordionItem>
        <div slot="title">
          <h5>{card.title}</h5>
        </div>
        <p><br /> {card.content}</p>
      </AccordionItem>
    {/each}
  </Accordion>
</Modal>
