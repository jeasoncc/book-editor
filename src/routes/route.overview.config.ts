import OverviewRoute from "src/layout/BookListOverview.svelte";
import BookDetilOverview from "src/layout/BookDetilOverview.svelte";
import { wrap } from "svelte-spa-router/wrap";
export const routes = {
  "/": OverviewRoute,
  "/book": BookDetilOverview,
  "/book/*": BookDetilOverview,
  "*": OverviewRoute,
};
