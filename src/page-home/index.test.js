import { render } from "@testing-library/svelte";
import PageHome from "./PageHome.svelte";

test("renders PageHome component", () => {
  const { getByText } = render(PageHome);
  const heading = getByText(/PageHome 组件/i);
  expect(heading).toBeInTheDocument();
});
