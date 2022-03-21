import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import authenReducer from "./features/authen/authenSlice";

export default configureStore({
  reducer: { counter: counterReducer, auth2: authenReducer },
});
