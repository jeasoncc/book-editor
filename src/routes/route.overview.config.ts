import OverviewRoute from "src/layout/BookListOverview.svelte";
import BookDetilOverview from "src/layout/BookDetilOverview.svelte";
import LayoutBook from "src/layout-book/LayoutBook.svelte";
import { wrap } from "svelte-spa-router/wrap";
export const routes = {
  "/": OverviewRoute,
  "/layout": LayoutBook,
  "/book": BookDetilOverview,
  "/book/*": BookDetilOverview,
  "*": OverviewRoute,
};
