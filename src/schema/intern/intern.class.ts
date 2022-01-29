import { InternInterface } from "./intern.interface";
export class InternClass implements InternInterface {
  version: string;
  installed: boolean;
  constructor(version: string = "", installed: boolean = false) {
    this.version = version;
    this.installed = installed;
  }
}
