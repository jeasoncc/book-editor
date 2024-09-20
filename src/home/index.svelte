<!-- /*
* 组件名称: Home
* 作者: Martin
* 创建日期: 2024-09-20 03:40:43
* 描述: 这是一个示例组件，包含基本的DOM事件和foreach案例。
*/ -->
<script>
  import Grid from "carbon-components-svelte/src/Grid/Grid.svelte";
  import Row from "carbon-components-svelte/src/Grid/Row.svelte";
  import Column from "carbon-components-svelte/src/Grid/Column.svelte";
  import ImageLoader from "carbon-components-svelte/src/ImageLoader/ImageLoader.svelte";
  import Tile from "carbon-components-svelte/src/Tile/Tile.svelte";
  import RadioTile from "carbon-components-svelte/src/Tile/RadioTile.svelte";
  import TileGroup from "carbon-components-svelte/src/Tile/TileGroup.svelte";
  import "./index.css";

  let items = ["Item 1", "Item 2", "Item 3"];
  let count = 0;

  function increment() {
    count += 1;
  }

</script>

<div class="component">
  <p>点击次数: {count}</p>
</div>

<Grid noGutter>
  <Row>
    <Column sm={{ span: 3, offset: 0 }}>
      <TileGroup legend="Service pricing tiers" name="plan" selected="standard">
        {#each items as item}
          <RadioTile light on:click={increment} value={item}>{item}</RadioTile>
        {/each}
      </TileGroup>
    </Column>
    <Column sm={{ span: 1, offset: 0 }}>
      <Tile>Content</Tile>
    </Column>
  </Row>
</Grid>
