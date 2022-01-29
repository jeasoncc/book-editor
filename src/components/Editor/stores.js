import deepClone from "deep-clone";
import { writable, get } from "svelte/store";
import { setFocus } from "./helpers";

export const defaultData = {
  blocks: [
    {
      type: "paragraph",
      data: {
        text: "",
      },
    },
  ],
};
export const i18n = writable({
  placeholder: "Let's write an awesome story!",
  switch: "Change Block",
  delete: "Delete",
  confirmDelete: "Are you sure?",
  blocks: {
    paragraph: "Paragraph",
    heading: "Heading",
    quote: "Quote",
    code: "Monospace",
  },
});
export const hasFocus = writable(false);
export const isActive = writable(true);
export const spellCheck = writable(false);
const contentStore = () => {
  const { subscribe, update, set } = writable(deepClone(defaultData));
  return {
    subscribe,
    set,
    setBlock: (index, text) => {
      update(n => {
        n.blocks[+index].data.text = text;
        return n;
      });
    },
    addBlock: (index, type, text) => {
      const n = get(content);
      n.blocks.splice(+index, 0, {
        type: type,
        data: {
          text: text,
        },
      });
      set(n);
      setFocus(index);
    },
    removeBlock: (index, force, confirmDelete) => {
      // alert(212)
      const n = get(content);
      if (force || !n.blocks[index].data.text || confirmDelete) {
        n.blocks.splice(index, 1);
      }
      set(n);
    },
    mergeBlock: (index, old) => {
      const n = get(content);
      n.blocks[index].data.text += n.blocks[old].data.text;
      n.blocks.splice(old, 1);
      set(n);
    },
    switchBlock: (index, type) => {
      console.log({ index, type });
      update(n => {
        n.blocks[+index].type = type;
        return n;
      });
    },
  };
};
export const content = contentStore();

export const historyStore = () => {
  const defaultHistory = {
    active: true,
    current: 0,
    data: [],
  };
  const { subscribe, update, set } = writable(deepClone(defaultHistory));
  return {
    subscribe,
    set,
    add: () =>
      update(n => {
        n.data.unshift(deepClone(get(content)));
        n.current = 0;
        n.active = true;
        if (n.data.length > 10) {
          n.data.pop();
        }
        return n;
      }),
    undo: () =>
      update(n => {
        if (n.current >= n.data.length - 1) return n;
        n.active = false;
        content.set(n.data[++n.current]);
        return n;
      }),
    redo: () =>
      update(n => {
        if (n.current < 1) return n;
        n.active = false;
        content.set(n.data[--n.current]);
        return n;
      }),
    reset: () => set(deepClone(defaultHistory)),
  };
};
