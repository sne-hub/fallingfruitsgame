import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import Hero from "./Hero";

describe("Hero component tests", () => {
  test("should render hero component successfully", () => {
    render(
      <Provider store={store}>
        <Hero />
      </Provider>
    );
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
