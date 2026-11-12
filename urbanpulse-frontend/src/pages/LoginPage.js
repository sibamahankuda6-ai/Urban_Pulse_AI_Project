import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../services/authService";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrorMsg("Please enter your email.");
      return;
    }
    if (!password) {
      setErrorMsg("Please enter your password.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await authService.login(email.trim().toLowerCase(), password);

      toast.success("Login Successful");

      const role = (response.role || "").toUpperCase();

      setTimeout(() => {
        if (role === "ADMIN") {
          navigate("/dashboard");
        } else if (role === "WORKER" || role === "DEPARTMENT") {
          navigate("/worker-dashboard");
        } else {
          navigate("/issues");
        }
      }, 500);
    } catch (error) {
      const serverMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Invalid email or password";
      setErrorMsg(serverMsg);
      toast.error(serverMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div
        className="card mx-auto p-4 shadow-lg border-0"
        style={{
          maxWidth: "450px",
          borderRadius: "20px",
        }}
      >
        <h2 className="text-center mb-1 fw-bold">Urban Pulse AI</h2>
        <p className="text-center text-muted mb-4">
          Smart City Management Portal
        </p>

        {errorMsg && (
          <div className="alert alert-danger py-2" role="alert">
            <small>{errorMsg}</small>
          </div>
        )}

        <form onSubmit={handleLogin} noValidate>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMsg) setErrorMsg("");
              }}
              required
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg("");
                }}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? "👁️ Hide" : "👁️ Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold"
            disabled={loading}
          >
            {loading ? (
              <span>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Authenticating...
              </span>
            ) : (
              "🔐 Login"
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <small className="text-muted">
            Don't have an account?{" "}
            <Link to="/register" className="fw-semibold text-primary">
              Register here
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;