// import shortcutJson from "./shortcut.json";
import Shortcut from "@codexteam/shortcuts";

export const searchShortCutFn = fn => {
  return new Shortcut({
    name: "CMD+F",
    on: document.body,
    callback: fn,
  });
};

export const saveChapterShortCutFn = fn => {
  return new Shortcut({
    name: "CMD+S",
    on: document.body,
    callback: fn,
  });
};

export const creatNewChapterShortCutFn = fn => {
  return new Shortcut({
    name: "CMD+N",
    on: document.body,
    callback: fn,
  });
};

// export const quotationShortCutFn = fn => {
//   return new Shortcut({
//     name: "",
//     on: document.body,
//     callback: fn,
//   });
// };
