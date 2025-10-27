import React, { useEffect, useState } from 'react';
import { useAdminContext } from '../../context/AdminContext';
import DashboardStats from '../../components/admin/DashboardStats';
import RecentActivity from '../../components/admin/RecentActivity';
import { FaSync } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hook/useAxiosSecure';

const AdminDashboard = () => {
  const { stats, setStats, setLoading } = useAdminContext();
  const [localLoading, setLocalLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const getDashboardStats = async () => {
    setLocalLoading(true);
    setLoading(true);
    try {
      const res = await axiosSecure.get('/admin/dashboard/stats');
      setStats(res.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      Swal.fire('Error', 'Failed to fetch dashboard stats', 'error');
    } finally {
      setLocalLoading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardStats();
  }, []);

  const handleRefresh = () => {
    getDashboardStats();
  };

  const loading = localLoading;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-base-content/70 mt-2">Welcome to EduEcho Admin Panel</p>
        </div>
        <button
          onClick={handleRefresh}
          className="btn btn-primary btn-outline"
          disabled={loading}
        >
          <FaSync className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <>
          <DashboardStats stats={stats} />
          <RecentActivity stats={stats} />

          {/* Recent Users & Articles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Users */}
            <div className="card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body">
                <h2 className="card-title">Recent Users</h2>
                <div className="space-y-4">
                  {stats?.recent?.users?.length > 0 ? (
                    stats.recent.users.map((user) => (
                      <div key={user._id} className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={user.photo || '/default-avatar.png'} alt={user.name} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-base-content/70">{user.email}</p>
                        </div>
                        <div className="text-right">
                          <span className="badge badge-ghost text-xs">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </span>
                          <span className={`badge badge-sm ml-1 ${
                            user.role === 'admin' ? 'badge-primary' : 
                            user.role === 'author' ? 'badge-secondary' : 'badge-ghost'
                          }`}>
                            {user.role}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-base-content/70 py-4">No recent users</p>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Articles */}
            <div className="card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body">
                <h2 className="card-title">Recent Articles</h2>
                <div className="space-y-4">
                  {stats?.recent?.articles?.length > 0 ? (
                    stats.recent.articles.map((article) => (
                      <div key={article._id} className="p-3 bg-base-200 rounded-lg">
                        <p className="font-semibold line-clamp-2">{article.title}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="badge badge-outline">{article.category}</span>
                          <span className="text-sm text-base-content/70">
                            {new Date(article.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="mt-2">
                          <span className={`badge badge-sm ${
                            article.status === 'published' ? 'badge-success' :
                            article.status === 'draft' ? 'badge-warning' :
                            'badge-error'
                          }`}>
                            {article.status || 'draft'}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-base-content/70 py-4">No recent articles</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;