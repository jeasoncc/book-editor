import { render, fireEvent } from "@testing-library/svelte";
import Home from "./index.svelte";

test("renders Home component", () => {
  const { getByText } = render(Home);
  const heading = getByText(/Home 组件/i);
  expect(heading).toBeInTheDocument();
});

test("increments count on button click", async () => {
  const { getByText } = render(Home);
  const button = getByText(/点击我/i);
  await fireEvent.click(button);
  expect(getByText(/点击次数: 1/i)).toBeInTheDocument();
});
