import { SceneInterface } from "src/schema/scene/scene.interface";

export function countWordsFn(currentScene: SceneInterface) {
  if (!currentScene || !currentScene.content) {
    return 0;
  }
  return currentScene.content.blocks.reduce((prev, cur) => {
    if (cur.type === "paragraph") {
      return prev + cur.data.text.length;
    }
    return prev;
  }, 0);
}

export function countTypingWordsFn() {
  return 0;
}
