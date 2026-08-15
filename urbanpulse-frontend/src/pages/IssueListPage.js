import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Link } from "react-router-dom";
import complaintService from "../services/complaintService";

function IssueListPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [issues, setIssues] = useState([]);

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const data = await complaintService.getAllComplaints();
      setIssues(data || []);
    } catch (error) {
      console.error("Failed to fetch complaints:", error);
    }
  };

  const markAsResolved = async (issue) => {
    try {
      const updatedComplaint = {
        ...issue,
        status: "Resolved",
      };

      await complaintService.updateComplaint(issue.id, updatedComplaint);

      const updatedIssues = issues.map((item) =>
        item.id === issue.id
          ? { ...item, status: "Resolved" }
          : item
      );

      setIssues(updatedIssues);

      const notifications =
        JSON.parse(localStorage.getItem("notifications")) || [];

      notifications.unshift({
        id: Date.now(),
        role: "admin",
        message: `Issue #${issue.id} marked as Resolved`,
        time: new Date().toLocaleString(),
      });

      localStorage.setItem(
        "notifications",
        JSON.stringify(notifications)
      );
    } catch (error) {
      console.error("Failed to resolve complaint:", error);
    }
  };

  const assignWorker = async (issue, workerName) => {
    try {
      const updatedComplaint = {
        ...issue,
        assignedWorker: workerName,
      };

      await complaintService.updateComplaint(issue.id, updatedComplaint);

      const updatedIssues = issues.map((item) =>
        item.id === issue.id
          ? { ...item, assignedWorker: workerName }
          : item
      );

      setIssues(updatedIssues);
    } catch (error) {
      console.error("Failed to assign worker:", error);
    }
  };

  const deleteIssue = async (id) => {
    try {
      await complaintService.deleteComplaint(id);

      setIssues((prevIssues) =>
        prevIssues.filter((issue) => issue.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete complaint:", error);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.text("Urban Pulse AI - Issues Report", 14, 15);

    autoTable(doc, {
      head: [
        [
          "ID",
          "Issue Type",
          "Location",
          "Priority",
          "Resolution Note",
          "Status",
          "Assigned Worker",
        ],
      ],
      body: issues.map((issue) => [
        issue.id,
        issue.issueType || "N/A",
        issue.location || "N/A",
        issue.priority || "N/A",
        issue.resolutionNote || "N/A",
        issue.status || "N/A",
        issue.assignedWorker || "Not Assigned",
      ]),
      startY: 25,
    });

    doc.save("Issues_Report.pdf");
  };

  const filteredIssues = issues.filter((issue) => {
    const locationText = (issue.location || "").toLowerCase();
    const searchText = search.toLowerCase();

    return (
      locationText.includes(searchText) &&
      (filter === "" || issue.issueType === filter)
    );
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return (
          <span className="badge bg-warning text-dark">
            Pending
          </span>
        );

      case "In Progress":
        return (
          <span className="badge bg-primary">
            In Progress
          </span>
        );

      case "Resolved":
        return (
          <span className="badge bg-success">
            Resolved
          </span>
        );

      default:
        return (
          <span className="badge bg-secondary">
            {status || "Unknown"}
          </span>
        );
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
        <h2 className="fw-bold">
          📋 Urban Issues Management
        </h2>

        <p className="mb-0">
          Monitor, track and manage all reported city issues.
        </p>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-lg bg-primary text-white">
            <div className="card-body text-center">
              <h1>{issues.length}</h1>
              <h6>Total Issues</h6>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-lg bg-warning">
            <div className="card-body text-center">
              <h1>
                {
                  issues.filter(
                    (issue) => issue.status === "Pending"
                  ).length
                }
              </h1>
              <h6>Pending</h6>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-lg bg-info text-white">
            <div className="card-body text-center">
              <h1>
                {
                  issues.filter(
                    (issue) => issue.status === "In Progress"
                  ).length
                }
              </h1>
              <h6>In Progress</h6>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-lg bg-success text-white">
            <div className="card-body text-center">
              <h1>
                {
                  issues.filter(
                    (issue) => issue.status === "Resolved"
                  ).length
                }
              </h1>
              <h6>Resolved</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <button
          className="btn btn-danger btn-lg shadow"
          onClick={exportToPDF}
        >
          📄 Export Issues Report
        </button>
      </div>

      <div
        className="card shadow-lg border-0 p-3 mb-4"
        style={{ borderRadius: "20px" }}
      >
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search by location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <select
              className="form-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All Issues</option>
              <option value="Pothole">Pothole</option>
              <option value="Garbage">Garbage</option>
              <option value="Streetlight Failure">
                Streetlight Failure
              </option>
              <option value="Water Leakage">
                Water Leakage
              </option>
              <option value="Road Damage">
                Road Damage
              </option>
              <option value="Traffic Signal Failure">
                Traffic Signal Failure
              </option>
              <option value="Drainage Problem">
                Drainage Problem
              </option>
              <option value="Illegal Dumping">
                Illegal Dumping
              </option>
            </select>
          </div>
        </div>
      </div>

      <div
        className="card shadow-lg border-0 p-3"
        style={{ borderRadius: "20px" }}
      >
        <h4 className="fw-bold mb-3">
          📝 Reported Issues
        </h4>

        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Issue Type</th>
                <th>Location</th>
                <th>Map</th>
                <th>Image</th>
                <th>Priority</th>
                <th>Resolution Note</th>
                <th>Status</th>
                <th>Assigned Worker</th>
                <th>Details</th>
                {role === "admin" && <th>Actions</th>}
              </tr>
            </thead>

            <tbody>
              {filteredIssues.length > 0 ? (
                filteredIssues.map((issue) => (
                  <tr key={issue.id}>
                    <td>{issue.id}</td>
                    <td>{issue.issueType}</td>
                    <td>{issue.location}</td>

                    <td>
                      {issue.mapLink ? (
                        <a
                          href={issue.mapLink}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-primary btn-sm"
                        >
                          📍 Open Map
                        </a>
                      ) : (
                        <span className="text-muted">N/A</span>
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

                    <td>{issue.priority}</td>

                    <td>
                      {issue.resolutionNote ? (
                        <span className="text-success">
                          {issue.resolutionNote}
                        </span>
                      ) : (
                        <span className="text-muted">
                          Not Available
                        </span>
                      )}
                    </td>

                    <td>{getStatusBadge(issue.status)}</td>

                    <td>
                      {issue.assignedWorker || "Not Assigned"}
                    </td>

                    <td>
                      <Link
                        to={`/issue/${issue.id}`}
                        className="btn btn-info btn-sm"
                      >
                        View Details
                      </Link>
                    </td>

                    {role === "admin" && (
                      <td>
                        <select
                          className="form-select form-select-sm mb-2"
                          value={issue.assignedWorker || ""}
                          onChange={(e) =>
                            assignWorker(issue, e.target.value)
                          }
                        >
                          <option value="">Assign Worker</option>
                          <option value="Ramesh">Ramesh</option>
                          <option value="Suresh">Suresh</option>
                          <option value="Amit">Amit</option>
                        </select>

                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => markAsResolved(issue)}
                        >
                          Resolve
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteIssue(issue.id)}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={role === "admin" ? 11 : 10}
                    className="text-center"
                  >
                    No Issues Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default IssueListPage;