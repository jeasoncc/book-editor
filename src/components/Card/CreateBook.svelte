<script lang="ts">
  import AddAlt32 from "carbon-icons-svelte/lib/AddAlt32";
  import ClickableTile from "carbon-components-svelte/src/Tile/ClickableTile.svelte";
  import { _ } from "svelte-i18n";

</script>

<ClickableTile class="card-book" on:click>
  <AddAlt32 size={450} />
  <span>{$_('overviewListPage.creat')}</span>
</ClickableTile>
