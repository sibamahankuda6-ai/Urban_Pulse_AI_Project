import React, {
  useEffect,
  useState
} from "react";

import workerService
from "../services/workerService";

function WorkerManagementPage() {

  const [workers, setWorkers] =
    useState([]);

  useEffect(() => {

    const loadWorkers =
      async () => {

        try {

          const data =
            await workerService
              .getAllWorkers();

          setWorkers(data);

        }

        catch(error) {

          console.error(error);

        }

      };

    loadWorkers();

  }, []);

  return (
    <div className="container mt-4">

      <div className="card shadow-lg border-0 mb-4">
        <div className="card-body text-center">

          <h2>
            👷 Worker Management
          </h2>

          <p>
            Monitor worker performance
            and assignments.
          </p>

        </div>
      </div>

      <table className="table table-bordered table-striped">

        <thead>
          <tr>
            <th>ID</th>
            <th>Worker</th>
            <th>Department</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {workers.map((worker) => (

            <tr key={worker.id}>

              <td>{worker.id}</td>

              <td>{worker.name}</td>

              <td>{worker.department}</td>

              <td>{worker.email}</td>

              <td>{worker.phone}</td>

              <td>

                <span
                  className={
                    worker.status ===
                    "Active"
                    ? "badge bg-success"
                    : "badge bg-danger"
                  }
                >
                  {worker.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default WorkerManagementPage;