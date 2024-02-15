import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Canvas from "./Canvas";
import store from "../../redux/store";

describe("Canvas component tests", () => {
  test("should render canvas component successfully", () => {
    render(
      <Provider store={store}>
        <Canvas
          canvasRef={{ current: <div /> }}
          gameOver={false}
          gameWon={false}
          dropFruitIntervals={[]}
        />
      </Provider>
    );
    expect(screen.getByTestId("canvas")).toBeInTheDocument();
  });
});
