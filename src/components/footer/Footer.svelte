<script lang="ts">
  import { ProjectInterface } from "src/schema/project/project.interface";
  import Grid from "carbon-components-svelte/src/Grid/Grid.svelte";
  import Tag from "carbon-components-svelte/src/Tag/Tag.svelte";
  import Row from "carbon-components-svelte/src/Grid/Row.svelte";
  import Book16 from "carbon-icons-svelte/lib/Book16";
  import TrainSpeed16 from "carbon-icons-svelte/lib/TrainSpeed16";
  import { Loading } from "carbon-components-svelte";
  import UserAvatar16 from "carbon-icons-svelte/lib/UserAvatar16";
  import Checkmark16 from "carbon-icons-svelte/lib/Checkmark16";
  import { isLoading, isSaved } from "src/store";
  import Edit16 from "carbon-icons-svelte/lib/Edit16";
  import { SceneInterface } from "src/schema/scene/scene.interface";
  export let currenProject: ProjectInterface;
  export let currentScence: SceneInterface;

  let wordsNum: number = 0;
  $: {
    if (currentScence) {
      wordsNum = currentScence.content.blocks.reduce((prev, cur) => {
        if (cur.type === "paragraph") {
          return prev + cur.data.text.length;
        }
        return prev;
      }, 0);
    }
  }

</script>

<footer id="footer">
  <Grid fullWidth>
    <Row>
      <Tag size="sm" type="high-contrast" icon={Book16}>
        {currenProject.title}
      </Tag>
      <Tag size="sm" type="high-contrast" icon={UserAvatar16}>
        {currenProject.author}
      </Tag>
      
      {#if $isLoading}
        <Tag size="sm" type="high-contrast">
          <Loading
            description="正在加载"
            active={$isLoading}
            withOverlay={false}
            small />
        </Tag>
      {/if}
      {#if $isSaved}
        <Tag size="sm" type="high-contrast" icon={Checkmark16}>已经保存</Tag>
      {/if}
      <Tag size="sm" style="margin-left:auto" type="high-contrast" icon={Edit16}>{wordsNum}</Tag>
      <!-- <Tag
        style="margin-left:auto"
        size="sm"
        type="high-contrast"
        icon={TrainSpeed16}>
        100WPM
      </Tag> -->
    </Row>
  </Grid>
</footer>

<style>
  #footer {
    position: fixed;
    height: 1.7rem;
    width: 100%;
    bottom: 0;
    right: 0;
    /* background: var(--cds-ui-01,#f4f4f4); */
    background: var(--cds-inverse-02, #393939);
    z-index: 100000;
  }

</style>
