import ThirdParty from "./ThirdParty.svelte";

export default {
  title: "xiaoMiquanWrite/Shared/ThirdParty",
  component: ThirdParty,
};

const Template = ({ ...args }) => ({
  Component: ThirdParty,
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
