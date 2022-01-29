import { SettingClass } from "src/schema/setting/setting.class";
import { writable } from "svelte/store";

export const settings = writable(new SettingClass());
