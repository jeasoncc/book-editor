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

# 创建 index.js 文件
cat <<EOL > "$component_path/index.js"
export let items = ['Item 1', 'Item 2', 'Item 3'];
export let count = 0;

export function increment() {
    count += 1;
}
EOL

# 创建 {大驼峰目录名}.svelte 文件
component_name_camel_case=$(echo "$component_name" | awk -F- '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)}1' OFS='')
cat <<EOL > "$component_path/${component_name_camel_case}.svelte"

<!-- /*
/*
 * 组件名称: $component_name_camel_case
 * 作者: Martin
 * 创建日期: $(date '+%Y-%m-%d %H:%M:%S')
 * 描述: 这是一个示例组件，包含基本的DOM事件和foreach案例。
 */
*/ -->
<script>
    import './index.css';
    import { items, count, increment } from './index.js';
</script>

<div class="component">
    <h1>$component_name_camel_case 组件</h1>
    <button on:click={increment}>点击我</button>
    <p>点击次数: {count}</p>

    <ul>
        {#each items as item}
            <li>{item}</li>
        {/each}
    </ul>
</div>
EOL

# 创建 index.test.js 文件
cat <<EOL > "$component_path/index.test.js"
import { render, fireEvent } from '@testing-library/svelte';
import $component_name_camel_case from './${component_name_camel_case}.svelte';

test('renders $component_name_camel_case component', () => {
    const { getByText } = render($component_name_camel_case);
    const heading = getByText(/$component_name_camel_case 组件/i);
    expect(heading).toBeInTheDocument();
});

test('increments count on button click', async () => {
    const { getByText } = render($component_name_camel_case);
    const button = getByText(/点击我/i);
    await fireEvent.click(button);
    expect(getByText(/点击次数: 1/i)).toBeInTheDocument();
});
EOL

# 创建 index.css 文件
cat <<EOL > "$component_path/index.css"
.component {
    border: 1px solid #ccc;
    padding: 16px;
    border-radius: 8px;
    background-color: #f9f9f9;
}

h1 {
    color: #333;
}

button {
    margin: 8px 0;
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
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
