import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProtectedRoute from "../routes/ProtectedRoute";

import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import DashboardPage from "../pages/DashboardPage";
import ReportIssuePage from "../pages/ReportIssuePage";
import IssueListPage from "../pages/IssueListPage";
import LoginPage from "../pages/LoginPage";
import NotificationPage from "../pages/NotificationPage";
import NotFoundPage from "../pages/NotFoundPage";
import WorkerDashboardPage from "../pages/WorkerDashboardPage";
import ProfilePage from "../pages/ProfilePage";
import IssueDetailsPage from "../pages/IssueDetailsPage";
import WorkerManagementPage from "../pages/WorkerManagementPage";
import DepartmentPage from "../pages/DepartmentPage";
import CitizenReportsPage from "../pages/CitizenReportsPage";
import TrackingPage from "../pages/TrackingPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/about"
          element={<AboutPage />}
        />

        <Route
          path="/contact"
          element={<ContactPage />}
        />

        <Route
          path="/report"
          element={<ReportIssuePage />}
        />
        <Route
  path="/tracking"
  element={<TrackingPage />}
/>

       <Route
  path="/issues"
  element={
    <ProtectedRoute>
      <IssueListPage />
    </ProtectedRoute>
  }
/>

        <Route
  path="/dashboard"
  element={
    <ProtectedRoute role="admin">
      <DashboardPage />
    </ProtectedRoute>
  }
/>

        <Route
  path="/notifications"
  element={
    <ProtectedRoute>
      <NotificationPage />
    </ProtectedRoute>
  }
/>

        <Route
          path="*"
          element={<NotFoundPage />}
        />
        <Route
  path="/profile"
  element={<ProfilePage />}
/>
        <Route
  path="/worker-dashboard"
  element={
    <ProtectedRoute role="worker">
      <WorkerDashboardPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/issue/:id"
  element={<IssueDetailsPage />}
/>
<Route
  path="/workers"
  element={
    <ProtectedRoute role="admin">
      <WorkerManagementPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/departments"
  element={
    <ProtectedRoute role="admin">
      <DepartmentPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/reports"
  element={
    <ProtectedRoute role="admin">
      <CitizenReportsPage />
    </ProtectedRoute>
  }
/>

      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default AppRoutes;