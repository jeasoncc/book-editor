<script>
  import { createEventDispatcher } from "svelte";
  import { _ } from "svelte-i18n";
  import ChevronDownGlyph from "carbon-icons-svelte/lib/ChevronDownGlyph";
  import Edit16 from "carbon-icons-svelte/lib/Edit16";
  import tippy from "sveltejs-tippy";
  import nzhcn from "nzh/cn";
  import { chapters } from "src/db/storeChapters";
  export let chapter;
  export let index;

  const dispatch = createEventDispatcher();

  const edit = () => {
    dispatch("edit", chapter);
  };

</script>

<li class:open={chapter.ui.open} class="chapter">
  <div
    class="key"
    id={chapter.id}
    on:click|self={() => chapters.toggleChapterInSidebar(chapter.id)}>
    <span>第{nzhcn.encodeS(index + 1)}卷：</span>
    {chapter.title}

    <span
      class="collapse"
      on:click|self={() => chapters.toggleChapterInSidebar(chapter.id)}>
      <ChevronDownGlyph />
    </span>
    <span
      class=" action"
      use:tippy={{ content: $_('sidebar.editChapter'), placement: 'right' }}
      on:click={edit}>
      <Edit16 />
    </span>
  </div>
  {#if chapter.ui.open}
    <ul class="scenes">
      <slot />
    </ul>
  {/if}
</li>

<style lang="scss">
  @import "../../css/mixins/devices";

  li {
    cursor: pointer;
    display: block;
    width: 100%;
    word-break: break-word;

    span {
      text-decoration: none;
      opacity: 0.65;
    }

    .key {
      display: block;
      padding: 1rem;
      font-weight: bold;

      .collapse {
        float: right;
        transition-duration: abs($number: 500ms);
        transform: rotate(90deg);

        &:hover {
          opacity: 1;
        }
      }

      .action {
        visibility: visible;
        float: right;
        margin-right: 1em;
        opacity: 0.65;
        transition: transform 0.2s;

        @include desktop {
          visibility: hidden;
        }

        &:hover {
          opacity: 1;
          transform: scale(1.25);
        }
      }

      &:hover {
        opacity: 1;
        background-color: var(--menu-hover);

        @include desktop {
          .action {
            visibility: visible;
          }
        }
      }
    }
    &.open {
      .key .collapse {
        transform: rotate(0deg);
      }
    }

    .scenes {
      list-style-type: none;
      padding: 0;
    }
  }

</style>
