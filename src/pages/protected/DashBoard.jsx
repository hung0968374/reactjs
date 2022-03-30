import React from "react";

export default function DashBoard() {
  const userToken = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).auth
  ).otherInfos.tokens.access.token;
  console.log("userToken", userToken);
  return (
    <div>
      <h1>DashBoard</h1>
    </div>
  );
}
