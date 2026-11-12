import React, { useState, useEffect } from "react";
import complaintService from "../services/complaintService";

function CitizenReportsPage() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const data = await complaintService.getAllComplaints();
        if (Array.isArray(data)) {
          setIssues(data);
        }
      } catch (err) {
        const local = JSON.parse(localStorage.getItem("issues")) || [];
        setIssues(local);
      }
    };
    fetchIssues();
  }, []);

  const total = issues.length;

  const resolved = issues.filter((i) => i.status === "Resolved").length;

  const pending = issues.filter((i) => i.status === "Pending").length;

  const highPriority = issues.filter((i) => i.priority === "High").length;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📊 Citizen Reports & Analytics</h2>

      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h3>{total}</h3>
              <p className="text-muted mb-0">Total Issues</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h3 className="text-success">{resolved}</h3>
              <p className="text-muted mb-0">Resolved</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h3 className="text-warning">{pending}</h3>
              <p className="text-muted mb-0">Pending</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h3 className="text-danger">{highPriority}</h3>
              <p className="text-muted mb-0">High Priority</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-lg border-0 mt-4">
        <div className="card-body">
          <h4>🌍 City Performance Summary</h4>
          <p className="text-muted mb-0">
            Urban Pulse AI continuously tracks issue resolution, citizen
            satisfaction, department performance, and worker productivity to
            improve city services in real time.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CitizenReportsPage;