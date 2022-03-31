import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";

import counterReducer from "./features/counter/counterSlice";
import authenReducer from "./features/authen/authenSlice";
import mySaga from "./saga/rootSaga";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  counter: counterReducer,
  auth: authenReducer,
});
const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(mySaga);

export const persistor = persistStore(store);

export default store;
