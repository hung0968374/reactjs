import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminAuth() {
  const role = useSelector((state) => state.auth.otherInfos.user.role);
  let location = useLocation();

  if (!(role === "admin")) {
    return <Navigate to="/quiz" state={{ from: location }} />;
  }
  return (
    <>
      <Outlet />;
    </>
  );
}
