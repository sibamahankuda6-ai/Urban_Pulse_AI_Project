import React, { useState } from "react";
import trackingService from "../services/trackingService";

function TrackingPage() {
  const [id, setId] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!id.trim()) {
      setComplaint(null);
      setError("Please enter a complaint ID");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await trackingService.trackComplaint(id);

      if (data) {
        setComplaint(data);
        setError("");
      } else {
        setComplaint(null);
        setError("Complaint Not Found");
      }
    } catch (err) {
      setComplaint(null);
      setError("Complaint Not Found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div
        className="p-4 rounded shadow-lg mb-4 text-white"
        style={{
          background:
            "linear-gradient(135deg,#0f172a,#1e40af,#2563eb)",
        }}
      >
        <h2 className="fw-bold">📍 Track Complaint</h2>
        <p className="mb-0">
          Enter your complaint ID to monitor current issue progress and resolution status.
        </p>
      </div>

      <div
        className="card shadow-lg border-0 p-4"
        style={{ borderRadius: "20px" }}
      >
        <label className="form-label fw-semibold">
          Complaint ID
        </label>

        <input
          type="number"
          className="form-control"
          placeholder="Enter Complaint ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <button
          className="btn btn-primary mt-3"
          onClick={handleTrack}
          disabled={loading}
        >
          {loading ? "Tracking..." : "Track Complaint"}
        </button>
      </div>

      {error && (
        <div className="alert alert-danger mt-3">
          {error}
        </div>
      )}

      {complaint && (
        <div className="card shadow-lg border-0 mt-4">
          <div className="card-body">
            <h4 className="fw-bold">
              Complaint Details
            </h4>

            <hr />

            <p>
              <strong>ID:</strong> {complaint.id}
            </p>

            <p>
              <strong>Issue Type:</strong>{" "}
              {complaint.issueType}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`badge ${
                  complaint.status === "Resolved"
                    ? "bg-success"
                    : complaint.status === "In Progress"
                    ? "bg-primary"
                    : "bg-warning text-dark"
                }`}
              >
                {complaint.status}
              </span>
            </p>

            <p>
              <strong>Priority:</strong>{" "}
              {complaint.priority}
            </p>

            <p>
              <strong>Assigned Worker:</strong>{" "}
              {complaint.assignedWorker || "Not Assigned Yet"}
            </p>

            <p>
              <strong>Resolution Note:</strong>{" "}
              {complaint.resolutionNote || "Not Available"}
            </p>

            <p>
              <strong>Created At:</strong>{" "}
              {complaint.createdAt || "N/A"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrackingPage;