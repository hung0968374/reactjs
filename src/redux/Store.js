import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import counterReducer from "./features/counter/counterSlice";
import authenReducer from "./features/authen/authenSlice";

const persistConfig = {
  key: "root",
  storage,
};
const reducer = combineReducers({
  counter: counterReducer,
  auth: authenReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
