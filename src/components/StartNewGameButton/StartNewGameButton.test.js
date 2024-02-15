import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import StartNewGameButton from "./StartNewGameButton";
import configureStore from "redux-mock-store";

let startNewGame, handleStartNewGameButtonClick, setSeconds;
const mockStore = configureStore([]);

const setUp = () => {
  render(
    <Provider store={store}>
      <StartNewGameButton
        startNewGame={startNewGame}
        handleStartNewGameButtonClick={handleStartNewGameButtonClick}
        seconds={60}
        gameOver={false}
        gameWon={false}
        setSeconds={setSeconds}
      />
    </Provider>
  );
};

describe("StartNewGameButton component tests", () => {
  beforeEach(() => {
    startNewGame = jest.fn();
    handleStartNewGameButtonClick = jest.fn();
    setSeconds = jest.fn();
    setUp();
  });

  test("should render the Start new game button component successfully", () => {
    expect(screen.getByText("Start-New-Game")).toBeInTheDocument();
  });

  test("should call handleStartNewGameButtonClick function when Start-New-Game button is clicked", () => {
    fireEvent.click(screen.getByText("Start-New-Game"));
    expect(handleStartNewGameButtonClick).toBeCalledTimes(1);
  });

  test("should call the startNewGame function when Start-New-Game button is clicked", () => {
    fireEvent.click(screen.getByText("Start-New-Game"));
    expect(startNewGame).toBeCalledTimes(1);
  });
});

describe("StartNewGameButton component mock", () => {
  it("should call dispatch when Start-New-Game button is clicked", () => {
    const store = mockStore({});
    const dispatchSpy = jest.spyOn(store, "dispatch");
    render(
      <Provider store={store}>
        <StartNewGameButton
          startNewGame={jest.fn()}
          handleStartNewGameButtonClick={jest.fn()}
          setSeconds={jest.fn()}
          seconds={30}
          gameOver={true}
          gameWon={false}
        />
      </Provider>
    );
    fireEvent.click(screen.getByText("Start-New-Game"));

    expect(dispatchSpy).toHaveBeenCalledTimes(2);

    dispatchSpy.mockRestore();
  });
});
