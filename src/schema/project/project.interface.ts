export interface ProjectInterface {
  id: string;
  title: string;
  author: string;
  description: string;
  publisher: string;
  language: string;
  lastOpen: string;
  createDate: string;
}
export interface ProjectsInterface {
  [x: number]: ProjectInterface;
}
