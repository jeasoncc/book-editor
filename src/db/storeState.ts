import { writable } from "svelte/store";
import { StateClass } from "../schema/state/state.class";
import { StateInterface } from "../schema/state/state.interface";
const storeState = () => {
  const { subscribe, update, set } = writable(new StateClass());
  return {
    subscribe,
    init: (state: StateInterface) => {
      set(state);
    },
    /**
     * Sets current title.
     * @param {string} title Title to set.
     */
    setCurrentTitle: (title: string) =>
      update(n => {
        n.currentTitle = title;
        return n;
      }),
    setCurrentScene: (scene: string) =>
      update(n => {
        n.currentScene = scene;
        return n;
      }),
    /**
     * Sets currently active project.
     * @param {string} project Project ID.
     */
    setCurrentProject: (project: string) =>
      update(n => {
        n.currentProject = project;
        return n;
      }),
    setCurrentTyping: (typing: string) =>
      update(n => {
        n.currentTyping = typing;
        return n;
      }),
    /**
     * Sets currently active location.
     * @param {string} location Hash based URL.
     */
    setCurrentLocation: (location: string) =>
      update(n => {
        n.lastLocation = location;
        return n;
      }),
    /**
     * Updates Cloud timestamp.
     * @param {number} timestamp Unix Timestamp
     */
    updateCloudTimestamp: (timestamp: number) =>
      update(n => {
        n.lastCloudSave = timestamp.toFixed();
        n.lastLocalSave = timestamp.toFixed();
        return n;
      }),
    /**
     * Sets Local Timestamp to current time.
     */
    updateLocalTimestamp: () =>
      update(n => {
        n.lastLocalSave = (+new Date() / 1000).toFixed();
        return n;
      }),
    /**
     * Sets local login state.
     * @param {boolean} bool
     */
    setLogin: (bool: boolean) =>
      update(n => {
        n.isUserLoggedIn = bool;
        return n;
      }),
  };
};
export const state = storeState();
