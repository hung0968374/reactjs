import { all } from "redux-saga/effects";
import loginSaga from "./loginSaga";
import logSaga from "./logSaga";

function* mySaga() {
  yield all([logSaga(), loginSaga()]);
}

export default mySaga;
