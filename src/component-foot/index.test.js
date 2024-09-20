import { render } from "@testing-library/svelte";
import ComponentFoot from "./ComponentFoot.svelte";

test("renders ComponentFoot component", () => {
  const { getByText } = render(ComponentFoot);
  const heading = getByText(/ComponentFoot 组件/i);
  expect(heading).toBeInTheDocument();
});
