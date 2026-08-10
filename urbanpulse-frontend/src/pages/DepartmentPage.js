import React from "react";

function DepartmentPage() {
  const departments = [
    {
      name: "Roads Department",
      pending: 5,
      resolved: 15,
      icon: "🛣️",
    },
    {
      name: "Sanitation Department",
      pending: 3,
      resolved: 12,
      icon: "🗑️",
    },
    {
      name: "Electricity Department",
      pending: 2,
      resolved: 10,
      icon: "💡",
    },
    {
      name: "Water Department",
      pending: 1,
      resolved: 8,
      icon: "🚰",
    },
  ];

  return (
    <div className="container mt-4">

      <h2 className="mb-4">
        🏢 Department Overview
      </h2>

      <div className="row">

        {departments.map((dept, index) => (
          <div
            className="col-md-6 mb-4"
            key={index}
          >
            <div className="card shadow-lg border-0">
              <div className="card-body">

                <h4>
                  {dept.icon} {dept.name}
                </h4>

                <hr />

                <p>
                  Pending Issues:
                  {" "}
                  {dept.pending}
                </p>

                <p>
                  Resolved Issues:
                  {" "}
                  {dept.resolved}
                </p>

              </div>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default DepartmentPage;