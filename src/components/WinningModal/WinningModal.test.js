import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import WinningModal from "./WinningModal";

describe("WinningModal component tests", () => {
  test("should render winning modal component", () => {
    render(
      <Provider store={store}>
        <WinningModal />
      </Provider>
    );
    expect(screen.getByTestId("confetti")).toBeInTheDocument();
  });
});
