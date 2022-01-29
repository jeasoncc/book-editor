import { state } from "src/db/storeState";
import { push } from "svelte-spa-router";

export const routerLinkFn = (sceneId: string) => {
  state.setCurrentScene(sceneId);
  push("#/book/write/" + sceneId);
};
