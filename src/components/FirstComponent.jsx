import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export default function FirstComponent() {
  const countContext = useContext(GlobalContext);
  console.log("countContext", countContext);
  return (
    <div>
      <strong>FirstComponent - {countContext.count.firstCount} </strong>
      <button
        onClick={() => countContext.dispatchCount({ type: "INC", value: 5 })}
      >
        dispatch inc count1 by 5
      </button>
      <button
        onClick={() => countContext.dispatchCount({ type: "DEC", value: 5 })}
      >
        dispatch des count1 by 5
      </button>
    </div>
  );
}
