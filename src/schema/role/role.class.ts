import RoleInterface from "./role.interface";
import { getRandomNumber } from "../../tools/getRandomNumber";
import moment from "moment";

export class RoleClass implements RoleInterface {
  id?: string;
  project: string;
  name: string;
  alias: string[];
  identity: string[];
  relationships: string[];
  basicSettings: string;
  image: string[];
  experience: string;
  showTip: boolean;
  createDate: string;

  constructor(
    name = "",
    project = "",
    alias = [],
    identity = [],
    relationships = [],
    basicSettings = "",
    image = [],
    experience = "",
    showTip = true,
    createDate: string = moment().format("YYYY-MM-DD-HH:mm:ss")
  ) {
    this.id = getRandomNumber();
    this.project = project;
    this.name = name;
    this.alias = alias;
    this.identity = identity;
    this.relationships = relationships;
    this.basicSettings = basicSettings;
    this.image = image;
    this.experience = experience;
    this.showTip = showTip;
    this.createDate = createDate;
  }
}
