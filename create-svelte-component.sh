#!/bin/bash

# 检查输入参数的数量
if [ "$#" -lt 1 ]; then
    echo "请提供组件名称，使用空格分隔。"
    exit 1
fi

# 将输入参数连接为一个目录名，并用 '-' 连接
component_name=$(echo "$*" | tr ' ' '-')

# 检查目录是否已经存在
component_path="src/$component_name"
if [ -d "$component_path" ]; then
    echo "目录 '$component_path' 已经存在，请使用不同的名称。"
    exit 1
fi

# 创建目录
mkdir -p "$component_path"

# 创建 items.json 文件
cat <<EOL > "$component_path/items.json"
[
    $(for i in $(seq 1 100); do echo "{\"id\": $i, \"name\": \"Item $i\"},"; done | sed '$ s/,$//')
]
EOL

# 创建 index.js 文件
cat <<EOL > "$component_path/index.js"
import Grid from "carbon-components-svelte/src/Grid/Grid.svelte";
import Row from "carbon-components-svelte/src/Grid/Row.svelte";
import Column from "carbon-components-svelte/src/Grid/Column.svelte";
import ImageLoader from "carbon-components-svelte/src/ImageLoader/ImageLoader.svelte";
import Tile from "carbon-components-svelte/src/Tile/Tile.svelte";
import RadioTile from "carbon-components-svelte/src/Tile/RadioTile.svelte";
import TileGroup from "carbon-components-svelte/src/Tile/TileGroup.svelte";

export {Grid, Row, Column, Tile, RadioTile, TileGroup}
export const items = require('./items.json');
EOL

# 创建 {大驼峰目录名}.svelte 文件
component_name_camel_case=$(echo "$component_name" | awk -F- '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)}1' OFS='')
cat <<EOL > "$component_path/${component_name_camel_case}.svelte"
<!-- /*
/*
 * 组件名称: $component_name_camel_case
 * 作者: Martin
 * 创建日期: $(date '+%Y-%m-%d %H:%M:%S')
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
    <p>点击次数: {count}</p>
    <button on:click={increment}>点击我</button>
    <ul>
        {#each items as item}
            <li>{item.name}</li>
        {/each}
    </ul>
</div>

<div class="component">
    <h1>$component_name_camel_case 组件</h1>
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
EOL

# 创建 index.test.js 文件
cat <<EOL > "$component_path/index.test.js"
import { render } from '@testing-library/svelte';
import $component_name_camel_case from './${component_name_camel_case}.svelte';

test('renders $component_name_camel_case component', () => {
    const { getByText } = render($component_name_camel_case);
    const heading = getByText(/$component_name_camel_case 组件/i);
    expect(heading).toBeInTheDocument();
});
EOL

# 创建 index.scss 文件
cat <<EOL > "$component_path/index.scss"
.component {
    border: 1px solid #ccc;
    padding: 16px;
    border-radius: 8px;
    background-color: #f9f9f9;
}

h1 {
    color: #333;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    padding: 4px 0;
}
EOL

echo "组件 '$component_name' 创建成功！"
