<!-- /*
/*
 * 组件名称: LayoutBook
 * 作者: Martin
 * 创建日期: 2024-09-20 12:18:42
 * 描述: 这是一个示例组件，包含基本的foreach案例。
 */
*/ -->
<script>
  import "./index.scss";
  import {
    HeaderComponent,
    SidebarComponent,
    Foot,
    Router,
    Content,
  } from "./index.js";

  let count = 0;
  function increment() {
    count += 1;
  }

</script>

<div class="component">
  <h1>LayoutBook 组件</h1>
  <p>点击次数: {count}</p>
</div>

<HeaderComponent />
<SidebarComponent />
<Content class="main">
  <!-- <Router {routes} /> -->
</Content>
<Foot />
