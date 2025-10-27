import React from 'react';
import { FaUsers, FaNewspaper, FaComments, FaHeart } from 'react-icons/fa';

const StatCard = ({ title, value, icon, color }) => (
  <div className="card bg-base-100 shadow-xl border border-base-300">
    <div className="card-body">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="card-title text-3xl font-bold text-primary">{value}</h2>
          <p className="text-base-content/70">{title}</p>
        </div>
        <div className={`text-4xl ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  </div>
);

const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Users"
        value={stats?.overview?.totalUsers || 0}
        icon={<FaUsers />}
        color="text-blue-500"
      />
      <StatCard
        title="Total Articles"
        value={stats?.overview?.totalArticles || 0}
        icon={<FaNewspaper />}
        color="text-green-500"
      />
      <StatCard
        title="Total Comments"
        value={stats?.overview?.totalComments || 0}
        icon={<FaComments />}
        color="text-orange-500"
      />
      <StatCard
        title="Total Likes"
        value={stats?.overview?.totalLikes || 0}
        icon={<FaHeart />}
        color="text-red-500"
      />
    </div>
  );
};

export default DashboardStats;