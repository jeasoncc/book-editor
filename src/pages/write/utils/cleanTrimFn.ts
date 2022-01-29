import { OutputData } from "@editorjs/editorjs";

export const cleanTrimFn = (outputdata: OutputData) => {
  outputdata.blocks = outputdata.blocks.map(cur => {
    if (cur.type === "paragraph") {
      cur.data.text = cur.data.text.replace(/\s/g, "").replace(/&nbsp;/gi, "");
      // cur.data.text = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + cur.data.text;
    }
    return cur;
  });
  return outputdata;
};
