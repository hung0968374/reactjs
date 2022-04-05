import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RestrictLoginAndRegister() {
  const auth = useSelector((state) => state.auth.userAuthenticated);
  let location = useLocation();
  if (auth) {
    return <Navigate to="/quiz" state={{ from: location }} />;
  }

  return <Outlet />;
}
