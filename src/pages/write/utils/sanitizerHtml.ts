import { OutputData } from "@editorjs/editorjs";
import EditorJS from "@editorjs/editorjs";
export const sanitizerHtml = (outputdata: OutputData, editor: EditorJS) => {
  const sanitizerConfig = {
    p: true, // leave <p> as is
    // a: false,
    a: {
      href: false, // leave <a> with href
      target: "_blank", // add 'target="_blank"'
    },
    name: false,
    replace: false,
    // p: function(el) {
    //   console.log(el)
    //   return false
    // }
  };
  outputdata.blocks = outputdata.blocks.map(cur => {
    if (cur.type === "paragraph") {
      const cleanString = editor.sanitizer.clean(
        cur.data.text,
        sanitizerConfig
      );
      cur.data.text = cleanString;
    }
    return cur;
  });
  return outputdata;
};
