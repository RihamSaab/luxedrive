import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ user, children }) => {
  if (!user || user.role !== "admin") {
    // Redirect non-admin users to home page
    return <Navigate to="/" replace />;
  }

  return children;
};
