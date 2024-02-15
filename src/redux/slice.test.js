import reducer, {
  initialState,
  moveLeft,
  moveRight,
  setAllergyFruit,
  decreaseLives,
  increaseScore,
  setGameOver,
  resetGame,
  fetchDataSuccess,
  fetchDataFailure,
  setEatenFruit,
  fetchDataRequest,
  stopTimer,
  addToDropFruitIntervals,
} from "./slice";
import data from "../../public/images.json";

describe("slice tests", () => {
  test("should return initial state", () => {
    expect(reducer(undefined, { type: undefined })).toStrictEqual({
      ...initialState,
    });
  });

  test("should handle fetchDataSuccess and add data to fruits array", () => {
    const updatedState = reducer(initialState, fetchDataSuccess(data));
    expect(updatedState.fruits).toBe(data);
    expect(updatedState.loading).toStrictEqual(false);
    expect(updatedState.error).toStrictEqual(null);
  });

  test("should handle fetchDataFailure", () => {
    const error = "failed to fetch";
    const updatedState = reducer(initialState, fetchDataFailure(error));
    expect(updatedState.fruits).toStrictEqual([]);
    expect(updatedState.loading).toStrictEqual(false);
    expect(updatedState.error).toStrictEqual(error);
  });

  test("should handle setAllergyFruit", () => {
    const updatedState = reducer(initialState, setAllergyFruit(data));
    expect(updatedState.allergyFruit).toStrictEqual(
      expect.objectContaining({
        src: expect.any(String),
        alt: expect.any(String),
      })
    );
  });

  test("should handle setEatenFruit", () => {
    const updatedState = reducer(initialState, setEatenFruit(data[0]));
    expect(updatedState.eatenFruit).toStrictEqual(data[0]);
  });

  test("should handle setGameOver and decreaseLives", () => {
    let updatedState = reducer(initialState, setAllergyFruit(data));
    updatedState = reducer(
      updatedState,
      setEatenFruit(updatedState.allergyFruit)
    );

    updatedState = reducer(updatedState, decreaseLives());
    expect(updatedState.lives).toStrictEqual(2);

    updatedState = reducer(updatedState, decreaseLives());
    expect(updatedState.lives).toStrictEqual(1);

    updatedState = reducer(updatedState, decreaseLives());

    updatedState = reducer(updatedState, setGameOver());
    expect(updatedState.isPlaying).toStrictEqual(false);
    expect(updatedState.lives).toStrictEqual(0);
    expect(updatedState.gameOver).toStrictEqual(true);
  });

  test("should handle resetGame", () => {
    const updatedState = reducer(initialState, resetGame());
    expect(updatedState.isPlaying).toStrictEqual(true);
  });

  test("should handle increaseScore and stopTimer", () => {
    const dataWithoutEatenFruit = data.slice(1);
    let updatedState = reducer(
      initialState,
      setAllergyFruit(dataWithoutEatenFruit)
    );
    updatedState = reducer(updatedState, setEatenFruit(data[0]));
    updatedState = reducer(updatedState, increaseScore());
    expect(updatedState.score).toStrictEqual(1);
    
    updatedState = reducer(updatedState, stopTimer());
    expect(updatedState.gameWon).toStrictEqual(true);
  });

  test("should handle moveLeft and moveRight", () => {
    let updatedState = reducer(initialState, moveRight());
    expect(updatedState.position).toStrictEqual(10);

    updatedState = reducer(updatedState, moveLeft());
    expect(updatedState.position).toStrictEqual(0);
  });

  test("should handle fetchDataRequest", () => {
    const updatedState = reducer(initialState, fetchDataRequest("path"));
    expect(updatedState.loading).toStrictEqual(true);
    expect(updatedState.error).toStrictEqual(null);
  });
  test("should handle addToDropFruitIntervals", () => {
    const updatedState = reducer(initialState, addToDropFruitIntervals(20));
    expect(updatedState.dropFruitIntervals).toStrictEqual([20]);
  });
});
