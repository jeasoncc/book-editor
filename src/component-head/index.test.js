import { render } from "@testing-library/svelte";
import ComponentHead from "./ComponentHead.svelte";

test("renders ComponentHead component", () => {
  const { getByText } = render(ComponentHead);
  const heading = getByText(/ComponentHead 组件/i);
  expect(heading).toBeInTheDocument();
});
