import { SettingInterface } from "./setting.interface";
export class SettingClass implements SettingInterface {
  theme: string;
  language: string;
  autosave?: boolean;
  spellCheck?: boolean;
  lastLocation?: boolean;
  fontSize: string;
  constructor(
    theme: string = "white",
    language: string = "en",
    autosave: boolean = true,
    spellCheck: boolean = true,
    lastLocation: boolean = true,
    fontSize: string = "13px"
  ) {
    this.theme = theme;
    this.language = language;
    this.autosave = autosave;
    this.spellCheck = spellCheck;
    this.lastLocation = lastLocation;
    this.fontSize = fontSize;
  }
}
