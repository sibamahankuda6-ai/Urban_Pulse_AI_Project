import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const token = localStorage.getItem("token");
  const userRole = (localStorage.getItem("role") || "").toLowerCase();

  // If not authenticated or no token, redirect to login
  if (!isLoggedIn || !token) {
    return <Navigate to="/login" replace />;
  }

  // If role is specified, verify permission
  if (role) {
    const required = role.toLowerCase();
    // Allow either 'worker' or 'department' for worker routes
    const isWorkerMatch =
      required === "worker" && (userRole === "worker" || userRole === "department");

    if (userRole !== required && !isWorkerMatch) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;