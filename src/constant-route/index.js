import { wrap } from "svelte-spa-router/wrap";
export const routes = {
  "/": wrap({
    asyncComponent: () => import("../layout-home/LayoutHome.svelte"),
  }),
  "/book": wrap({
    asyncComponent: () => import("../layout-book/LayoutBook.svelte"),
  }),
  "*": wrap({
    asyncComponent: () => import("../layout-404/Layout404.svelte")
  })
};
