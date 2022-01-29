import { TypingInterface } from "src/schema/typing/typing.interface";
import { get, writable } from "svelte/store";
import { state } from "./storeState";

const storeTypings = () => {
  const { subscribe, update, set } = writable([]);
  return {
    subscribe,
    init: (typings: TypingInterface[]) => {
      set(typings);
    },
    createTyping: (typing: TypingInterface) => {
      update(n => {
        return n.concat([typing]);
      });
      return {
        create: true,
        typing,
      };
    },

    pushChaptersCurrentDayTyping: (
      typingChapterID: string,
      typingChapterTitle: string
    ) =>
      update((n: TypingInterface[]) => {
        const index = n.findIndex(c => c.id == get(state).currentTyping);
        const currentDaychapters = n[index].chapters;
        currentDaychapters.push({
          id: typingChapterID,
          title: typingChapterTitle,
        });
        const currentDaychapterSet = new Set(
          currentDaychapters.map(cur => JSON.stringify(cur))
        );
        n[index].chapters = [...currentDaychapterSet].map(cur =>
          JSON.parse(cur)
        );
        return n;
      }),

    removeTyping: (id: string) =>
      update(n => {
        return n.filter(n => n.id !== id);
      }),
    /**
     * Removes all scenes from chapter.
     * @param {string} id ID of the chapter.
     */
    removeAllScenes: (id: string) =>
      update((n: TypingInterface[]) => {
        return n.filter(n => n.project !== id);
      }),
  };
};

export const typings = storeTypings();
