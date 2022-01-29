import moment from "moment";
import { TypingInterface } from "src/schema/typing/typing.interface";
import { get } from "svelte/store";
import { typings } from "../storeTyping";
import { TypingClass } from "../../schema/typing/typing.class";
import { state } from "../storeState";

const everyDayFirstTimeInitFn = () => {
  console.log("今天还没有任何打字记录");
  console.log(get(typings));
  const typing = new TypingClass(get(state).currentProject);
  typings.createTyping(typing);
  state.setCurrentTyping(typing.id);
  return {
    initSuccess: false,
    create: true,
  };
};
const everyDayOtherTimeinitFn = () => {
  console.log("今日已经初始化");
  const typing = get(typings).find(
    (cur: TypingInterface) =>
      cur.date === moment().format("YYYY-MM-DD") &&
      cur.project === get(state).currentProject
  );
  state.setCurrentTyping(typing.id);
  return {
    initSuccess: true,
    create: false,
  };
};
export const setInitTyping = async () => {
  const dbTypings = get(typings).find(
    (cur: TypingInterface) =>
      cur.date === moment().format("YYYY-MM-DD") &&
      cur.project === get(state).currentProject
  );
  if (!dbTypings) {
    return everyDayFirstTimeInitFn();
  }
  return everyDayOtherTimeinitFn();
};
