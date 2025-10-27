import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router';
import { FaBars, FaTimes, FaTachometerAlt, FaUsers, FaNewspaper, FaComments, FaSignOutAlt } from 'react-icons/fa';
import AuthUser from '../../services/Hook/AuthUser';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { handleUserSignOut } = AuthUser();

  const menuItems = [
    { path: '/admin', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { path: '/admin/users', icon: <FaUsers />, label: 'Users' },
    { path: '/admin/articles', icon: <FaNewspaper />, label: 'Articles' },
    { path: '/admin/comments', icon: <FaComments />, label: 'Comments' },
  ];

  const handleLogout = async () => {
    try {
      await handleUserSignOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-base-200">
      {/* Sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-1 min-h-0 bg-base-100 border-r border-base-300">
          <div className="flex items-center justify-center h-16 flex-shrink-0 px-4 bg-primary">
            <h1 className="text-xl font-bold text-white">EduEcho Admin</h1>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-4 py-4 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary text-white'
                      : 'text-base-content hover:bg-base-300'
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 border-t border-base-300 p-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-error rounded-lg hover:bg-error hover:text-white transition-colors"
            >
              <span className="mr-3 text-lg"><FaSignOutAlt /></span>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 flex z-40">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-base-100">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none"
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaTimes className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="flex items-center justify-center h-16 flex-shrink-0 px-4 bg-primary">
                <h1 className="text-xl font-bold text-white">EduEcho Admin</h1>
              </div>
              <div className="flex-1 flex flex-col overflow-y-auto">
                <nav className="flex-1 px-4 py-4 space-y-2">
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive(item.path)
                          ? 'bg-primary text-white'
                          : 'text-base-content hover:bg-base-300'
                      }`}
                    >
                      <span className="mr-3 text-lg">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex-shrink-0 border-t border-base-300 p-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 text-sm font-medium text-error rounded-lg hover:bg-error hover:text-white transition-colors"
                >
                  <span className="mr-3 text-lg"><FaSignOutAlt /></span>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 lg:hidden bg-base-100 border-b border-base-300">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="btn btn-ghost btn-square"
            >
              <FaBars className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
            <div className="w-6"></div> {/* Spacer for balance */}
          </div>
        </div>

        <main className="flex-1 p-4 lg:p-6">
          <Outlet /> {/* This renders the nested admin routes */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;