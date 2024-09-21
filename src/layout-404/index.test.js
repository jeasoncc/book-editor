import { render } from "@testing-library/svelte";
import Layout404 from "./Layout404.svelte";

test("renders Layout404 component", () => {
  const { getByText } = render(Layout404);
  const heading = getByText(/Layout404 组件/i);
  expect(heading).toBeInTheDocument();
});
