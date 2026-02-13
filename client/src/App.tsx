import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import NgoDashboard from "./pages/dashboard/NgoDashboard";
import ProviderDashboard from "./pages/dashboard/ProviderDashboard";

import CreateSurplusPage from "./pages/surplus/CreateSurplusPage";
import SurplusListPage from "./pages/surplus/SurplusListPage";

import NotificationsPage from "./pages/notifications/NotificationsPage";
import NgoListPage from "./pages/ngos/NgoListPage";

const App: React.FC = () => {
  const userString = localStorage.getItem("currentUser");
  const currentUser = userString ? JSON.parse(userString) : null;

  const isAuthenticated = !!currentUser;

  return (
    <BrowserRouter>
      <Routes>

        {/* ---------------- PUBLIC ROUTES ---------------- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ---------------- NGO DASHBOARD ---------------- */}
        <Route
          path="/ngo-dashboard"
          element={
            isAuthenticated && currentUser?.role === "ngo" ? (
              <NgoDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* ---------------- PROVIDER DASHBOARD ---------------- */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated && currentUser?.role === "provider" ? (
              <ProviderDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* ---------------- CREATE SURPLUS ---------------- */}
        <Route
          path="/create-surplus"
          element={
            isAuthenticated ? (
              <CreateSurplusPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* ---------------- VIEW SURPLUS ---------------- */}
        <Route
          path="/surplus"
          element={
            isAuthenticated ? (
              <SurplusListPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* ---------------- NOTIFICATIONS ---------------- */}
        <Route
          path="/notifications"
          element={
            isAuthenticated ? (
              <NotificationsPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* ---------------- NGO LIST ---------------- */}
        <Route
          path="/ngos"
          element={
            isAuthenticated ? (
              <NgoListPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* ---------------- DEFAULT ---------------- */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              currentUser?.role === "ngo" ? (
                <Navigate to="/ngo-dashboard" replace />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
