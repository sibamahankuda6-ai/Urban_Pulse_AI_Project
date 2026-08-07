import React from "react";

function CitizenReportsPage() {
  const issues =
    JSON.parse(localStorage.getItem("issues")) || [];

  const total = issues.length;

  const resolved =
    issues.filter(
      (i) => i.status === "Resolved"
    ).length;

  const pending =
    issues.filter(
      (i) => i.status === "Pending"
    ).length;

  const highPriority =
    issues.filter(
      (i) => i.priority === "High"
    ).length;

  return (
    <div className="container mt-4">

      <h2 className="mb-4">
        📊 Citizen Reports & Analytics
      </h2>

      <div className="row">

        <div className="col-md-3 mb-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h3>{total}</h3>
              <p>Total Issues</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h3>{resolved}</h3>
              <p>Resolved</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h3>{pending}</h3>
              <p>Pending</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h3>{highPriority}</h3>
              <p>High Priority</p>
            </div>
          </div>
        </div>

      </div>

      <div className="card shadow-lg border-0 mt-4">
        <div className="card-body">
          <h4>
            🌍 City Performance Summary
          </h4>

          <p>
            Urban Pulse AI continuously tracks
            issue resolution, citizen satisfaction,
            department performance and worker
            productivity to improve city services.
          </p>
        </div>
      </div>

    </div>
  );
}

export default CitizenReportsPage;