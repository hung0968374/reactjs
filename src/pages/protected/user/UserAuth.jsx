import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UserAuth() {
  const role = useSelector((state) => state.auth.otherInfos.user.role);
  let location = useLocation();
  if (!(role === "user")) {
    return <Navigate to="/admin/dashboard" state={{ from: location }} />;
  }
  return <Outlet />;
}
