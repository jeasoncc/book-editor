<script lang="ts">
  import Form from "carbon-components-svelte/src/Form/Form.svelte";
  import Column from "carbon-components-svelte/src/Grid/Column.svelte";
  import Row from "carbon-components-svelte/src/Grid/Row.svelte";
  import Grid from "carbon-components-svelte/src/Grid/Grid.svelte";
  import Search from "carbon-components-svelte/src/Search/Search.svelte";
  import Button from "carbon-components-svelte/src/Button/Button.svelte";
  import ArrowUp16 from "carbon-icons-svelte/lib/ArrowUp16";
  import Close16 from "carbon-icons-svelte/lib/Close16";
  import ArrowDown16 from "carbon-icons-svelte/lib/ArrowDown16";
  import DirectionCurve16 from "carbon-icons-svelte/lib/DirectionCurve16";
  import DirectionMerge16 from "carbon-icons-svelte/lib/DirectionMerge16";
  import WatsonHealthTextAnnotationToggle16 from "carbon-icons-svelte/lib/WatsonHealthTextAnnotationToggle16";
  import findandreplacedomtext from "findandreplacedomtext";
  import Tile from "carbon-components-svelte/src/Tile/Tile.svelte";
  import { SceneInterface } from "src/schema/scene/scene.interface";

  let searchValue = "";
  let replaceValue = "";
  let searchIndex = 0;
  let searchMatchArrayElement = [];
  let MaxIndex = 0;
  let selectElement = [];
  export let currentScene: SceneInterface;
  export let editorReRenderFn: Function;
  export let edirotReolaceSaverFn: Function;
  export let show;
  $: {
    if (!show) {
      searchValue = "";
      replaceValue = "";
    }
  }
  const flagFn = () => {
    Array.from(selectElement).map(element => {
      element.classList.remove("ag-highlight");
      element.classList.remove("animate__animated");
      element.classList.remove("animate__heartBeat");
    });
    const element = selectElement[searchIndex];
    element.classList.add("ag-highlight");
    element.classList.add("animate__animated");
    element.classList.add("animate__heartBeat");
  };
  const searchFn = async () => {
    console.info(searchValue);
    console.table(currentScene);
    console.table(currentScene.content.blocks);
    if (!searchValue) return;
    console.log(editorReRenderFn);
    await editorReRenderFn();
    const elements = document.querySelectorAll(".ce-paragraph.cdx-block");
    console.log(elements);
    searchMatchArrayElement = Array.from(elements).filter(element => {
      return element.textContent.match(searchValue);
    });
    if (!searchMatchArrayElement.length || !searchValue) return;

    searchMatchArrayElement.map(element => {
      findandreplacedomtext(element, {
        find: new RegExp(searchValue, "g"),
        wrap: "replace",
        wrapClass: "ag-selection",
      });
    });
    selectElement = Array.from(document.querySelectorAll(".ag-selection"));
    MaxIndex = selectElement.length - 1;
    flagFn();
  };
  const nextSearch = () => {
    searchIndex++;
    if (searchIndex > MaxIndex) {
      searchIndex = 0;
    }
    console.log(`searchIndex = ${searchIndex}`);
    flagFn();
  };
  const previewSearch = () => {
    searchIndex--;
    if (searchIndex < 0) {
      searchIndex = MaxIndex;
    }
    console.log(`searchIndex = ${searchIndex}`);
    flagFn();
  };
  const closeModelFn = async () => {
    await editorReRenderFn();
    show = false;
  };

  const replaceCurrentElementFn = () => {
    selectElement[searchIndex].textContent = replaceValue;
    console.log(edirotReolaceSaverFn);
    edirotReolaceSaverFn();
  };
  const replaceAllElementFn = () => {
    console.log(replaceValue);
    Array.from(selectElement).map(cur => {
      cur.textContent = replaceValue;
    });
    edirotReolaceSaverFn();
  };

</script>

{#if show}
  <div class="search">
    <Tile>
      <Form>
        <Grid condensed padding>
          <Row>
            <Column md={5}>
              <Search
                size="sm"
                autofocus
                placeholder="查找"
                on:change={searchFn}
                bind:value={searchValue} />
            </Column>

            <!-- <Button
            size="small"
            kind="ghost"
            on:click={searchFn}
            iconDescription="搜索"
            icon={Search16} /> -->
            <Button
              size="small"
              kind="ghost"
              on:click={previewSearch}
              tooltipPosition="top"
              iconDescription="上一个"
              disabled={!selectElement.length}
              icon={ArrowUp16} />
            <Button
              size="small"
              kind="ghost"
              on:click={nextSearch}
              tooltipPosition="top"
              disabled={!selectElement.length}
              iconDescription="下一个"
              icon={ArrowDown16} />
            <Button
              size="small"
              kind="ghost"
              tooltipPosition="top"
              iconDescription="关闭"
              icon={Close16}
              on:click={closeModelFn} />
          </Row>
          <Row>
            <Column md={5}>
              <Search
                icon={WatsonHealthTextAnnotationToggle16}
                placeholder="替换为"
                size="sm"
                on:change={searchFn}
                bind:value={replaceValue} />
            </Column>

            <Button
              size="small"
              kind="ghost"
              iconDescription="替换"
              on:click={replaceCurrentElementFn}
              icon={DirectionCurve16} />
            <Button
              size="small"
              kind="ghost"
              on:click={replaceAllElementFn}
              iconDescription="替换全部"
              icon={DirectionMerge16} />
          </Row>
        </Grid>
      </Form>
    </Tile>
  </div>
{/if}

<style global>
  .search {
    position: fixed;
    right: 2rem;
    top: 6rem;
    box-shadow: 0 1px 6px 3px rgba(0, 0, 0, 0.2);
    z-index: 10;
  }

  .ag-selection {
    margin-right: 0.5em;
    background: gray;
    /* color: purple; */
    border-radius: 3px;
  }
  .ag-highlight {
    -webkit-animation-name: highlight;
    animation-name: highlight;
    -webkit-animation-duration: 0.25s;
    animation-duration: 0.25s;
    background: #ac94c9;
    color: white;
    display: inline-block;
    border-radius: 3px;
    height: 1.3em;
    line-height: 1.3em;
    border-radius: 4px;
  }

</style>
