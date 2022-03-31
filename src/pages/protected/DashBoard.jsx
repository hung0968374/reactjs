import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../redux/features/authen/authenSlice";

export default function DashBoard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(logOut());
    // navigate("/login");
  };
  return (
    <div>
      <h1 onClick={signOut}>DashBoard</h1>
    </div>
  );
}
