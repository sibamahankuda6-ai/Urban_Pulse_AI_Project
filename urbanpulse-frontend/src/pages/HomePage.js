import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

function HomePage() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
  });

  useEffect(() => {
    const issues =
      JSON.parse(localStorage.getItem("issues")) || [];

    setStats({
      total: issues.length,
      pending: issues.filter(
        (i) => i.status === "Pending"
      ).length,
      resolved: issues.filter(
        (i) => i.status === "Resolved"
      ).length,
    });
  }, []);

  return (
    <div className="container mt-5">

      {/* Hero Section */}

      <div
  className="text-center text-white rounded shadow-lg"
  style={{
    background:
      "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "50px",
  }}
>
        
        <h1 className="display-2 fw-bold">
          Urban Pulse AI
        </h1>

        <h4 className="mt-3 text-light">
          Smart City Issue Reporting &
          Resolution System
        </h4>

        <p className="mt-4 fs-5 text-light">
          Report potholes, garbage,
          streetlight failures and track
          issue resolution using AI-powered
          prioritization and smart analytics.
        </p>

        <div className="mt-4">
          <Link
            to="/report"
            className="btn btn-warning btn-lg me-3"
          >
            Report Issue
          </Link>

          <Link
            to="/issues"
            className="btn btn-success btn-lg"
          >
            View Issues
          </Link>
        </div>
      </div>

      {/* Statistics Section */}

      <div className="row text-center mb-5">
        <div className="col-md-3 mb-3">
          <div
  className="card border-0 shadow-lg"
  style={{
    borderRadius: "20px",
    background:
      "linear-gradient(135deg,#3b82f6,#2563eb)",
    color: "white"
  }}
>
            <div className="card-body">
              <h1 className="fw-bold">
  {stats.total}
</h1>
              <h5>Total Issues</h5>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
         <div
  className="card border-0 shadow-lg"
  style={{
    borderRadius: "20px",
    background:
      "linear-gradient(135deg,#f59e0b,#d97706)",
    color: "white"
  }}
>
            <div className="card-body">
              <h2>{stats.pending}</h2>
              <h5>Pending Issues</h5>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div
  className="card border-0 shadow-lg"
  style={{
    borderRadius: "20px",
    background:
      "linear-gradient(135deg,#10b981,#059669)",
    color: "white"
  }}
>
            <div className="card-body">
              <h2>{stats.resolved}</h2>
              <h5>Resolved Issues</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
  <div
    className="card border-0 shadow-lg"
    style={{
      borderRadius: "20px",
      background:
        "linear-gradient(135deg,#8b5cf6,#7c3aed)",
      color: "white"
    }}
  >
    <div className="card-body">
      <h1 className="fw-bold">15</h1>
      <h5>Active Workers</h5>
    </div>
  </div>
</div>
      </div>

      {/* Features */}

      <div className="row mt-5">

        <div className="col-md-3 mb-4">
          <div className="card shadow-lg h-100 text-center feature-card">
            <div className="card-body">
              <h1 className="feature-icon">🤖</h1>
              <h5>AI Priority</h5>
              <p>
                Automatically detects
                issue priority.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow-lg h-100 text-center feature-card">
            <div className="card-body">
              <h1 className="feature-icon">📍</h1>
              <h5>Google Maps</h5>
              <p>
                Open issue locations
                directly in Maps.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow-lg h-100 text-center feature-card">
            <div className="card-body">
              <h1  className="feature-icon">📊</h1>
              <h5>Dashboard</h5>
              <p>
                Visualize issue statistics
                and reports.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow-lg h-100 text-center feature-card">
            <div className="card-body">
              <h1 className="feature-icon">🖼️</h1>
              <h5>Image Upload</h5>
              <p>
                Upload issue images for
                better reporting.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* How It Works */}
      {/* Smart City Services */}

<div className="mt-5 mb-5">

  <div className="text-center mb-4">
    <h2 className="fw-bold">
      Smart City Services
    </h2>

    <p className="text-muted">
      Managing critical urban infrastructure efficiently
    </p>
  </div>

  <div className="row text-center">

    <div className="col-md-3 mb-3">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h1>🚦</h1>
          <h5>Traffic Control</h5>
          <p>
            Monitor and report traffic-related issues.
          </p>
        </div>
      </div>
    </div>

    <div className="col-md-3 mb-3">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h1>💡</h1>
          <h5>Street Lights</h5>
          <p>
            Track damaged and non-working street lights.
          </p>
        </div>
      </div>
    </div>

    <div className="col-md-3 mb-3">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h1>🚰</h1>
          <h5>Water Supply</h5>
          <p>
            Report leakage and water supply problems.
          </p>
        </div>
      </div>
    </div>

    <div className="col-md-3 mb-3">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h1>🗑️</h1>
          <h5>Waste Management</h5>
          <p>
            Ensure clean and healthy surroundings.
          </p>
        </div>
      </div>
    </div>

  </div>

</div>

      <div className="card shadow mt-5">
        <div className="card shadow-lg h-100 text-center feature-card">
          <h3>How It Works</h3>

          <div className="row mt-4">
            <div className="col-md-3">
              <h1 className="feature-icon">📝</h1>
              <h5>Report Issue</h5>
            </div>

            <div className="col-md-3">
              <h1>🤖</h1>
              <h5>AI Priority</h5>
            </div>

            <div className="col-md-3">
              <h1>👷</h1>
              <h5>Worker Action</h5>
            </div>

            <div className="col-md-3">
              <h1>✅</h1>
              <h5>Issue Resolved</h5>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      {/* Citizen Feedback */}

<div className="mt-5">

  <div className="text-center mb-4">
    <h2 className="fw-bold">
      Citizen Feedback
    </h2>

    <p className="text-muted">
      What citizens say about Urban Pulse AI
    </p>
  </div>

  <div className="row">

    <div className="col-md-4 mb-3">
      <div className="card shadow h-100">
        <div className="card-body">
          <h5>⭐⭐⭐⭐⭐</h5>

          <p>
            Road damage near my area was fixed
            within 24 hours after reporting.
          </p>

          <strong>- Rahul Sharma</strong>
        </div>
      </div>
    </div>

    <div className="col-md-4 mb-3">
      <div className="card shadow h-100">
        <div className="card-body">
          <h5>⭐⭐⭐⭐⭐</h5>

          <p>
            Very easy reporting process and
            real-time updates helped a lot.
          </p>

          <strong>- Priya Dash</strong>
        </div>
      </div>
    </div>

    <div className="col-md-4 mb-3">
      <div className="card shadow h-100">
        <div className="card-body">
          <h5>⭐⭐⭐⭐⭐</h5>

          <p>
            Excellent platform for improving
            city services and cleanliness.
          </p>

          <strong>- Amit Kumar</strong>
        </div>
      </div>
    </div>

  </div>

</div>

      <div className="card shadow mt-5">
        <div className="card-body p-4">
          <h3>About Urban Pulse AI</h3>

          <p className="mt-3">
            Urban Pulse AI is a smart city
            management platform that helps
            citizens report urban issues
            quickly and efficiently.
          </p>

          <p>
            The system uses AI-based
            prioritization, location tracking,
            image uploads, analytics dashboards,
            notifications, worker management,
            and reporting tools to improve
            city services.
          </p>
        </div>
      </div>

      {/* Call To Action */}
      {/* Impact Statistics */}

<div
  className="bg-dark text-white p-5 rounded mt-5 mb-5"
>
  <div className="row text-center">

    <div className="col-md-3">
      <h2 className="fw-bold">500+</h2>
      <p>Issues Reported</p>
    </div>

    <div className="col-md-3">
      <h2 className="fw-bold">350+</h2>
      <p>Issues Resolved</p>
    </div>

    <div className="col-md-3">
      <h2 className="fw-bold">50+</h2>
      <p>Active Workers</p>
    </div>

    <div className="col-md-3">
      <h2 className="fw-bold">95%</h2>
      <p>Citizen Satisfaction</p>
    </div>

  </div>
</div>

      <div className="text-center mt-5 mb-5">
        <h3>
          Help Improve Your City Today
        </h3>

        <p>
          Report issues and contribute to a
          smarter urban environment.
        </p>

        <Link
          to="/report"
          className="btn btn-primary btn-lg"
        >
          🚀 Report an Issue
        </Link>
      </div>

    </div>
  );
}

export default HomePage;