import EditorJS from "@editorjs/editorjs";
import { position } from "caret-pos";
import _ from "lodash";
export const autoSymbol = [
  {
    key: "《",
    valeu: "《》",
  },
  {
    key: "「",
    valeu: "「」",
  },
  {
    key: "」",
    valeu: "「」",
  },
  {
    key: "“",
    valeu: "“”",
  },
  {
    key: "”",
    valeu: "“”",
  },
  {
    key: "【",
    valeu: "【】",
  },
  {
    key: "（",
    valeu: "（）",
  },
];

export const autoSymbolFn = (e, editor: EditorJS) => {
  if (e.data) {
    const caret = window.getSelection().anchorOffset;
    const beforeInnherHtml = e.target.innerHTML;
    const beforeInnherHtmlArray = _.split(beforeInnherHtml, "");
    autoSymbol.map(cur => {
      if (e.data && e.data == cur.key) {
        const afterInnherHtmlArray = beforeInnherHtmlArray.map((str, index) => {
          if (index === caret - 1) str = cur.valeu;
          return str;
        });
        const afterInnherHtml = _.join(afterInnherHtmlArray, "");
        e.target.innerHTML = afterInnherHtml;
        position(e.target, caret);
      }
    });
  }
};
