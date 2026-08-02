import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png.jpeg";

function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  const role =
    localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");

    alert("Logged Out Successfully");

    navigate("/login");

    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        {/* Logo */}

        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
        >
          <img
            src={Logo}
            alt="Urban Pulse AI"
            style={{
              width: "60px",
              height: "60px",
              objectFit: "contain",
            }}
            className="me-2"
          />

          <span>
            Urban Pulse AI
          </span>
        </Link>

        {/* Navbar Links */}

        <div className="navbar-nav ms-auto">

          {/* User & Guest */}

          {(!isLoggedIn ||
            role === "user") && (
            <>
              <Link
                className="nav-link"
                to="/"
              >
                Home
              </Link>

              <Link
                className="nav-link"
                to="/about"
              >
                About
              </Link>

              <Link
                className="nav-link"
                to="/contact"
              >
                Contact
              </Link>
            </>
          )}

          {/* Logged In Users */}

          {isLoggedIn && (
            <>

              <Link
                className="nav-link"
                to="/notifications"
              >
                🔔 Notifications
              </Link>

              <Link
                className="nav-link"
                to="/profile"
              >
                Profile
              </Link>

              {/* User */}

              {role === "user" && (
                <>
                  <Link
                    className="nav-link"
                    to="/report"
                  >
                    Report Issue
                  </Link>

                  <Link
                    className="nav-link"
                    to="/issues"
                  >
                    Issues
                  </Link>
                </>
              )}

              {/* Admin */}

              {role === "admin" && (
  <>
    <Link
      className="nav-link"
      to="/issues"
    >
      Issues
    </Link>

    <Link
      className="nav-link"
      to="/dashboard"
    >
      Dashboard
    </Link>

    <Link
      className="nav-link"
      to="/workers"
    >
      Workers
    </Link>

    <Link
      className="nav-link"
      to="/departments"
    >
      Departments
    </Link>

    <Link
      className="nav-link"
      to="/reports"
    >
      Reports
    </Link>
  </>
)}

              {/* Worker */}

              {role === "worker" && (
                <>
                  <Link
                    className="nav-link"
                    to="/worker-dashboard"
                  >
                    Worker Dashboard
                  </Link>
                </>
              )}

              {/* Role Badge */}

              <span className="nav-link">
                <span
                  className={`badge ${
                    role === "admin"
                      ? "bg-danger"
                      : role === "worker"
                      ? "bg-warning text-dark"
                      : "bg-success"
                  }`}
                >
                  {role?.toUpperCase()}
                </span>
              </span>

              {/* Logout */}

              <button
                className="btn btn-danger btn-sm ms-2"
                onClick={handleLogout}
              >
                Logout
              </button>

            </>
          )}

          {/* Guest */}

          {!isLoggedIn && (
            <Link
              className="btn btn-success btn-sm ms-2"
              to="/login"
            >
              Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;