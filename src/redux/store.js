import { configureStore } from "@reduxjs/toolkit";
import reducer from "./slice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";
const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: reducer,
  middleware: [sagaMiddleware],
  devTools: process.env.NODE_ENV !== "production"
});

sagaMiddleware.run(rootSaga);