<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { debounce } from "throttle-debounce";
  import { isActive, content, historyStore, defaultData, i18n } from "./stores";
  import { format, setSpellCheck } from "./helpers";
  import deepClone from "deep-clone";

  import Create from "./actions/Create.svelte";

  import Block from "./Block.svelte";
  import Sidebar from "./Sidebar.svelte";

  export const history = historyStore();
  export let active = true;
  export let spellCheck = false;
  export let sidebar = true;
  export let data;

  export let translation = {};

  export const toggleFormat = tag => {
    format(tag);
  };

  export const getContent = () => {
    return content;
  };

  export const setActive = bool => {
    $isActive = bool;
  };

  export const update = () => {
    onInit();
  };

  let editor;
  let contenteditable = false;
  const dispatch = createEventDispatcher();

  const onInit = () => {
    $isActive = active;
    if (data && data.blocks) {
      $content = deepClone(data);
    } else {
      $content = deepClone(defaultData);
    }
    $i18n = {
      ...$i18n,
      ...translation,
    };
    history.reset();
    dispatch("init");
  };

  const activateHistory = () => {
    $history.active = true;
  };

  const emitChange = debounce(500, () => {
    $history.active && history.add();
    dispatch("change", $content);
  });

  setSpellCheck(spellCheck);
  onMount(onInit);

  content.subscribe(() => {
    dispatch("input");
    emitChange();
  });
  const keydownFn = e => {
    if ((e.ctrlKey || e.metaKey) && e.keyCode == 65) {
      console.log("allow");
      console.log("按下ctrl+enter键");
      // contenteditable = true;
    } else {
      // contenteditable = false;
      // e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }
  };

</script>

<div
  class="omnia-editor"
  on:keydown={keydownFn}
  on:keyup={() => (contenteditable = false)}
  {contenteditable}
  bind:this={editor}>
  {#if sidebar}
    <Sidebar>
      <slot />
    </Sidebar>
  {/if}
  <div class="omnia-blocks">
    {#if $content && $content.blocks}
      {#each $content.blocks as block, i}
        <Block {block} {i} on:activateHistory={activateHistory} />
      {/each}
      {#if $isActive}
        <Create
          on:create={e => content.addBlock(0, e.detail, '')}
          on:remove={() => content.removeBlock(0, false, $i18n.confirmDelete)} />
      {/if}
    {/if}
  </div>
</div>

<style>
  .omnia-editor {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    line-height: 2.5rem;
    text-align: justify;
    background-color: inherit;
    display: flex;
    flex-direction: row;
    background: red;
  }
  @media (max-width: 960px) {
    .omnia-editor {
      line-height: 2rem;
    }
  }
  .omnia-blocks {
    width: 100%;
    margin: 3rem 0;
  }

</style>
