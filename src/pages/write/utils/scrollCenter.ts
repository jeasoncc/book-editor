import EditorJS from "@editorjs/editorjs";

export const scrollCenterFn = (editor: EditorJS) => {
  try {
    const curentIndex = editor.blocks.getCurrentBlockIndex();
    const currentBlockElement =
      document.querySelectorAll(".cdx-block")[curentIndex];
    if (currentBlockElement) {
      currentBlockElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
