import React from "react";

function ProfilePage() {
  const role =
    localStorage.getItem("role") || "guest";

  const issues =
    JSON.parse(localStorage.getItem("issues")) || [];

  const totalIssues = issues.length;

  const pendingIssues =
    issues.filter(
      (i) => i.status === "Pending"
    ).length;

  const inProgressIssues =
    issues.filter(
      (i) => i.status === "In Progress"
    ).length;

  const resolvedIssues =
    issues.filter(
      (i) => i.status === "Resolved"
    ).length;

  const resolutionRate =
    totalIssues > 0
      ? (
          (resolvedIssues /
            totalIssues) *
          100
        ).toFixed(0)
      : 0;

  const feedbacks =
    issues.filter(
      (issue) =>
        issue.feedback?.rating
    );

  const averageRating =
    feedbacks.length > 0
      ? (
          feedbacks.reduce(
            (sum, issue) =>
              sum +
              Number(
                issue.feedback.rating
              ),
            0
          ) / feedbacks.length
        ).toFixed(1)
      : "0";

  return (
    <div className="container mt-4">

      {/* Header */}

      <div
        className="p-4 rounded shadow-lg mb-4 text-white"
        style={{
          background:
            "linear-gradient(135deg,#0f172a,#1e40af,#2563eb)",
        }}
      >
        <h2 className="fw-bold">

          {role === "admin" &&
            "👑 Admin Profile"}

          {role === "worker" &&
            "👷 Worker Profile"}

          {role === "user" &&
            "👤 User Profile"}

        </h2>

        <p className="mb-0">

          {role === "admin" &&
            "Manage and monitor urban operations."}

          {role === "worker" &&
            "Track assigned issues and update progress."}

          {role === "user" &&
            "Monitor your city contributions and feedback."}

        </p>
      </div>

      {/* Profile Card */}

      <div className="card shadow-lg border-0 mb-4">
        <div className="card-body text-center">

          <div
            className="mx-auto mb-3"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "#e0e7ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
            }}
          >
            {
              role === "admin"
                ? "👑"
                : role === "worker"
                ? "👷"
                : "👤"
            }
          </div>

          <h3>

            {role === "admin" &&
              "System Administrator"}

            {role === "worker" &&
              "Field Worker"}

            {role === "user" &&
              "Urban Citizen"}

          </h3>

          <p className="text-muted">

            {role === "admin" &&
              "Managing Urban Operations"}

            {role === "worker" &&
              "Resolving City Issues"}

            {role === "user" &&
              "Contributing To Smart City"}

          </p>

          <span className="badge bg-primary">
            {role.toUpperCase()}
          </span>

        </div>
      </div>

      {/* Statistics */}

      <div className="row">

        <div className="col-md-3 mb-3">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <h2>{totalIssues}</h2>
              <p>Total Issues</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <h2>{pendingIssues}</h2>
              <p>Pending</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <h2>{inProgressIssues}</h2>
              <p>In Progress</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <h2>{resolvedIssues}</h2>
              <p>Resolved</p>
            </div>
          </div>
        </div>

      </div>

      {/* Analytics */}

      <div className="card shadow-lg border-0 mb-4">
        <div className="card-body">

          <h4 className="fw-bold">
            📊 Performance Analytics
          </h4>

          <hr />

          <p>
            <strong>
              Resolution Rate:
            </strong>{" "}
            {resolutionRate}%
          </p>

          <div className="progress mb-3">
            <div
              className="progress-bar bg-success"
              style={{
                width: `${resolutionRate}%`,
              }}
            >
              {resolutionRate}%
            </div>
          </div>

          <p>
            <strong>
              Average Rating:
            </strong>{" "}
            ⭐ {averageRating}/5
          </p>

          <p>
            <strong>
              Account Status:
            </strong>{" "}
            <span className="text-success">
              Active
            </span>
          </p>

        </div>
      </div>

      {/* Achievements */}

      <div className="card shadow-lg border-0">
        <div className="card-body">

          <h4 className="fw-bold">
            🏆 Achievements
          </h4>

          <ul className="mt-3">

            {role === "admin" && (
              <>
                <li>
                  City Operations Manager
                </li>

                <li>
                  Issue Monitoring Expert
                </li>

                <li>
                  Smart Governance Leader
                </li>

                <li>
                  Urban Analytics Supervisor
                </li>
              </>
            )}

            {role === "worker" && (
              <>
                <li>
                  Field Operations Specialist
                </li>

                <li>
                  Issue Resolution Contributor
                </li>

                <li>
                  Community Service Champion
                </li>

                <li>
                  Smart Maintenance Worker
                </li>
              </>
            )}

            {role === "user" && (
              <>
                <li>
                  Active Community Member
                </li>

                <li>
                  Smart City Contributor
                </li>

                <li>
                  Issue Reporting Champion
                </li>

                <li>
                  Supporting Urban Development
                </li>
              </>
            )}

          </ul>

        </div>
      </div>

    </div>
  );
}

export default ProfilePage;