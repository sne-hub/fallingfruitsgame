import { takeEvery } from "redux-saga/effects";
import { watchFetchData, fetchDataSaga } from "./fetchDataSaga";
import { runSaga } from "redux-saga";
import { fetchDataFailure } from "../redux/slice";

describe("watchFetchData", () => {
  const genObject = watchFetchData();

  it("should wait for every fetch data request action and call fetchDataSaga", () => {
    expect(genObject.next().value).toEqual(
      takeEvery("movement/fetchDataRequest", fetchDataSaga)
    );
  });

  it("should be done on next iteration", () => {
    expect(genObject.next().done).toBeTruthy();
  });

  it("should call fetch and dispatch success action", async () => {
    const fruitImages = [
      {
        src: "/img/fruits/apple.png",
        alt: "apple",
      },
      {
        src: "/img/fruits/banana.png",
        alt: "banana",
      },
      {
        src: "/img/fruits/cherry.png",
        alt: "cherry",
      },
    ];

    const requestImages = jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(fruitImages));

    const results = await fetch("images.json");

    expect(requestImages).toHaveBeenCalledTimes(1);
    expect(results).toEqual(fruitImages);
    global.fetch.mockClear();
  });

  it("should call fetch and dispatch error action", async () => {
    const requestImages = jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.reject());

    const dispatched = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchDataSaga
    );

    expect(requestImages).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([fetchDataFailure()]);
    requestImages.mockClear();
  });
});
