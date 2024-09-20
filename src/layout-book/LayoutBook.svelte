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

</script>


<HeaderComponent />
<SidebarComponent />
<Content class="main">
  <!-- <Router {routes} /> -->
</Content>
<Foot />
