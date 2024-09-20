import { render } from "@testing-library/svelte";
import LayoutBook from "./LayoutBook.svelte";

test("renders LayoutBook component", () => {
  const { getByText } = render(LayoutBook);
  const heading = getByText(/LayoutBook 组件/i);
  expect(heading).toBeInTheDocument();
});
