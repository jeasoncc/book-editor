import pkg from "../package.json";
import App from "./App.svelte";
import "animate.css";
import "carbon-components-svelte/css/all.css";

import "./css/main.css";
import "hover.css";
import "tippy.js/dist/tippy.css";

const app = new App({
  target: document.body,
  props: {
    version: pkg.version,
  },
});

export default app;
