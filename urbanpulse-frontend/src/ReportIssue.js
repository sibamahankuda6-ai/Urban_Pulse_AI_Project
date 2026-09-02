// src/ReportIssue.js

import React, { useState } from "react";

function ReportIssue() {
  const [issue, setIssue] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Issue Submitted Successfully!");

    setIssue("");
    setLocation("");
    setDescription("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Report City Issue</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Issue Type:</label>
          <br />
          <select
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            required
          >
            <option value="">Select Issue</option>
            <option>Pothole</option>
            <option>Garbage</option>
            <option>Streetlight Failure</option>
          </select>
        </div>

        <br />

        <div>
          <label>Location:</label>
          <br />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Description:</label>
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Submit Issue</button>
      </form>
    </div>
  );
}

export default ReportIssue;