<script>
  import { _ } from "svelte-i18n";
  import { reloadWindow } from "../../bridge";
  import cloud from "../../appwrite";
  import { Table, Cell, Row, Heading } from "../../components/Table";
  import Spinner from "../../shared/Spinner.svelte";
  import { formatDistance, formatDate } from "../../utils";

  let isLoadingBackup = false;

  function restoreBackup(id) {
    isLoadingBackup = true;
    cloud
      .restoreBackup(id)
      .then(() => {
        isLoadingBackup = false;
        reloadWindow();
      })
      .catch(() => {
        isLoadingBackup = false;
      });
  }
  function formatBytes(a, b) {
    if (0 == a) return "0 Bytes";
    var c = 1024,
      d = b || 2,
      e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f];
  }

</script>

{#if isLoadingBackup}
  <Spinner />
  <br />
  <i>{$_('cloud.backups.migrating')}</i>
{:else}
  <h2>{$_('cloud.backups.title')}</h2>
  {#await cloud.getAllBackups()}
    <Spinner />
  {:then backups}
    <Table>
      <Row>
        <Heading>Timestamp</Heading>
        <Heading>Age</Heading>
        <Heading>Size</Heading>
      </Row>
      {#each backups.files as backup}
        <Row on:click={() => restoreBackup(backup.$id)}>
          <Cell label="Timestamp">{formatDate(backup.dateCreated)}</Cell>
          <Cell label="Age">{formatDistance(backup.dateCreated)}</Cell>
          <Cell label="Size">{formatBytes(backup.sizeOriginal)}</Cell>
        </Row>
      {/each}
    </Table>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
{/if}
