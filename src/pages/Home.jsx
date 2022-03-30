import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleStatus } from "../redux/features/authen/authenSlice";
import { incrementByAmount } from "../redux/features/counter/counterSlice";

export default function Home() {
  const dispatch = useDispatch();

  const count = useSelector((state) => state.counter.value);
  const auth = useSelector((state) => state.auth2.value);
  console.log("auth", auth);

  const increaseCount = () => {
    dispatch(incrementByAmount(5));
  };

  const changeValueOfAuth = () => {
    dispatch(toggleStatus());
  };

  return (
    <div>
      <h1>Home - count: {count}</h1>
      <h2
        style={{ cursor: "pointer", userSelect: "none" }}
        onClick={increaseCount}
      >
        Click to increase count
      </h2>
      <h3
        style={{ cursor: "pointer", userSelect: "none" }}
        onClick={changeValueOfAuth}
      >
        Current value of auth is {auth ? "true" : "false"}
      </h3>
    </div>
  );
}
