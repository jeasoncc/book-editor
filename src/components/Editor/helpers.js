import Editable from "@livingdocs/editable.js/dist/editable";
import sanitizeHtml from "sanitize-html";
import { content } from "./stores";
import { tick } from "svelte";

let selection;

export const editable = new Editable({
  defaultBehavior: false,
  mouseMoveSelectionChanges: false,
  browserSpellcheck: false,
});

const setCursor = async (cursor, target) => {
  await tick();
  cursor.moveAtTextEnd(target);
  cursor.setVisibleSelection();
};

export const setFocus = async index => {
  await tick();
  const elem = document.querySelector(`[data-index="${index}"]`);
  const cursor = editable.createCursor(elem);
  setCursor(cursor, elem);
};

export const setSpellCheck = bool => {
  editable.config.browserSpellcheck = bool;
};

editable.selection((el, sel) => {
  selection = sel;
});

editable.on("switch", async (elem, direction, cursor) => {
  const index = +elem.dataset.index;

  if (direction === "down") {
    const newElement = document.querySelector(`[data-index="${index + 1}"]`);
    if (newElement) {
      cursor.moveAtBeginning(newElement);
      cursor.setVisibleSelection();
    }
  } else if (direction === "up") {
    const newElement = document.querySelector(`[data-index="${index - 1}"]`);
    if (newElement) {
      cursor.moveAtTextEnd(newElement);
      cursor.setVisibleSelection();
    }
  }
});

editable.on("split", async (elem, before, after, cursor) => {
  if (elem && elem.dataset.type !== "paragraph") return false;
  const reducer = (pre, cur) =>
    `${pre}${cur.outerHTML ? cur.outerHTML : cur.nodeValue}`;
  const old = [...before.childNodes].reduce(reducer, "");
  const add = [...after.childNodes].reduce(reducer, "");
  const index = +elem.dataset.index;
  content.setBlock(index, old);
  content.addBlock(index + 1, "paragraph", add);
  await tick();
  const newElement = document.querySelector(`[data-index="${index + 1}"]`);
  await tick();
  cursor.moveAtBeginning(newElement);
  cursor.setVisibleSelection();
});

editable.on("merge", async (elem, direction, cursor) => {
  if (elem && elem.dataset.type !== "paragraph") return;
  const index = +elem.dataset.index;
  if (direction === "after") {
    const newElement = document.querySelector(`[data-index="${index}"]`);
    const oldElement = document.querySelector(`[data-index="${index + 1}"]`);
    if (!oldElement || oldElement.dataset.type !== "paragraph") return;
    content.mergeBlock(index, index + 1);
    await tick();
    setCursor(cursor, newElement);
  } else if (direction === "before") {
    const newElement = document.querySelector(`[data-index="${index - 1}"]`);
    if (!newElement || newElement.dataset.type !== "paragraph") return;
    content.mergeBlock(index - 1, index);
    await tick();
    setCursor(cursor, newElement);
  }
});

editable.on("insert", async (elem, direction, cursor) => {
  const index = +elem.dataset.index;
  if (direction === "after") {
    content.addBlock(index + 1, "paragraph", "");
    await tick();
    const newElement = document.querySelector(`[data-index="${index + 1}"]`);
    setCursor(cursor, newElement);
  } else if (direction === "before") {
    content.addBlock(index, "paragraph", "");
    await tick();
    const newElement = document.querySelector(`[data-index="${index}"]`);
    setCursor(cursor, newElement);
  }
});

editable.on("paste", async (elem, blocks, cursor) => {
  // console.log({ elem, blocks, cursor });
  // if (!cursor ) cursor = ""
  const index = +elem.dataset.index;
  let targetIndex = cursor.isAtBeginning()
    ? index
    : cursor.isAtTextEnd()
    ? index + 1
    : false;

  const before = cursor.beforeHtml();
  const after = cursor.afterHtml();

  console.log(before);
  console.log(after);
  if (!targetIndex) {
    targetIndex = index + 1;
    await tick();
    content.setBlock(index, before);
    await tick();
    content.addBlock(targetIndex, "paragraph", after);
  }

  blocks.forEach(async (block, i) => {
    await tick();
    content.addBlock(
      targetIndex + i,
      "paragraph",
      sanitizeHtml(block, {
        allowedTags: ["b", "i", "em", "strong", "sub", "sup"],
      })
    );
  });
});

export const format = tag => {
  if (!(selection && selection.isSelection)) return false;
  switch (tag) {
    case "bold":
      selection.toggleBold();
      break;
    case "italic":
      selection.toggleEmphasis();
      break;
    case "underline":
      selection.toggleUnderline();
      break;
    default:
      break;
  }
  selection.triggerChange();
};

export const contenteditable = node => {
  editable.add(node);
};
