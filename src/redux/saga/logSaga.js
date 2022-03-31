import { takeEvery } from "redux-saga/effects";

export function* log(action) {
  //   console.log("action", action);
}

export default function* logSaga() {
  console.log("log saga");
  yield takeEvery("*", log);
}
