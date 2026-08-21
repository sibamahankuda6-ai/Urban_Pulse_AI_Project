import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  role,
}) {

  const isLoggedIn =
    localStorage.getItem(
      "isLoggedIn"
    );

  const userRole =
    localStorage.getItem(
      "role"
    );

  if (!isLoggedIn) {

    return (
      <Navigate to="/login" />
    );

  }

  if (
    role &&
    userRole !== role
  ) {

    return (
      <Navigate to="/" />
    );

  }

  return children;
}

export default ProtectedRoute;