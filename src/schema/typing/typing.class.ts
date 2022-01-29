import { chaptersType, TypingInterface } from "./typing.interface";
import { getRandomNumber } from "../../tools/getRandomNumber";
import moment from "moment";

export class TypingClass implements TypingInterface {
  id: string;
  date: string;
  typingSpeed: number;
  typingNum: number;
  chapters: chaptersType[];
  project: string;
  constructor(
    project: string = "",
    date: string = moment().format("YYYY-MM-DD"),
    typingSpeed: number = 0,
    typingNum: number = 0,
    chapters: chaptersType[] = []
  ) {
    this.id = getRandomNumber();
    this.project = project;
    this.date = date;
    this.typingSpeed = typingSpeed;
    this.typingNum = typingNum;
    this.chapters = chapters;
  }
}
