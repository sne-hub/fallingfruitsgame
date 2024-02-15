import { all } from "redux-saga/effects";
import { watchFetchData } from "./fetchDataSaga";

function* rootSaga() {
  yield all([watchFetchData()]);
}

export default rootSaga;
