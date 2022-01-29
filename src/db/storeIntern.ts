import { InternClass } from "src/schema/intern/intern.class";
import { InternInterface } from "../schema/intern/intern.interface";
import { writable } from "svelte/store";

const storeIntern = () => {
  const { subscribe, set } = writable(new InternClass());
  return {
    subscribe,
    init: (state: InternInterface) => {
      set(state);
    },
  };
};

export const intern = storeIntern();
