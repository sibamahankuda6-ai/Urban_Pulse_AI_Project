import React, { useEffect, useState } from "react";
import notificationService from "../services/notificationService";

function NotificationPage() {

  const [notifications, setNotifications] =
    useState([]);

  const role =
    localStorage.getItem("role");

  useEffect(() => {

    const loadNotifications =
      async () => {

        try {

          const data =
            await notificationService
              .getAllNotifications();

          setNotifications(data);

        }

        catch (error) {

          console.error(error);

        }

      };

    loadNotifications();

  }, []);

  const clearNotifications = () => {

    setNotifications([]);

  };

  return (
    <div className="container mt-4">

      <div
        className="p-4 rounded shadow-lg mb-4 text-white"
        style={{
          background:
            "linear-gradient(135deg,#7c3aed,#9333ea,#c084fc)",
        }}
      >
        <h2 className="fw-bold">
          🔔 Notification Center
        </h2>

        <p className="mb-0">
          Track issue updates,
          resolutions and system alerts.
        </p>
      </div>

      <div className="mb-4">
        <div className="card shadow border-0">
          <div className="card-body text-center">

            <h1>
              {notifications.length}
            </h1>

            <h5>
              Total Notifications
            </h5>

            <span
              className={`badge ${
                role === "admin"
                  ? "bg-danger"
                  : role === "worker"
                  ? "bg-warning text-dark"
                  : "bg-success"
              }`}
            >
              {role?.toUpperCase()}
            </span>

          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>
          🔔 Notifications
        </h2>

        {notifications.length > 0 && (
          <button
            className="btn btn-danger shadow"
            onClick={clearNotifications}
          >
            Clear All
          </button>
        )}

      </div>

      {notifications.length === 0 ? (

        <div className="alert alert-info text-center">

          <h4>
            📭 No Notifications
          </h4>

          <p className="mb-0">
            All system updates will
            appear here.
          </p>

        </div>

      ) : (

        notifications.map((item) => (

          <div
            key={item.id}
            className="card shadow-lg border-0 mb-3"
          >
            <div className="card-body">

              <h5 className="card-title">
                🔔 {item.message}
              </h5>

              <div className="mt-2">

  <span
    className={
      item.isRead
        ? "badge bg-success"
        : "badge bg-warning text-dark"
    }
  >
    {item.isRead
      ? "Read"
      : "Unread"}
  </span>

  <span className="ms-2 badge bg-info">
    {item.type}
  </span>

</div>

              <small className="text-muted">
                {item.createdAt || item.time}
              </small>

            </div>
          </div>

        ))

      )}

    </div>
  );
}

export default NotificationPage;