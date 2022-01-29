import EditorJS from "@editorjs/editorjs";
import Marker from "@editorjs/marker";
import AlignmentTuneTool from "editorjs-text-alignment-blocktune";
import Paragraph from "@editorjs/paragraph";
import CodeTool from "@itech-indrustries/editorjs-callout";
import Alert from "editorjs-alert";
import BreakLine from "editorjs-break-line";
import ColorPlugin from "editorjs-text-color-plugin";
import Undo from "editorjs-undo";
import DragDrop from "editorjs-drag-drop";
import Tooltip from "editorjs-tooltip";
import Header from "@editorjs/header";
import Delimiter from "@editorjs/delimiter";
export const editorjsInitFn = function (fn) {
  const editor = new EditorJS({
    /**
     * Id of Element that should contain the Editor
     */
    holderId: "editorjs",
    placeholder: "让我们开始一个伟大的故事吧！",
    onReady: () => {
      new Undo({ editor });
      new DragDrop(editor);
      console.log("Editor.js is ready to work2!");
    },
    tools: {
      Marker: {
        class: Marker,
        shortcut: "CMD+SHIFT+M",
      },

      header: {
        class: Header,
        inlineToolbar: true,
        tunes: ["anyTuneName"],
      },
      code: {
        class: CodeTool,
      },
      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        tunes: ["anyTuneName"],
      },
      anyTuneName: {
        class: AlignmentTuneTool,
        config: {
          default: "left",
          blocks: {
            header: "center",
            list: "left",
          },
        },
      },
      delimiter: {
        class: Delimiter,
      },
      breakLine: {
        class: BreakLine,
        inlineToolbar: true,
        shortcut: "CMD+SHIFT+ENTER",
      },
      alert: {
        class: Alert,
        inlineToolbar: true,
        shortcut: "CMD+SHIFT+A",
        config: {
          defaultType: "primary",
          messagePlaceholder: "Enter something",
        },
      },

      Color: {
        class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
        config: {
          colorCollections: [
            "#FF1300",
            "#EC7878",
            "#9C27B0",
            "#673AB7",
            "#3F51B5",
            "#0070FF",
            "#03A9F4",
            "#00BCD4",
            "#4CAF50",
            "#8BC34A",
            "#CDDC39",
            "#FFF",
          ],
          defaultColor: "#FF1300",
          type: "text",
        },
      },
      tooltip: {
        class: Tooltip,
        config: {
          location: "bottom",
          highlightColor: "#FFEFD5",
          underline: true,
          backgroundColor: "#154360",
          textColor: "#FDFEFE",
        },
      },
    },
    onChange: (api, event) => {
      fn();
    },
  });
  return editor;
};
