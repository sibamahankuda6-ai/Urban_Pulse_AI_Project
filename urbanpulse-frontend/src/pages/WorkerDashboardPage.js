import React, { useEffect, useState } from "react";
import complaintService from "../services/complaintService";

function WorkerDashboardPage() {
  const [issues, setIssues] = useState([]);

 useEffect(() => {

  const loadComplaints =
    async () => {

      try {

        const data =
          await complaintService
            .getAllComplaints();

        setIssues(data);

      }

      catch(error) {

        console.error(error);

      }

    };

  loadComplaints();

}, []);

  const updateStatus = async (id, status) => {

  try {

    const currentIssue =
      issues.find(
        issue => issue.id === id
      );

    const updatedIssue = {
      ...currentIssue,
      status: status
    };

    await complaintService.updateComplaint(
      id,
      updatedIssue
    );

    const refreshedIssues =
      await complaintService.getAllComplaints();

    setIssues(refreshedIssues);

  }

  catch(error) {

    console.error(error);

  }

};

 const updateResolutionNote = async (id, note) => {

  try {

    const currentIssue =
      issues.find(
        issue => issue.id === id
      );

    const updatedIssue = {
      ...currentIssue,
      resolutionNote: note
    };

    await complaintService.updateComplaint(
      id,
      updatedIssue
    );

    const refreshedIssues =
      await complaintService.getAllComplaints();

    setIssues(refreshedIssues);

  }

  catch(error) {

    console.error(error);

  }

};
  return (
    <div className="container mt-4">
      <div
  className="p-4 rounded shadow-lg mb-4 text-white"
  style={{
    background:
      "linear-gradient(135deg,#14532d,#15803d,#22c55e)",
  }}
>
  <h2 className="fw-bold">
    👷 Worker Operations Dashboard
  </h2>

  <p className="mb-0">
    Manage assigned issues and update field progress.
  </p>
</div>
<div className="row mb-4">

  <div className="col-md-4">
    <div className="card bg-primary text-white border-0 shadow-lg">
      <div className="card-body text-center">
        <h1>{issues.length}</h1>
        <h6>Total Assigned</h6>
      </div>
    </div>
  </div>

  <div className="col-md-4">
    <div className="card bg-warning border-0 shadow-lg">
      <div className="card-body text-center">
        <h1>
          {
            issues.filter(
              i => i.status === "In Progress"
            ).length
          }
        </h1>
        <h6>In Progress</h6>
      </div>
    </div>
  </div>

  <div className="col-md-4">
    <div className="card bg-success text-white border-0 shadow-lg">
      <div className="card-body text-center">
        <h1>
          {
            issues.filter(
              i => i.status === "Resolved"
            ).length
          }
        </h1>
        <h6>Resolved</h6>
      </div>
    </div>
  </div>

</div>
{/* Worker Leaderboard */}

<div className="card shadow-lg border-0 mb-4">
  <div className="card-body">

    <h4 className="fw-bold">
      🏆 Top Performing Workers
    </h4>

    <table className="table">

      <thead>
        <tr>
          <th>Rank</th>
          <th>Worker</th>
          <th>Resolved Issues</th>
        </tr>
      </thead>

      <tbody>

        <tr>
          <td>🥇</td>
          <td>Ramesh</td>
          <td>25</td>
        </tr>

        <tr>
          <td>🥈</td>
          <td>Suresh</td>
          <td>18</td>
        </tr>

        <tr>
          <td>🥉</td>
          <td>Amit</td>
          <td>12</td>
        </tr>

      </tbody>

    </table>

  </div>
</div>


      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Issue</th>
            <th>Location</th>
            <th>Map</th>
            <th>Image</th>
            <th>Resolution Note</th>
            <th>Status</th>
            <th>Update Status</th>
          </tr>
        </thead>

        <tbody>
          {issues.length > 0 ? (
            issues.map((issue) => (
              <tr key={issue.id}>
                <td>{issue.id}</td>

               <td>{issue.issueType}</td>

                <td>{issue.location}</td>

                <td>
                  {issue.mapLink && (
                    <a
                      href={issue.mapLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      📍 Open Map
                    </a>
                  )}
                </td>

                <td>
                  {issue.imageUrl ? (
                    <img
                      src={issue.imageUrl}
                      alt="Issue"
                      width="80"
                      height="80"
                      style={{
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>

                <td>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter resolution details..."
                    value={
                      issue.resolutionNote || ""
                    }
                    onChange={(e) =>
                      updateResolutionNote(
                        issue.id,
                        e.target.value
                      )
                    }
                  />
                </td>

                <td>
                  <span
                    className={`badge ${
                      issue.status === "Resolved"
                        ? "bg-success"
                        : issue.status ===
                          "In Progress"
                        ? "bg-primary"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {issue.status}
                  </span>
                </td>

                <td>
                  <select
                    className="form-select"
                    value={issue.status}
                    onChange={(e) =>
                      updateStatus(
                        issue.id,
                        e.target.value
                      )
                    }
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Resolved">
                      Resolved
                    </option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="8"
                className="text-center"
              >
                📭 No Assigned Issues Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    
  );
}

export default WorkerDashboardPage;