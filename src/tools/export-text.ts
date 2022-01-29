import { chapters } from "src/db/storeChapters";
import { projects } from "src/db/storeProjects";
import { scenes } from "src/db/storeScenes";
import { get } from "svelte/store";

export class TextExportClass {
  [x: string]: any;
  constructor(id: string) {
    this.projectId = id;
  }

  async fetchData() {
    const blockMapper = currentBlock => {
      if (!currentBlock.data) return [];
      if (currentBlock.type === "paragraph") {
        return currentBlock.data.text;
      }
      if (currentBlock.type === "header") {
        return "\n\n" + currentBlock.data.text + "\n\n";
      }
    };

    const sceneMapper = (currentScene, index) => {
      return currentScene.content.blocks.flatMap(blockMapper).join("");
    };

    const chapterMapper = (currentChapter, index) => {
      return (
        "\n" +
        currentChapter.title +
        get(scenes)
          .filter(scene => scene.chapter == currentChapter.id && scene.content)
          .sort(this.compare)
          .map(sceneMapper)
          .join("")
      );
    };

    const title = get(projects).find(e => e.id == this.projectId).title;
    const author = get(projects).find(e => e.id == this.projectId).author;

    const frontpage = `书名：${title}\n作者：${author}`;

    const contents = get(chapters)
      .filter(e => e.project == this.projectId)
      .sort(this.compare)
      .map(chapterMapper)
      .join("");

    const document = frontpage + contents;
    return {
      document: document,
    };
  }

  compare(a, b) {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  }
}
