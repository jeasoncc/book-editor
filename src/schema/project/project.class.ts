import moment from "moment";
import { getRandomNumber } from "src/tools/getRandomNumber";
import { ProjectInterface } from "./project.interface";

export class ProjectClass implements ProjectInterface {
  id: string;
  title: string;
  author: string;
  description: string;
  publisher: string;
  language: string;
  lastOpen: string;
  createDate: string;
  constructor(
    id: string = getRandomNumber(),
    title: string = "",
    author: string = "",
    description: string = "",
    publisher: string = "",
    language: string = "zh",
    lastOpen: string = "",
    createDate: string = moment().format("YYYY-MM-DD-HH:mm:ss")
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.description = description;
    this.publisher = publisher;
    this.language = language;
    this.lastOpen = lastOpen;
    this.createDate = createDate;
  }
}
