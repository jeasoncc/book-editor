import moment from "moment";
import { getRandomNumber } from "src/tools/getRandomNumber";
import { SceneInterface } from "./scene.interface";
import { OutputData } from "@editorjs/editorjs";

export const defaltConent = {
  time: 0,
  version: "2.22.2",
  blocks: [
    {
      id: "mV8xlymh4u",
      type: "paragraph",
      data: {
        text: "你刚刚创建了一个新的章节，让我们来为故事添上新的一笔！",
      },
    },
  ],
};

export class SceneClass implements SceneInterface {
  id: string;
  chapter: string;
  project: string;
  title: string;
  order: number;
  lastEdit: string;
  content: OutputData;
  createDate?: string;
  showEdit: boolean;
  constructor(
    chapter: string = "",
    project: string = "",
    title: string = "",
    content: OutputData = defaltConent
  ) {
    (this.id = getRandomNumber()), (this.chapter = chapter);
    this.project = project;
    this.title = title;
    this.order = 0;
    this.lastEdit = moment().format("YYYY-MM-DD-HH:mm:ss");
    this.content = content;
    this.createDate = moment().format("YYYY-MM-DD-HH:mm:ss");
    this.showEdit = false;
  }
}
