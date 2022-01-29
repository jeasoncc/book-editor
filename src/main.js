import { addMessages, init, getLocaleFromNavigator } from "svelte-i18n";
import pkg from "../package.json";

import App from "./App.svelte";
import "animate.css";
import "carbon-components-svelte/css/all.css";
import zh from "./lang/zh.json";
import en from "./lang/en.json";

import "./css/main.css";
import "hover.css";
import "tippy.js/dist/tippy.css";
addMessages("zh", zh);
addMessages("en", en);

init({
  fallbackLocale: "zh",
  initialLocale: getLocaleFromNavigator(),
});

const app = new App({
  target: document.body,
  props: {
    version: pkg.version,
  },
});

export default app;
