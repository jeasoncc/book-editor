import { render } from "@testing-library/svelte";
import ComponentSide from "./ComponentSide.svelte";

test("renders ComponentSide component", () => {
  const { getByText } = render(ComponentSide);
  const heading = getByText(/ComponentSide 组件/i);
  expect(heading).toBeInTheDocument();
});
