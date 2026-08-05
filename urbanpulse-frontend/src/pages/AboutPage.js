import React from "react";

function AboutPage() {
  return (
    <div className="container mt-4">

      {/* Header */}

      <div
        className="p-5 rounded shadow-lg text-white mb-5"
        style={{
          background:
            "linear-gradient(135deg,#0f172a,#1e40af,#2563eb)",
        }}
      >
        <h1 className="fw-bold">
          ℹ️ About Urban Pulse AI
        </h1>

        <p className="mt-3 mb-0">
          A Smart City Management Platform
          designed to connect citizens,
          administrators, and workers for
          efficient urban issue resolution.
        </p>
      </div>

      {/* Why Urban Pulse AI */}

      <div className="card shadow-lg border-0 mb-4">
        <div className="card-body p-4">

          <h3 className="fw-bold">
            💡 Why Urban Pulse AI?
          </h3>

          <p className="mt-3">
            Modern cities face numerous
            challenges such as potholes,
            garbage overflow, streetlight
            failures, water leakage and
            delayed complaint resolution.
          </p>

          <p>
            Urban Pulse AI was developed to
            bridge the communication gap
            between citizens and authorities
            using AI-powered prioritization,
            smart analytics and real-time
            tracking.
          </p>

        </div>
      </div>

      {/* Problem vs Solution */}

      <div className="row mb-4">

        <div className="col-md-6">
          <div className="card shadow-lg border-0 h-100">
            <div className="card-body">

              <h3 className="text-danger">
                ❌ Problems
              </h3>

              <ul className="mt-3">
                <li>
                  Delayed issue resolution
                </li>

                <li>
                  Lack of transparency
                </li>

                <li>
                  Manual complaint tracking
                </li>

                <li>
                  Poor citizen engagement
                </li>

                <li>
                  No centralized monitoring
                </li>
              </ul>

            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-lg border-0 h-100">
            <div className="card-body">

              <h3 className="text-success">
                ✅ Our Solution
              </h3>

              <ul className="mt-3">
                <li>
                  AI-based priority detection
                </li>

                <li>
                  Real-time issue tracking
                </li>

                <li>
                  Worker assignment system
                </li>

                <li>
                  Analytics dashboard
                </li>

                <li>
                  Citizen feedback mechanism
                </li>
              </ul>

            </div>
          </div>
        </div>

      </div>

      {/* System Workflow */}

      <div className="card shadow-lg border-0 mb-4">
        <div className="card-body p-4">

          <h3 className="fw-bold">
            🔄 System Workflow
          </h3>

          <div className="text-center mt-4">

            <h5>👤 Citizen</h5>
            <p>⬇️</p>

            <h5>📝 Report Issue</h5>
            <p>⬇️</p>

            <h5>🤖 AI Priority Engine</h5>
            <p>⬇️</p>

            <h5>📊 Admin Dashboard</h5>
            <p>⬇️</p>

            <h5>👷 Worker Assignment</h5>
            <p>⬇️</p>

            <h5>🔧 Issue Resolution</h5>
            <p>⬇️</p>

            <h5>⭐ Citizen Feedback</h5>

          </div>

        </div>
      </div>

      {/* Technology Stack */}

      <div className="card shadow-lg border-0 mb-4">
        <div className="card-body p-4">

          <h3 className="fw-bold">
            💻 Technology Stack
          </h3>

          <div className="row text-center mt-4">

            <div className="col-md-3 mb-3">
              <div className="card shadow">
                <div className="card-body">
                  ⚛️
                  <h6 className="mt-2">
                    React JS
                  </h6>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow">
                <div className="card-body">
                  ☕
                  <h6 className="mt-2">
                    Spring Boot
                  </h6>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow">
                <div className="card-body">
                  🗄️
                  <h6 className="mt-2">
                    MySQL
                  </h6>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow">
                <div className="card-body">
                  📊
                  <h6 className="mt-2">
                    Chart.js
                  </h6>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Future Scope */}

      <div className="card shadow-lg border-0 mb-5">
        <div className="card-body p-4">

          <h3 className="fw-bold">
            🚀 Future Scope
          </h3>

          <ul className="mt-3">

            <li>
              Mobile Application Support
            </li>

            <li>
              IoT Sensor Integration
            </li>

            <li>
              Real-Time GPS Tracking
            </li>

            <li>
              AI Image Recognition
            </li>

            <li>
              Predictive City Analytics
            </li>

            <li>
              Smart Resource Allocation
            </li>

          </ul>

        </div>
      </div>

    </div>
  );
}

export default AboutPage;