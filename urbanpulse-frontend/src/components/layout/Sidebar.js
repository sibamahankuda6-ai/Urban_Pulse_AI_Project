import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const role = localStorage.getItem("role");

  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <h4 className="mb-4">
        Urban Pulse AI
      </h4>

      <ul className="nav flex-column">

        <li className="nav-item">
          <Link
            className="nav-link text-white"
            to="/"
          >
            🏠 Home
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link text-white"
            to="/profile"
          >
            👤 Profile
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link text-white"
            to="/issues"
          >
            📋 Issues
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link text-white"
            to="/notifications"
          >
            🔔 Notifications
          </Link>
        </li>

        {role === "admin" && (
          <li className="nav-item">
            <Link
              className="nav-link text-white"
              to="/dashboard"
            >
              📊 Dashboard
            </Link>
          </li>
        )}

        {role === "worker" && (
          <li className="nav-item">
            <Link
              className="nav-link text-white"
              to="/worker-dashboard"
            >
              👷 Worker Dashboard
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;