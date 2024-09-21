<!-- /*
/*
 * 组件名称: AppEntry
 * 作者: Martin
 * 创建日期: 2024-09-21 04:28:25
 * 描述: 这是一个示例组件，包含基本的foreach案例。
 */
*/ -->
<script>
  import "./index.scss";
 // import { Router, routes } from "./index.js";
 import {link} from 'svelte-spa-router'

import Router from "svelte-spa-router";
import { routes } from "src/constant-route";
</script>

<div class="component">
  <a href="/book" use:link>The Little Prince</a>
  <h1>AppEntry 组件</h1>
  <Router {routes} />

</div>
