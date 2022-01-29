<script>
  import { createEventDispatcher } from "svelte";
  import { isActive, hasFocus, i18n } from "../stores";
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

<h1
  id={`omnia-heading-${index}`}
  data-index={index}
  data-type="heading"
  class:omnia-heading-blur={!focus && $hasFocus}
  class="omnia-heading"
  use:contenteditable
  contenteditable="true"
  bind:this={element}
  bind:innerHTML={data.text}
  placeholder={$i18n.placeholder} />

<style>
  .omnia-heading {
    display: inline-block;
    width: 100%;
    outline: 0;
    text-align: center;
  }
  .omnia-heading-blur {
    opacity: 0.4;
  }
  .omnia-heading:empty:not(:focus):before {
    content: attr(placeholder);
    color: grey;
    font-style: italic;
    pointer-events: none;
  }

</style>
