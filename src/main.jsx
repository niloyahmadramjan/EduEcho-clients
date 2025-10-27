import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./layouts/MainLayout.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import { AdminProvider } from "./context/AdminContext"; // Import AdminProvider

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AdminProvider> {/* ✅ Add this wrapper */}
        <RouterProvider router={router} />
      </AdminProvider>
    </AuthProvider>
  </React.StrictMode>
);