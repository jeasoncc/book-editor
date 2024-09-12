/**
 * @description 此文件用来在用户第一次打开的时候，初始化数据库
 */
import * as localforage from "localforage";
import { SettingInterface } from "../../schema/setting/setting.interface";
import { StateClass } from "../../schema/state/state.class";
import { SettingClass } from "../../schema/setting/setting.class";

localforage.config({
  name: "book-editor",
  storeName: "book-config", // Should be alphanumeric, with underscores.
  description: "sql-data",
  version: 2.0,
});

var store = localforage.createInstance({
  name: "nameHere"
});

var otherStore = localforage.createInstance({
  name: "otherName"
});

// Setting the key on one of these doesn't affect the other.
store.setItem("key", "value");
otherStore.setItem("key", "value2");
const defaultIntern = {
  version: "1.1.0",
  installed: false,
};
const defaultSettings: SettingInterface = new SettingClass();

export const initDBFn = async () => {
  const intern = await localforage.getItem("intern");
  if (!intern) {
    await Promise.all([
      localforage.setItem("intern", defaultIntern),
      localforage.setItem("settings", defaultSettings),
      localforage.setItem("state", new StateClass()),
      localforage.setItem("projects", []),
      localforage.setItem("chapters", []),
      localforage.setItem("scenes", []),
      localforage.setItem("tabs", []),
      localforage.setItem("cards", []),
      localforage.setItem("roles", []),
      localforage.setItem("typings", []),
    ]);
    console.log("-------------------------------");
    console.log("装载完成");
    console.log(await localforage.getItem("intern"));
    console.log("-------------------------------");
  }
};
