import { ChapterInterface } from "./chapter.Interface";

export class Chapter implements ChapterInterface {
  id: string;
  project: string;
  title: string;
  order: number;
  open: boolean;
  showEdit: boolean;

  constructor(
    id: string,
    project: string,
    title: string,
    order: number,
    open: boolean,
  ) {
    this.id = id;
    this.project = project;
    this.title = title;
    this.order = order;
    this.open = open;
    this.showEdit = false

  }
}
