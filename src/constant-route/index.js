import { wrap } from "svelte-spa-router/wrap";
import LayoutHome from "../layout-home/LayoutHome.svelte"
import LayoutBook from "../layout-book/LayoutBook.svelte"
import Layout404 from "../layout-404/Layout404.svelte"

// export const routes = {
//   "/": wrap({
//     asyncComponent: () => import("../layout-home/LayoutHome.svelte"),
//   }),
//   "/book": wrap({
//     asyncComponent: () => import("../layout-book/LayoutBook.svelte"),
//   }),
//   "*": wrap({
//     asyncComponent: () => import("../layout-404/Layout404.svelte"),
//   }),
// };

export const routes = {
  "/": LayoutHome,
  "/book":LayoutBook,
  "*":Layout404,
};
