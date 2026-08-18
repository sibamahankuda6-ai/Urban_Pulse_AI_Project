import React, { useState } from "react";
import { toast } from "react-toastify";
import complaintService from "../services/complaintService";
import uploadService from "../services/uploadService";

function ReportIssuePage() {
  const [issueType, setIssueType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [image, setImage] = useState("");
const [imageFile, setImageFile] = useState(null);

  const handleIssueChange = (e) => {
    setIssueType(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;

    setDescription(value);

    let aiPriority = "Low";

    const text = value.toLowerCase();

    if (
      text.includes("accident") ||
      text.includes("danger") ||
      text.includes("emergency") ||
      text.includes("injury")
    ) {
      aiPriority = "High";
    } else if (
      text.includes("garbage") ||
      text.includes("dirty") ||
      text.includes("overflow") ||
      text.includes("waste")
    ) {
      aiPriority = "Medium";
    }

    setPriority(aiPriority);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          setLocation(`${lat}, ${lng}`);

          toast.success(
            "Location fetched successfully!"
          );
        },
        () => {
          toast.error(
            "Unable to fetch location"
          );
        }
      );
    } else {
      toast.error(
        "Geolocation is not supported"
      );
    }
  };

  const handleImageChange = (e) => {

  const file = e.target.files[0];

  if (file) {

    setImageFile(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);

  }

};

  const removeImage = () => {
    setImage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {

 let uploadedImageUrl = "";

if (imageFile) {

  uploadedImageUrl =
    await uploadService.uploadImage(
      imageFile
    );

}

const complaintData = {

  issueType: issueType,
  location: location,
  description: description,
  priority: priority,
  status: "Pending",
  assignedWorker: "",
  resolutionNote: "",
  imageUrl: uploadedImageUrl,
  createdAt: new Date().toLocaleString()

};

  await complaintService.createComplaint(
    complaintData
  );

  toast.success(
    "Issue Submitted Successfully!"
  );

  setIssueType("");
  setLocation("");
  setDescription("");
  setPriority("");
  setImage("");

}

catch (error) {

  console.error(error);

  toast.error(
    "Failed to Submit Issue"
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
    🚨 Report Urban Issue
  </h2>

  <p className="mb-0">
    Help improve your city by reporting issues quickly and efficiently.
  </p>
</div>

      <div
  className="card shadow-lg border-0 p-4"
  style={{
    borderRadius: "20px",
  }}
>
<form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            Issue Type
          </label>

          <select
            className="form-select"
            value={issueType}
            onChange={handleIssueChange}
            required
          >
            <option value="">
              Select Issue
            </option>

           <option value="Pothole">Pothole</option>

<option value="Garbage">
  Garbage
</option>

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

        <div className="mb-3">
          <label className="form-label">
            Location
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Enter location"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            required
          />
          {location && (
  <div
    className="alert alert-info mt-2"
  >
    📍 Current Location:
    <br />
    {location}
  </div>
)}

          <button
            type="button"
            className="btn btn-success btn-sm mt-2"
            onClick={getCurrentLocation}
          >
            📍 Use My Current Location
          </button>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Description
          </label>

          <textarea
          
            className="form-control"
            rows="4"
            placeholder="Describe the issue"
            value={description}
            onChange={
              handleDescriptionChange
            }
            required
          ></textarea>
          <div className="text-end text-muted mt-1">
  {description.length}/500 Characters
</div>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Upload Image
          </label>

          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {image && (
          <div className="mb-3">
            <h5 className="mb-3">
  🖼️ Image Preview
</h5>
           <img
  src={image}
  alt="Preview"
  className="img-fluid rounded shadow"
              style={{
                width: "250px",
              }}
            />

            <br />

            <button
              type="button"
              className="btn btn-danger btn-sm mt-2"
              onClick={removeImage}
            >
              Remove Image
            </button>
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">
            AI Priority
          </label>

          <div>
            {/* Issue Summary */}

<div
  className="card shadow-sm mt-4 mb-4"
  style={{
    borderRadius: "15px",
  }}
>
  <div className="card-body">

    <h4 className="fw-bold">
      📋 Issue Summary
    </h4>

    <hr />

    <p>
      <strong>Issue Type:</strong>{" "}
      {issueType || "Not Selected"}
    </p>

    <p>
      <strong>Location:</strong>{" "}
      {location || "Not Provided"}
    </p>

    <p>
      <strong>Priority:</strong>{" "}
      {priority || "Not Detected"}
    </p>

    <p>
      <strong>Description:</strong>{" "}
      {description || "No Description"}
    </p>

  </div>
</div>
  <span
    className={`badge ${
      priority === "High"
        ? "bg-danger"
        : priority === "Medium"
        ? "bg-warning text-dark"
        : "bg-success"
    }`}
    style={{
      fontSize: "16px",
      padding: "10px",
    }}
  >
    {priority || "Not Detected"}
  </span>
</div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg shadow"
        >
          🚀 Submit Issue
        </button>
      </form>
    </div>
    </div>
  );
}


export default ReportIssuePage;