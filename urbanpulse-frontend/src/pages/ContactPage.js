import React from "react";

function ContactPage() {
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
          📞 Contact & Project Benefits
        </h1>

        <p className="mt-3 mb-0">
          Get in touch with Urban Pulse AI and
          discover how smart technology improves
          urban management.
        </p>
      </div>

      {/* Contact Information */}

      <div className="card shadow-lg border-0 mb-4">
        <div className="card-body p-4">

          <h3 className="fw-bold">
            📬 Contact Information
          </h3>

          <hr />

          <p>
            <strong>Email:</strong>
            {" "}
            support@urbanpulseai.com
          </p>

          <p>
            <strong>Phone:</strong>
            {" "}
            +91 9692458642
          </p>

          <p>
            <strong>Location:</strong>
            {" "}
            Chennai, India
          </p>

        </div>
      </div>

      {/* Benefits */}

      <div className="card shadow-lg border-0 mb-4">
        <div className="card-body p-4">

          <h3 className="fw-bold">
            🌟 Benefits of Urban Pulse AI
          </h3>

          <div className="row mt-4">

            <div className="col-md-4 mb-3">
              <div className="card shadow h-100">
                <div className="card-body text-center">
                  <h1>⚡</h1>
                  <h5>Faster Resolution</h5>

                  <p>
                    AI helps prioritize critical
                    complaints for faster action.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card shadow h-100">
                <div className="card-body text-center">
                  <h1>📊</h1>
                  <h5>Smart Analytics</h5>

                  <p>
                    Real-time dashboards help
                    authorities make decisions.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card shadow h-100">
                <div className="card-body text-center">
                  <h1>👥</h1>
                  <h5>Citizen Engagement</h5>

                  <p>
                    Citizens can directly track
                    complaint progress.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Key Advantages */}

      <div className="card shadow-lg border-0 mb-4">
        <div className="card-body p-4">

          <h3 className="fw-bold">
            🚀 Key Advantages
          </h3>

          <ul className="mt-3">

            <li>
              AI-Based Priority Detection
            </li>

            <li>
              Real-Time Complaint Tracking
            </li>

            <li>
              Worker Assignment & Monitoring
            </li>

            <li>
              Smart City Health Index
            </li>

            <li>
              Citizen Feedback System
            </li>

            <li>
              Dashboard Analytics
            </li>

            <li>
              PDF Report Generation
            </li>

            <li>
              Location-Based Issue Reporting
            </li>

          </ul>

        </div>
      </div>

      {/* Future Impact */}

      <div className="card shadow-lg border-0 mb-5">
        <div className="card-body p-4">

          <h3 className="fw-bold">
            🌍 Future Impact
          </h3>

          <p className="mt-3">
            Urban Pulse AI can help cities
            become cleaner, safer and more
            efficient by connecting citizens,
            workers and authorities through a
            single intelligent platform.
          </p>

        </div>
      </div>

    </div>
  );
}

export default ContactPage;