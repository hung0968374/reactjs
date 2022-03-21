import React, { createContext, useReducer } from "react";
import reducer from "./AppReducer";

export const initialState = {
  firstCount: 0,
  secondCount: 0,
};

export const GlobalContext = createContext();

////////// Provider component
export const GlobalProvider = ({ children }) => {
  const [count, dispatchCount] = useReducer(reducer, initialState);
  const [count2, dispatchCount2] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider
      value={{ count, dispatchCount, count2, dispatchCount2 }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
