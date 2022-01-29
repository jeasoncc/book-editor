<script>
  import { onDestroy, onMount } from "svelte";
  import { get } from "svelte/store";
  import { _ } from "svelte-i18n";
  import Sortable, {
    AutoScroll,
  } from "sortablejs/modular/sortable.core.esm.js";
  import Modal from "carbon-components-svelte/src/Modal/Modal.svelte";
  import nzhcn from "nzh/cn";
  import { chapters } from "src/db/storeChapters";
  import { scenes } from "src/db/storeScenes";
  import { state } from "src/db/storeState";

  try {
    Sortable.mount(new AutoScroll());
  } catch (e) {
    console.info("Prevent duplicate mounting.");
  }

  export let show = false;

  let orderChapter;

  const sortableConfig = {
    animation: 150,
    delay: 500,
    delayOnTouchOnly: true,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    scrollSpeed: 100,
    scrollSensitivity: 1000,
    bubbleScroll: true,
  };

  const save = () => {
    orderChapter
      .toArray()
      .map(chapter => {
        return {
          id: chapter,
          scenes: [
            ...document
              .querySelector(`[data-id="${chapter}"]`)
              .querySelectorAll("[data-id]"),
          ].map(scene => scene.id),
        };
      })
      .forEach((e, i) => {
        chapters.setChapterOrder(e.id, i);
        e.scenes.forEach((scene, p) => {
          scenes.setSceneOrder(scene, p);
          scenes.moveScene(scene, e.id);
        });
      });
    show = false;
  };

  onMount(() => {
    const chaptersRef = document.querySelector("#order.chapters");
    const sceneRefs = document.querySelectorAll("#order .scenes");

    orderChapter = Sortable.create(chaptersRef, {
      group: "chapters",
      ...sortableConfig,
    });
    sceneRefs.forEach(ref => {
      Sortable.create(ref, {
        group: "scenes",
        ...sortableConfig,
      });
    });
  });

  onDestroy(() => {
    [
      document.querySelector("#order.chapters"),
      ...document.querySelectorAll("#order .scenes"),
    ].forEach(ref => Sortable.get(ref).destroy());
  });

</script>

<Modal
  modalHeading={$_('sidebar.editOrder')}
  primaryButtonText="保存"
  open={show}
  secondaryButtons={[{ text: '取消' }]}
  iconDescription="关闭对话框"
  on:click:button--secondary={({ detail }) => {
    if (detail.text === '取消') show = false;
  }}
  on:open={() => console.log('apen')}
  on:close={() => (show = false)}
  on:submit={save}>
  <ul id="order" class="chapters">
    {#each get(chapters)
      .filter(chapter => chapter.project == $state.currentProject)
      .sort((a, b) => a.order - b.order) as chapter, i}
      <li class="parent" class:open={chapter.open} data-id={chapter.id}>
        <span>第{nzhcn.encodeS(i + 1)}卷：{chapter.title}</span>
        <ul class="scenes">
          {#each get(scenes)
            .filter(scene => scene.chapter == chapter.id)
            .sort((a, b) => a.order - b.order) as scene, si}
            <li data-id={scene.id}>
              <span>第{nzhcn.encodeS(si + 1)}章：{scene.title}</span>
            </li>
          {/each}
        </ul>
      </li>
    {/each}
  </ul>
  <!-- <ButtonGroup>
    <Button on:click={save} color="primary">Save</Button>
  </ButtonGroup> -->
</Modal>

<style lang="scss">
  .chapters {
    padding: 0;
    margin: 0;
    line-height: 1.1;
    li {
      list-style-type: none;
      padding: 0;
      font-weight: bold;
      -moz-user-select: none;
      -khtml-user-select: none;
      -webkit-user-select: none;
      user-select: none;
      -khtml-user-drag: element;
      -webkit-user-drag: element;

      span {
        opacity: 0.65;
        display: block;
        padding: 0.5rem;
        &:hover {
          background-color: var(--menu-hover);
          opacity: 1;
        }
      }
      .scenes {
        li {
          font-weight: normal;
          -moz-user-select: none;
          -khtml-user-select: none;
          -webkit-user-select: none;
          user-select: none;
          padding-left: 1rem;
          -khtml-user-drag: element;
          -webkit-user-drag: element;
        }
      }
    }
  }

</style>
