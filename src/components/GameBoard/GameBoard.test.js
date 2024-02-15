import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import GameBoard from "./GameBoard";
import "canvas";
import {
  setEatenFruit,
  setGameOver,
  decreaseLives,
  increaseScore,
  stopTimer,
  setAllergyFruit,
} from "../../redux/slice";
import dropFruitVariables from "../../utils/dropFruitVariables";

const setUp = () => {
  render(
    <Provider store={store}>
      <GameBoard />
    </Provider>
  );
};

describe("gameBoard component tests", () => {
  beforeEach(() => {
    setUp();
    jest.useFakeTimers();
  });

  test("should display the score", () => {
    expect(screen.getByText(/Score: 0/i)).toBeInTheDocument();
  });

  test("should increase the score if the fruit eaten is not equal to the allergy fruit", () => {
    expect(screen.getByText(/Score: 0/i)).toBeInTheDocument();

    act(() => {
      store.dispatch(
        setAllergyFruit([
          {
            src: "/img/fruits/banana.png",
            alt: "banana",
          },
        ])
      );
      store.dispatch(
        setEatenFruit({ src: "/img/fruits/cherry.png", alt: "cherry" })
      );
      store.dispatch(increaseScore());
    });

    expect(screen.getByText(/Score: 1/i)).toBeInTheDocument();
  });

  test("should not increase the score but decrease number of lives if the fruit eaten is equal to the allergy fruit", () => {
    expect(screen.getByText(/Score: 1/i)).toBeInTheDocument();
    expect(screen.getAllByAltText("lives").length).toBe(3);

    act(() => {
      store.dispatch(
        setAllergyFruit([
          {
            src: "/img/fruits/banana.png",
            alt: "banana",
          },
        ])
      );
      store.dispatch(
        setEatenFruit({
          src: "/img/fruits/banana.png",
          alt: "banana",
        })
      );
      store.dispatch(increaseScore());
      store.dispatch(decreaseLives());
    });

    expect(screen.getByText(/Score: 1/i)).toBeInTheDocument();
    expect(screen.getAllByAltText("lives").length).toBe(2);
  });

  test("should display game over when lives is equal to zero", () => {
    expect(screen.queryByTestId("game-over")).not.toBeInTheDocument();

    act(() => {
      store.dispatch(
        setAllergyFruit([
          {
            src: "/img/fruits/banana.png",
            alt: "banana",
          },
        ])
      );
      store.dispatch(
        setEatenFruit({
          src: "/img/fruits/banana.png",
          alt: "banana",
        })
      );

      store.dispatch(increaseScore());
      store.dispatch(decreaseLives());
      store.dispatch(decreaseLives());
      store.dispatch(decreaseLives());
      store.dispatch(setGameOver());
    });

    expect(screen.getByText(/Score: 1/i)).toBeInTheDocument();
    expect(screen.queryAllByAltText("lives").length).toBe(0);
    expect(screen.getByTestId("game-over")).toBeInTheDocument();
  });

  test("should display winning message when the user wins the game", () => {
    expect(screen.queryByTestId("confetti")).not.toBeInTheDocument();

    act(() => {
      store.dispatch(stopTimer());
    });

    expect(screen.getByTestId("confetti")).toBeInTheDocument();
    expect(screen.getByText(/Congrats! you won/i)).toBeInTheDocument();
  });

  test("should reset the score, the lives, the time and the selected fruit when Start-New-Game button is clicked", () => {
    fireEvent.click(screen.getByText("Start-New-Game"));

    expect(screen.getByText(/Score: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/Time Remaining: 01:00 s/i)).toBeInTheDocument();
    expect(screen.getAllByAltText("lives").length).toBe(3);
    expect(screen.queryByTestId("game-over")).not.toBeInTheDocument();
  });

  test("should call dropFruit function when Start-New-Game button is clicked", () => {
    const dropFruit = jest.fn();
    jest.spyOn(global, "setInterval").mockImplementation(dropFruit);

    fireEvent.click(screen.getByText("Start-New-Game"));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(dropFruit).toHaveBeenCalled();
  });

  test("should decrement time when the game has started", () => {
    expect(screen.getByText(/Time Remaining: 01:00 s/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText("Start-New-Game"));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText(/Time Remaining: 00:59 s/i)).toBeInTheDocument();
  });
});

describe("getChildElementsRects method", () => {
  test("should be called when dropFruitVariables function is called", () => {
    const getClientRectsMock = jest.fn(() => {
      return [
        { top: 0, left: 0, bottom: 100, right: 100, width: 100, height: 100 },
      ];
    });

    const divElement = {
      getClientRects: getClientRectsMock,
    };

    dropFruitVariables(store.getState().fruits, divElement);
    expect(getClientRectsMock).toHaveBeenCalledTimes(2);
  });
});
