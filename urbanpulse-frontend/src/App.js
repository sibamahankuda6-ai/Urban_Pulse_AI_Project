import React, { useState, useEffect } from "react";
import axios from "axios";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    localStorage.setItem("darkMode", darkMode);

    // Test backend connection
    axios
      .get("http://localhost:8080/api/complaints")
      .then((res) => {
        console.log("Complaints Data:", res.data);
      })
      .catch((err) => {
        console.error("Backend Error:", err);
      });

  }, [darkMode]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "8px",
          right: "8px",
          zIndex: 9999,
        }}
      >
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setDarkMode(!darkMode)}
          style={{
            fontSize: "12px",
            padding: "4px 8px",
          }}
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>

      <AppRoutes />
    </>
  );
}

export default App;