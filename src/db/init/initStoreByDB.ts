/**
 * @description 此文件用来在用户每次打开编辑器的时候，用数据库的数据初始化 svelte store
 */
import localforage from "localforage";
import { projects } from "../storeProjects";
import { state } from "../storeState";
import { roles } from "../storeRoles";
import { cards } from "../storeCards";
import { chapters } from "../storeChapters";
import { intern } from "../storeIntern";
import { scenes } from "../storeScenes";
import { settings } from "../storeSettings";
import { typings } from "../storeTyping";

const setStoreFn = async (title: string, _store) => {
  console.log("准备初始化：" + title);
  const db_stroe = await localforage.getItem(title);
  _store.init(db_stroe);
  return _store.subscribe((val: any) => localforage.setItem(title, val));
};

const setStornSimpleFn = async (title: string, _store) => {
  console.log("准备初始化：" + title);
  const db_stroe = await localforage.getItem(title);
  _store.set(db_stroe);
  return _store.subscribe((val: any) => localforage.setItem(title, val));
};

export const initStoreByDBFn = async () => {
  return Promise.all([
    setStoreFn("state", state),
    setStoreFn("projects", projects),
    setStoreFn("roles", roles),
    setStoreFn("cards", cards),
    setStoreFn("chapters", chapters),
    setStoreFn("intern", intern),
    setStoreFn("scenes", scenes),
    setStoreFn("typings", typings),
    setStornSimpleFn("settings", settings),
  ]);
};
