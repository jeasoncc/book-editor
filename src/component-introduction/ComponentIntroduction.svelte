<!-- /*
/*
 * 组件名称: ComponentIntroduction
 * 作者: Martin
 * 创建日期: 2024-09-21 07:47:32
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
    <h1>ComponentIntroduction 组件</h1>
  <p>点击次数: {count}</p>
</div>

