import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "../src/redux/store";

describe("App tests", () => {
  test("should render game board component successfully", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByTestId("game-board-id")).toBeInTheDocument();
  });
});
