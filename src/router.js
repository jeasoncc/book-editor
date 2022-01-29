import OverviewRoute from "./layout/Overview.svelte";
import { wrap } from "svelte-spa-router/wrap";
export const routes = {
  "/": OverviewRoute,
  "/book": wrap({
    asyncComponent: () => import("./layout/Book.svelte"),
  }),
  "*": OverviewRoute,
};
