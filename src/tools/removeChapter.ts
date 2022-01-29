import { chapters } from "src/db/storeChapters";
import { scenes } from "src/db/storeScenes";
import { state } from "src/db/storeState";
import { _ } from "svelte-i18n";
import { get } from "svelte/store";

export const removeChapter = (chapterId:string, fn: () => void) => {
    let confirmed = confirm( get(_)("sidebar.delete.chapter"));
    if (confirmed == true) {
      chapters.removeChapter(chapterId);
      scenes.removeAllChapterScenes(chapterId) 
    //   if(get(state).currentScene) 
      fn()
    }
};