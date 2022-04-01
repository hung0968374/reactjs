import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RequireAuth() {
  const auth = useSelector((state) => state.auth.userAuthenticated);
  let location = useLocation();
  if (auth) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <Outlet />;
}
