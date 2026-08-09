import React, { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import analyticsService
from "../services/analyticsService";
import complaintService
from "../services/complaintService";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function DashboardPage() {

  const [stats, setStats] = useState({});
  const [issues, setIssues] = useState([]);

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const analytics =
          await analyticsService.getDashboardData();

        setStats(analytics);

        const complaints =
          await complaintService.getAllComplaints();

        setIssues(complaints);

      }

      catch (error) {

        console.error(error);

      }

    };

    loadDashboard();

  }, []);

  const totalIssues =
  stats.totalComplaints || 0;

  const pendingIssues =
  stats.pendingComplaints || 0;

  const inProgressIssues =
  stats.inProgressComplaints || 0;

  const resolvedIssues =
  stats.resolvedComplaints || 0;
  const feedbacks = issues.filter(
  (issue) => issue.feedback?.rating
);

const totalFeedbacks =
  feedbacks.length;

const averageRating =
  totalFeedbacks > 0
    ? (
        feedbacks.reduce(
          (sum, issue) =>
            sum +
            Number(issue.feedback.rating),
          0
        ) / totalFeedbacks
      ).toFixed(1)
    : 0;

const satisfaction =
  totalFeedbacks > 0
    ? (
        (averageRating / 5) *
        100
      ).toFixed(0)
    : 0;
    const cityHealth =
  totalIssues > 0
    ? Math.max(
        0,
        Math.round(
          100 -
          ((pendingIssues / totalIssues) * 100)
        )
      )
    : 100;

  const exportDashboardPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "Urban Pulse AI Dashboard Report",
      14,
      20
    );

    doc.setFontSize(12);

    doc.text(
      `Total Issues: ${totalIssues}`,
      14,
      40
    );

    doc.text(
      `Pending Issues: ${pendingIssues}`,
      14,
      50
    );

    doc.text(
      `In Progress Issues: ${inProgressIssues}`,
      14,
      60
    );

    doc.text(
      `Resolved Issues: ${resolvedIssues}`,
      14,
      70
    );

    autoTable(doc, {
      startY: 90,
      head: [
        [
          "Issue Type",
          "Location",
          "Priority",
          "Status",
        ],
      ],
      body: issues.map((issue) => [
        issue.type,
        issue.location,
        issue.priority,
        issue.status,
      ]),
    });

    doc.save(
      "Urban_Pulse_Dashboard_Report.pdf"
    );
  };

  const pieData = {
    labels: [
      "Pending",
      "In Progress",
      "Resolved",
    ],

    datasets: [
      {
        data: [
          pendingIssues,
          inProgressIssues,
          resolvedIssues,
        ],

        backgroundColor: [
          "#ffc107",
          "#0d6efd",
          "#198754",
        ],
      },
    ],
  };

  const barData = {
    labels: [
      "Pending",
      "In Progress",
      "Resolved",
    ],

    datasets: [
      {
        label: "Issues",

        data: [
          pendingIssues,
          inProgressIssues,
          resolvedIssues,
        ],

        backgroundColor: [
          "#ffc107",
          "#0d6efd",
          "#198754",
        ],
      },
    ],
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
    📊 Urban Pulse Analytics Dashboard
  </h2>

  <p className="mb-0">
    Monitor city issues, worker performance,
    citizen feedback and resolution statistics.
  </p>
</div>
      <div className="mb-3">
        <button
          className="btn btn-danger btn-lg shadow"
          onClick={exportDashboardPDF}
        >
          📄 Export Dashboard Report
        </button>
      </div>

      {/* Cards */}

      <div className="row">

  <div className="col-md-2 mb-3">
   <div
  className="card text-center border-0 shadow-lg"
  style={{
    background:
      "linear-gradient(135deg,#2563eb,#1d4ed8)",
    color: "white",
    borderRadius: "20px",
  }}
>
      <div className="card-body">
        <h6>Total Issues</h6>
       <h1 className="fw-bold">
  {totalIssues}
</h1>
      </div>
    </div>
  </div>

  <div className="col-md-2 mb-3">
   <div
  className="card text-center border-0 shadow-lg dashboard-card"
  style={{
    background:
      "linear-gradient(135deg,#f59e0b,#d97706)",
    color: "white",
    borderRadius: "20px",
  }}
>
      <div className="card-body">
        <h6>Pending</h6>
        <h1 className="fw-bold">
  {pendingIssues}
</h1>
      </div>
    </div>
  </div>

  <div className="col-md-2 mb-3">
   <div
  className="card text-center border-0 shadow-lg dashboard-card"
  style={{
    background:
      "linear-gradient(135deg,#06b6d4,#0891b2)",
    color: "white",
    borderRadius: "20px",
  }}
>
      <div className="card-body">
        <h6>In Progress</h6>
        <h1 className="fw-bold">
  {inProgressIssues}
</h1>
      </div>
    </div>
  </div>

  <div className="col-md-2 mb-3">
   <div
  className="card text-center border-0 shadow-lg dashboard-card "
  style={{
    background:
      "linear-gradient(135deg,#10b981,#059669)",
    color: "white",
    borderRadius: "20px",
  }}
>
      <div className="card-body">
        <h6>Resolved</h6>
        <h1 className="fw-bold">
  {resolvedIssues}
</h1>
      </div>
    </div>
  </div>

  <div className="col-md-2 mb-3">
    <div className="card text-center shadow">
      <div className="card-body">
        <h6>⭐ Rating</h6>
        <h3>{averageRating}</h3>
      </div>
    </div>
  </div>

  <div className="col-md-2 mb-3">
    <div className="card text-center shadow">
      <div className="card-body">
        <h6>😊 Satisfaction</h6>
        <h3>{satisfaction}%</h3>
      </div>
    </div>
  </div>
  <div className="col-md-2 mb-3">
  <div className="card text-center shadow">
    <div className="card-body">
      <h6>📝 Feedbacks</h6>
      <h3>{totalFeedbacks}</h3>
    </div>
  </div>
</div>

</div>

      {/* Charts */}

      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div
  className="card p-4 shadow-lg border-0"
  style={{
    borderRadius: "20px",
  }}
>
            <h4 className="text-center fw-bold mb-3">
  📊 Issue Distribution
</h4>

            <Pie data={pieData} />
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div
  className="card p-4 shadow-lg border-0"
  style={{
    borderRadius: "20px",
  }}
>
            <h4 className="text-center fw-bold mb-3">
  📈 Issue Statistics
</h4>

            <Bar data={barData} />
          </div>
        </div>
      </div>
{/* City Health Index */}

<div className="card shadow-lg border-0 mb-4">
  <div className="card-body text-center">

    <h4 className="fw-bold">
  🌍 Smart City Health Index
</h4>

<p className="text-muted">
  Calculated using issue resolution efficiency
  and pending complaint ratio.
</p>

<h1
  className={
    cityHealth >= 80
      ? "text-success"
      : cityHealth >= 50
      ? "text-warning"
      : "text-danger"
  }
>
  {cityHealth}/100
</h1>

    <div className="progress mt-3">

      <div
        className="progress-bar"
        role="progressbar"
        style={{
          width: `${cityHealth}%`
        }}
      >
        {cityHealth}%
      </div>

    </div>

    <p className="mt-3">

      {cityHealth >= 80 &&
        "🟢 Excellent City Performance"}

      {cityHealth >= 50 &&
        cityHealth < 80 &&
        "🟡 Needs Improvement"}

      {cityHealth < 50 &&
        "🔴 Critical Attention Required"}

    </p>

  </div>
</div>
      {/* High Priority Alerts */}

<div className="card border-0 shadow-lg mb-4">
  <div className="card-body">

    <h4 className="fw-bold text-danger">
      🚨 High Priority Alerts
    </h4>

    {
      issues.filter(
        issue => issue.priority === "High"
      ).length > 0 ? (

        issues
          .filter(
            issue =>
              issue.priority === "High"
          )
          .slice(0, 5)
          .map(issue => (
            <div
              key={issue.id}
              className="alert alert-danger"
            >
              <strong>
                {issue.type}
              </strong>

              <br />

              📍 {issue.location}

              <br />

              Status:
              {" "}
              {issue.status}
            </div>
          ))

      ) : (

        <div className="alert alert-success">
          No High Priority Alerts
        </div>

      )
    }

  </div>
</div>

      {/* Recent Feedbacks */}
      {/* Quick Actions */}

<div className="card shadow-lg border-0 p-4 mb-4">
  <h4 className="fw-bold mb-3">
    ⚡ Quick Actions
  </h4>

  <div className="d-flex flex-wrap gap-3">

    <button className="btn btn-primary">
      📝 Report Issue
    </button>

    <button className="btn btn-success">
      📋 View Issues
    </button>

    <button className="btn btn-warning">
      👷 Manage Workers
    </button>

    <button className="btn btn-danger">
      📄 Export Report
    </button>

  </div>
</div>

<div
  className="card p-4 shadow-lg border-0 mb-4"
  style={{
    borderRadius: "20px",
  }}
>
  <h4 className="mb-3">
    Recent Feedbacks
  </h4>

  {feedbacks.length > 0 ? (
    feedbacks
      .slice(-3)
      .reverse()
      .map((issue) => (
        <div
          key={issue.id}
          className="border-bottom pb-2 mb-2"
        >
          <strong>
            ⭐ {issue.feedback.rating}/5
          </strong>

          <p className="mb-0">
            {issue.feedback.comment}
          </p>
        </div>
      ))
  ) : (
    <p>No Feedback Available</p>
  )}
</div>

{/* Recent Issues */}

<div
  className="card p-4 shadow-lg border-0"
  style={{
    borderRadius: "20px",
  }}
>
  <h4 className="fw-bold mb-3">
  📋 Recent Issues
</h4>
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Issue Type</th>
              <th>Location</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {issues.length > 0 ? (
              issues
                .slice(-5)
                .reverse()
                .map((issue) => (
                  <tr key={issue.id}>
                    <td>{issue.id}</td>
                    <td>{issue.type}</td>
                    <td>{issue.location}</td>
                    <td>{issue.priority}</td>
                    <td>{issue.status}</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td
                  colSpan="5"
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
  );
}

export default DashboardPage;