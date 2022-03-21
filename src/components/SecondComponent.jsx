import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export default function SecondComponent() {
  const countContext = useContext(GlobalContext);
  return (
    <div>
      <strong>SecondComponent - {countContext.count2.firstCount} </strong>
      <button
        onClick={() => countContext.dispatchCount2({ type: "INC", value: 5 })}
      >
        dispatch inc count2 by 5
      </button>
      <button
        onClick={() => countContext.dispatchCount2({ type: "DEC", value: 5 })}
      >
        dispatch des count2 by 5
      </button>
    </div>
  );
}
