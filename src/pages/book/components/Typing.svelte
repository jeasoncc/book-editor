<script lang="ts">
  import Toolbar from "carbon-components-svelte/src/DataTable/Toolbar.svelte";
  import DataTable from "carbon-components-svelte/src/DataTable/DataTable.svelte";
  import ToolbarContent from "carbon-components-svelte/src/DataTable/ToolbarContent.svelte";
  import ToolbarSearch from "carbon-components-svelte/src/DataTable/ToolbarSearch.svelte";
  import ToolbarMenu from "carbon-components-svelte/src/DataTable/ToolbarMenu.svelte";
  import ToolbarMenuItem from "carbon-components-svelte/src/DataTable/ToolbarMenuItem.svelte";
  import Tag from "carbon-components-svelte/src/Tag/Tag.svelte";
  import { typings } from "src/db/storeTyping";
  import {
    // chaptersType,
    TypingInterface,
  } from "src/schema/typing/typing.interface";
  import ToolbarBatchActions from "carbon-components-svelte/src/DataTable/ToolbarBatchActions.svelte";
  import Button from "carbon-components-svelte/src/Button/Button.svelte";
  import { Save16 } from "carbon-icons-svelte";
  import { _ } from "svelte-i18n";

  import moment from "moment";
  import { state } from "src/db/storeState";
  let selectedRowIds = [];
  let currentProjectTypings = []
  $: console.log("selectedRowIds", selectedRowIds);
  $: {
    if($typings.length && $state.currentProject) {
      currentProjectTypings = $typings.filter(typing => typing.project === $state.currentProject)
    }
  }
  export let wordsNum: number = 0;
  const headerConfig = [
    { key: "date", value: $_("overviewPage.talbe.tableHead.date") },
    // { key: "typingSpeed", value: "打字速度" },
    { key: "typingNum", value: $_("overviewPage.talbe.tableHead.typingNum") },
    { key: "chapters", value: $_("overviewPage.talbe.tableHead.chapters") },
  ];
  $: {
    try {
      if ($typings.length && $state.currentProject &&  currentProjectTypings.length) {
        const todayTyping: TypingInterface = $typings.find(
          (typing: TypingInterface) => {
            return typing.id === $state.currentTyping;
          }
        );
        if ($typings.length && $typings.length === 1) {
          todayTyping.typingNum = wordsNum;
        }
        if ($typings.length && $typings.length > 1) {
          const beforeTodayTypings = $typings
            .filter((typing: TypingInterface) => {
              return (
                typing.project === $state.currentProject &&
                typing.date !== moment().format("YYYY-MM-DD")
              );
            })
            .reduce((prev, cur) => {
              return prev + cur.typingNum;
            }, 0);
          todayTyping.typingNum = wordsNum - beforeTodayTypings;
        }
      }
    } catch (error) {
      console.info(error);
    }
  }

</script>

<DataTable
  selectable
  bind:selectedRowIds
  zebra
  expandable
  title={$_('overviewPage.talbe.title')}
  description={$_('overviewPage.talbe.description')}
  headers={headerConfig}
  rows={currentProjectTypings}>
  <Toolbar>
    <ToolbarBatchActions>
      <Button icon={Save16}>{$_('overviewPage.talbe.menu.export')}</Button>
    </ToolbarBatchActions>
    <ToolbarContent>
      <ToolbarSearch />
      <ToolbarMenu>
        <ToolbarMenuItem primaryFocus>
          {$_('overviewPage.talbe.menu.refresh')}
        </ToolbarMenuItem>
        <ToolbarMenuItem danger>
          {$_('overviewPage.talbe.menu.clean')}
        </ToolbarMenuItem>
      </ToolbarMenu>
      <Button>{$_('overviewPage.talbe.menu.export')}</Button>
    </ToolbarContent>
  </Toolbar>
  <svelte:fragment slot="cell" let:cell>
    {#if cell.key === "chapters"}
      {#each cell.value as value, key}
        {#if key < 2}
          <Tag >{value.title}</Tag>
        {:else if key === 2}
          <Tag >...</Tag>
        {/if}
      {/each}
    {:else}
      {cell.value}
    {/if}
  </svelte:fragment>
  <svelte:fragment slot="expanded-row" let:row>
    <pre>
      {JSON.stringify(row, null, 2)}
    </pre>
  </svelte:fragment>
</DataTable>
