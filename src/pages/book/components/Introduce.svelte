<script lang="ts">
  import Grid from "carbon-components-svelte/src/Grid/Grid.svelte";
  import Row from "carbon-components-svelte/src/Grid/Row.svelte";
  import Column from "carbon-components-svelte/src/Grid/Column.svelte";
  import Tile from "carbon-components-svelte/src/Tile/Tile.svelte";

  export let wordsNum: number = 0;
  export let scenesNum: number = 0;
  export let rolesNum: number = 0;

</script>

<Grid fullWidth>
  <Row>
    <Column>
      <Tile>
        <h3>{wordsNum}</h3>
        <p>Words Number</p>
      </Tile>
    </Column>
    <Column>
      <Tile>
        <h3>{scenesNum}</h3>
      </Tile>
    </Column>
    <Column>
      <Tile>
        <h3>{rolesNum}</h3>
      </Tile>
    </Column>
    <!-- <Column>
      <Tile>
        <h3>{0}</h3>
        <p>大纲字数</p>
      </Tile>
    </Column> -->
  </Row>
</Grid>
