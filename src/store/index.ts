import { writable } from "svelte/store";
export const ui = writable({
  focus: false,
  support: {
    show: false,
  },
});
export const replaceFlag = writable(false);
export const editorjsInitSuccess = writable(false);
export const editorjs = writable({});
export const isSideNavOpen = writable(true);
export const isLoading = writable(false);
export const isSaved = writable(false);
export const isFullScreen = writable(false);
