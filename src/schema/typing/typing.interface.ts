import { projects } from "../../db/storeProjects";
export type chaptersType = {
  id: string;
  title: string;
};
export interface TypingInterface {
  id: string;
  project: string;
  date: string;
  typingSpeed: number;
  typingNum: number;
  chapters: chaptersType[];
}
