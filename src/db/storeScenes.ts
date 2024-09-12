import { writable } from "svelte/store";
import { SceneInterface } from "../schema/scene/scene.interface";
import moment from "moment";
import { typings } from "./storeTyping";

const storeScenes = () => {
  const { subscribe, update, set } = writable([]);
  return {
    subscribe,
    init: (scens: SceneInterface[]) => {
      set(scens);
    },
    /**
     * Creates new scene.
     * @param {string} chapter Chapter ID.
     * @param {string} title Title of the new chapter.
     */

    createScene: (scene: SceneInterface) => {
      const newscene = JSON.parse(JSON.stringify(scene));
      update(n => {
        newscene.order = n.length;
        console.log(scene);
        return n.concat([newscene]);
      });
      return {
        create: true,
        scene: newscene,
      };
    },
    setSceneshoeEdit: (id: string, showEdit: boolean) =>
      update(n => {
        const index = n.findIndex(c => c.id == id);
        n[index].showEdit = showEdit;
        n[index].lastEdit = moment().format();
        return n;
      }),
    /**
     * Sets scene title.
     * @param {string} id ID of the scene.
     * @param {string} title New title of scene.
     */
    setSceneTitle: (id: string, title: string) =>
      update(n => {
        const index = n.findIndex(c => c.id == id);
        n[index].title = title;
        n[index].lastEdit = moment().format();
        return n;
      }),
    /**
     * Sets scene title.
     * @param {string} id ID of the scene.
     * @param {number} order New index of the scene.
     */
    setSceneOrder: (id: string, order: number) =>
      update(n => {
        n[n.findIndex(c => c.id == id)].order = order;
        return n;
      }),
    /**
     * Sets scene content.
     * @param {string} id ID of the scene.
     * @param {string} title New content of scene.
     */
    setSceneContent: (id: string, content: any) =>
      update(n => {
        const index = n.findIndex(c => c.id == id);
        n[index].content = content;
        n[index].lastEdit = moment().format();
        typings.pushChaptersCurrentDayTyping(n[index].id, n[index].title);
        // typings.
        return n;
      }),
    /**
     * Sets scene title.
     * @param {string} id ID of the scene.
     * @param {string} chapter New chapter of the scene.
     */
    moveScene: (id: string, chapter: string) =>
      update(n => {
        n[n.findIndex(c => c.id == id)].chapter = chapter;
        return n;
      }),
    /**
     * Removes scene.
     * @param {string} id ID of the scene.
     */
    removeScene: (id: string) =>
      update(n => {
        return n.filter(n => n.id !== id);
      }),
    removeAllChapterScenes: (id: string) =>
      update((n: SceneInterface[]) => {
        return n.filter((n: SceneInterface) => n.chapter !== id);
      }),
    /**
     * Removes all scenes from chapter.
     * @param {string} id ID of the chapter.
     */
    removeAllScenes: (id: string) =>
      update((n: SceneInterface[]) => {
        return n.filter(n => n.project !== id);
      }),
  };
};
export const scenes = storeScenes();
