import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchDataFailure,
  fetchDataSuccess,
  setAllergyFruit,
} from "../redux/slice";

function* fetchDataSaga() {
  try {
    const response = yield call(fetch, "images.json");
    const data = yield response.json();
    yield put(fetchDataSuccess(data));
    yield put(setAllergyFruit(data));
  } catch (error) {
    yield put(fetchDataFailure(error));
  }
}

function* watchFetchData() {
  yield takeEvery("movement/fetchDataRequest", fetchDataSaga);
}

export { fetchDataSaga, watchFetchData };
