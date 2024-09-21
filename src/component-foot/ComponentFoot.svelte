<!-- /*
/*
 * 组件名称: ComponentFoot
 * 作者: Martin
 * 创建日期: 2024-09-20 12:51:21
 * 描述: 这是一个示例组件，包含基本的foreach案例。
 */
*/ -->
<script lang="ts">
  import "./index.scss";
  import {
    Grid,
    Row,
    Tag,
    Book16,
    Edit16,
    TrainSpeed16,
    UserAvatar16,
    Checkmark16,
    Loading,
    ProjectInterface,
    SceneInterface,
  } from "./index.ts";
  let count = 0;
  function increment() {
    count += 1;
  }

</script>

<div class="component">
  <h1>ComponentFoot 组件</h1>
  <p>点击次数: {count}</p>
</div>

<footer id="footer">
  <Grid fullWidth>
    <Row>
      <Tag size="sm" type="high-contrast" icon={Book16}>title</Tag>
      <Tag size="sm" type="high-contrast" icon={UserAvatar16}>author</Tag>

      <Tag
        size="sm"
        style="margin-left:auto"
        type="high-contrast"
        icon={Edit16}>
       current-file-name
      </Tag>
    </Row>
  </Grid>
</footer>
