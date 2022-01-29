import { withSlots, fromText } from "../../stories/decorators/svelte-slots";
import CardBook from "./CardBook.svelte";

export default {
  title: "xiaoMiquanWrite/Components/Grid/CardBook",
  component: CardBook,
  argTypes: {
    action: { control: "boolean" },
    onClick: { action: "onClick" },
  },
  decorators: [
    withSlots({
      default: fromText("Content"),
    }),
  ],
};

const Template = ({ onClick, ...args }) => ({
  Component: CardBook,
  props: args,
  on: {
    click: onClick,
  },
});

export const Default = Template.bind({});
Default.args = {
  title: "Title",
};

export const Action = Template.bind({});
Action.args = {
  title: "Title",
  action: true,
};
