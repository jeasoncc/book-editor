import OverviewRoute from "src/pages/book/BookOverView.svelte";
import RoleCenter from "src/pages/roleCards/RoleCenter.svelte";
// import Write from "src/pages/Write.svelte";
import WriteBook from "src/pages/write/WriteBook.svelte";
import Settings from "src/pages/Settings.svelte";
// import Export from "src/pages/Export.svelte";
// import Home from "src/layout/home.svelte";
// import Home from "src/home/index.svelte";
// import Home from "src/page-home/PageHome.svelte";
// import { wrap } from "svelte-spa-router/wrap";
import LayoutBook from "../layout-book/LayoutBook.svelte";
import Page404 from "../page-404/Page404.svelte";
export const routes = {
  // "/": OverviewRoute,
  "/": LayoutBook,
  // "*/home": Home,
  // "*/cards": RoleCenter,
  // "*/write/:sceneId?": WriteBook,
  // "*/settings": Settings,
  // "*/export": Export,
  // "*/thirdparty": wrap({
  //   asyncComponent: () => import("./shared/ThirdParty.svelte"),
  // }),
  // "*/policy": wrap({
  //   asyncComponent: () => import("./shared/Disclaimer.svelte"),
  // }),
  // "*/disclaimer": wrap({
  //   asyncComponent: () => import("src/pages/Cloud/Policy.svelte"),
  // }),
  // Catch-all
  "*": Page404,
};
