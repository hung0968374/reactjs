import { takeEvery, call, put } from "redux-saga/effects";
import { api_login } from "../../api";
import {
  setUserInfo,
  onLoggingIn,
  onFailure,
} from "../features/authen/authenSlice";
import { Modal } from "antd";

import "antd/dist/antd.css";

export function* fetchUser(action) {
  const user = {
    username: action.payload.username,
    password: action.payload.password,
  };
  try {
    const userResponse = yield call(api_login, user);
    yield put(setUserInfo(userResponse.data));
  } catch (error) {
    yield put(onFailure());
    Modal.error({
      title: "Login failed",
      content: error.response.data.message,
    });
  }
}

export default function* loginSaga() {
  yield takeEvery(onLoggingIn().type, fetchUser);
  console.log("login saga");
}
