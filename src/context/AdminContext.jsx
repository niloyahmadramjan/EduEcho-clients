import { createContext, useContext, useState } from 'react';

// ✅ Create the AdminContext
const AdminContext = createContext(null);

// ✅ AdminProvider component
export const AdminProvider = ({ children }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const value = {
    stats,
    loading,
    setStats,
    setLoading,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

// ✅ Custom hook to access AdminContext
export const useAdminContext = () => {
  const context = useContext(AdminContext);
  
  if (!context) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  
  return context;
};

export default AdminContext;