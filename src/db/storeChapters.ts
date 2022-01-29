import { writable } from "svelte/store";
import { getRandomNumber } from "../tools/getRandomNumber";
import { ChapterInterface } from "../schema/chapter/chapter.Interface";
import { Chapter } from "../schema/chapter/chapter.class";
const storeChapters = () => {
  const { subscribe, update, set } = writable([]);

  return {
    subscribe,
    init: (chapters: ChapterInterface[]) => {
      set(chapters);
    },
    /**
     * Creates new chapter.
     * @param {string} project Project ID.
     * @param {string} title Title of the new chapter.
     */
    createChapter: (project: string, title: string) =>
      update(n => {
        return n.concat([
          new Chapter(getRandomNumber(), project, title, n.length, true),
        ]);
      }),
    /**
     * Sets chapter title.
     * @param {string} id ID of the chapter.
     * @param {string} title New title of chapter.
     */
    setChapterTitle: (id: string, title: string) =>
      update(n => {
        n[n.findIndex((c: ChapterInterface) => c.id == id)].title = title;
        return n;
      }),
    setChapterOpen: (id: string, open: boolean) =>
      update(n => {
        // n.find((c) =>c.id == id ).open = true
        n[n.findIndex((c: ChapterInterface) => c.id == id)].open = !open;
        return n;
      }),
    /**
     * Sets chapter order.
     * @param {string} id ID of the chapter.
     * @param {number} order New index of the chapter.
     */
    setChapterOrder: (id: string, order: number) =>
      update(n => {
        n[n.findIndex((c: ChapterInterface) => c.id == id)].order = order;
        return n;
      }),
    /**
     * Removes chapter.
     * @param {string} id ID of the chapter.
     */
    removeChapter: (id: string) =>
      update(n => {
        return n.filter(n => n.id !== id);
      }),
    /**
     * Removes all chapters from project.
     * @param {string} id ID of the chapter.
     */
    removeAllChapters: (id: string) =>
      update(n => {
        return n.filter(n => n.project !== id);
      }),
    /**
     * Toggles sidebar state of a chapter => Open/Closed.
     * @param {string} id ID of the chapter.
     */
    toggleChapterInSidebar: (id: string) =>
      update(n => {
        const index = n.findIndex(c => c.id == id);
        n[index].ui.open = !n[index].ui.open;
        return n;
      }),
  };
};

export const chapters = storeChapters();
