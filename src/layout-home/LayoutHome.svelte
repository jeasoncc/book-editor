<!-- /*
/*
 * 组件名称: LayoutHome
 * 作者: Martin
 * 创建日期: 2024-09-21 04:13:49
 * 描述: 这是一个示例组件，包含基本的foreach案例。
 */
*/ -->
<script>
  import "./index.scss";
 import {ComponentIntroduction,ComponentLogin  } from "./index.js";

  let count = 0;
  function increment() {
    count += 1;
  }

</script>

<div class="component">
  <h1>LayoutHome 组件</h1>
</div>
<ComponentIntroduction />
<ComponentLogin />
