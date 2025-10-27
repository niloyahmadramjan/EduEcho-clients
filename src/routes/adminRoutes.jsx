import React from 'react';
import { Navigate } from 'react-router';
import useAdmin from '../hook/useAdmin';
import AuthUser from '../services/Hook/AuthUser';

const AdminRoute = ({ children }) => {
  const [isAdmin, adminLoading] = useAdmin();
  const { user, loading } = AuthUser();

  // Show loading spinner while checking authentication and admin status
  if (loading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content">Checking admin access...</p>
        </div>
      </div>
    );
  }

  // Redirect to home if not admin
  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;