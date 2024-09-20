import { render } from "@testing-library/svelte";
import Page404 from "./Page404.svelte";

test("renders Page404 component", () => {
  const { getByText } = render(Page404);
  const heading = getByText(/Page404 组件/i);
  expect(heading).toBeInTheDocument();
});
