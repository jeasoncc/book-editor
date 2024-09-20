<!-- /*
/*
 * 组件名称: Layout404
 * 作者: Martin
 * 创建日期: 2024-09-21 04:16:12
 * 描述: 这是一个示例组件，包含基本的foreach案例。
 */
*/ -->
<script>
    import './index.scss';
    import {Grid, Row, Column, Tile, RadioTile, TileGroup, items} from './index.js';
    let count = 0;
    function increment() {
        count += 1;
    }
</script>

<div class="component">
    <h1>Layout404 组件</h1>
  <p>点击次数: {count}</p>
</div>

<Grid noGutter>
  <Row>
    <Column sm={{ span: 3, offset: 0 }}>
      <TileGroup legend="Service pricing tiers" name="plan" selected="standard">
        {#each items as item}
          <RadioTile light on:click={increment} value={item.id}>{item.name}</RadioTile>
        {/each}
      </TileGroup>
    </Column>
    <Column sm={{ span: 1, offset: 0 }}>
      <Tile>Content</Tile>
    </Column>
  </Row>
</Grid>
