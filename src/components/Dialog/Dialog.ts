import { ToastNotification } from "carbon-components-svelte/src/Notification/index";
export type PropObject = {
  kind:
    | "error"
    | "info"
    | "info-square"
    | "success"
    | "warning"
    | "warning-alt";
  title: string;
  subtitle: string;
  caption: string;
};

export const dialogFn = (successProp: PropObject) => {
  return new ToastNotification({
    target: document.querySelector("#saveTip"),
    props: { ...successProp, timeout: 2000 },
    intro: true,
  });
};
