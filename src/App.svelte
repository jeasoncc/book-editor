<script lang="ts">
  import { onMount } from "svelte";
  import Router from "svelte-spa-router";
  import { Workbox } from "workbox-window";
  import { isRunningElectron, isRunningCapacitor } from "./bridge";
  import { initStoreByDBFn } from "./db/init/initStoreByDB";
  import { initDBFn } from "./db/init/initDB";
  import { locale } from "svelte-i18n";
  import { routes } from "src/routes/route.overview.config";
  import { settings } from "./db/storeSettings";

  locale.set($settings.language);
  $: document.documentElement.setAttribute("theme", $settings.theme);
  $: {
    locale.set($settings.language);
  }
  const wb = new Workbox("./service-worker.js");

  /**
   * Register Service Worker.
   */
  if (
    "serviceWorker" in navigator &&
    !isRunningCapacitor &&
    !isRunningElectron &&
    window.location.hostname !== "localhost"
  ) {
    wb.register();
  }

  const routeLoaded = () => {
    console.log("路由守卫");
    console.log("老实说，我也不知道这是什么");
  };

  onMount(async () => {
    await initDBFn();
    await initStoreByDBFn();
  });

</script>

<div class="container">
  <div id="saveTip" />
  <Router {routes} on:routeLoaded={routeLoaded} />
</div>
