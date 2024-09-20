import { render } from "@testing-library/svelte";
import PageBookOverview from "./PageBookOverview.svelte";

test("renders PageBookOverview component", () => {
  const { getByText } = render(PageBookOverview);
  const heading = getByText(/PageBookOverview 组件/i);
  expect(heading).toBeInTheDocument();
});
