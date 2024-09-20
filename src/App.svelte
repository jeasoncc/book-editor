<script lang="ts">
  import { onMount } from "svelte";
  import Router from "svelte-spa-router";
  import { Workbox } from "workbox-window";
  import { initStoreByDBFn } from "./db/init/initStoreByDB";
  import { initDBFn } from "./db/init/initDB";
  import { routes } from "src/constant-route"
  import { settings } from "./db/storeSettings";

  import Content from "carbon-components-svelte/src/UIShell/Content.svelte";
 // locale.set($settings.language);
 // $: document.documentElement.setAttribute("theme", $settings.theme);
 // $: {
 //   locale.set("en");
 // }
  // const wb = new Workbox("./service-worker.js");

  /**
   * Register Service Worker.
   */
  // if (
  //   "serviceWorker" in navigator &&
  //   !isRunningCapacitor &&
  //   !isRunningElectron &&
  //   window.location.hostname !== "localhost"
  // ) {
  //   wb.register();
  // }


 // onMount(async () => {
 //   await initDBFn();
 //   await initStoreByDBFn();
 // });

  const routeLoaded = () => {
  };
</script>

<Router {routes} on:routeLoaded={routeLoaded} />
