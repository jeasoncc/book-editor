<script>
  import { createEventDispatcher } from "svelte";
  import { hasFocus, i18n, isActive } from "../stores";
  import { editable, contenteditable } from "../helpers";

  export let index;
  export let data;
  export let focus = false;

  const dispatch = createEventDispatcher();

  let element;

  $: {
    if (element) {
      element.contentEditable = $isActive;
    }
  }
  editable.on("focus", elem => {
    if (elem === element) {
      focus = true;
      hasFocus.set(true);
    }
  });

  editable.on("blur", elem => {
    if (elem === element) {
      focus = false;
      hasFocus.set(false);
    }
  });

  editable.on("change", elem => {
    if (elem === element) {
      dispatch("change", { index, content: editable.getContent(elem) });
    }
  });

</script>

<q
  id={`omnia-quote-${index}`}
  data-index={index}
  data-type="quote"
  class="omnia-quote"
  class:omnia-quote-blur={!focus && $hasFocus}
  use:contenteditable
  contenteditable="true"
  bind:this={element}
  bind:innerHTML={data.text}
  placeholder={$i18n.placeholder} />

<style>
  .omnia-quote {
    display: inline-block;
    width: -webkit-fill-available;
    outline: 0;
    text-align: center;
    font-style: italic;
  }
  .omnia-quote-blur {
    opacity: 0.4;
  }
  .omnia-quote:empty:not(:focus):before {
    content: attr(placeholder);
    color: grey;
    font-style: italic;
    pointer-events: none;
  }

</style>
