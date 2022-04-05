import { takeEvery } from "redux-saga/effects";

export function* log(action) {
  //   console.log("action", action);
}

export default function* logSaga() {
  yield takeEvery("*", log);
}
