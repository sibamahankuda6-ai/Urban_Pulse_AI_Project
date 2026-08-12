import React, { useState } from "react";
import { toast } from "react-toastify";
import authService from "../services/authService";

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const user =
        await authService.login(
          email,
          password
        );

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      localStorage.setItem(
        "role",
        user.role.toLowerCase()
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      toast.success(
        "Login Successful"
      );

      setTimeout(() => {

        if (
          user.role === "ADMIN"
        ) {

          window.location.href =
            "/dashboard";

        }

        else if (
          user.role === "WORKER"
        ) {

          window.location.href =
            "/worker-dashboard";

        }

        else {

          window.location.href =
            "/issues";

        }

      }, 1000);

    }

    catch (error) {

      toast.error(
        "Invalid Email or Password"
      );

    }

  };

  return (
    <div className="container mt-5">

      <div
        className="card mx-auto p-4 shadow-lg border-0"
        style={{
          maxWidth: "450px",
          borderRadius: "20px"
        }}
      >

        <h2 className="text-center mb-2 fw-bold">
          Urban Pulse AI
        </h2>

        <p className="text-center text-muted">
          Smart City Management Portal
        </p>

        <form onSubmit={handleLogin}>

          <div className="mb-3">

            <label>Email</label>

            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          <div className="mb-3">

            <label>Password</label>

            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            🔐 Login
          </button>

        </form>

        <hr />

        <div className="alert alert-info">

          <small>
            Backend Login Enabled
          </small>

          <br />

          <small>
            Example:
          </small>

          <br />

          <small>
            admin@gmail.com / 12345
          </small>

        </div>

      </div>

    </div>
  );
}

export default LoginPage;