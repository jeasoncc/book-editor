<script type="text/javascript">
  import Grid from "carbon-components-svelte/src/Grid/Grid.svelte";
  import Row from "carbon-components-svelte/src/Grid/Row.svelte";
  import Column from "carbon-components-svelte/src/Grid/Column.svelte";
  import ImageLoader from "carbon-components-svelte/src/ImageLoader/ImageLoader.svelte";
  import Tile from "carbon-components-svelte/src/Tile/Tile.svelte";

</script>

<Grid noGutter>
  <Row>
    <Column sm={{ span: 3, offset: 0 }}>
      <Tile light>CContentContentContentContentContentContentContentContentContentontent</Tile>
    </Column>
    <Column sm={{ span: 1, offset: 0 }}>
      <Tile>Content</Tile>
    </Column>
  </Row>
</Grid>
