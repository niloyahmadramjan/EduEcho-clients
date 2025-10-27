import React from 'react';
import { FaUser, FaNewspaper, FaComment } from 'react-icons/fa';

const RecentActivity = ({ stats }) => {
  const activities = [
    {
      icon: <FaUser className="text-blue-500" />,
      title: 'New Users',
      value: stats?.last24Hours?.newUsers || 0,
      description: 'Last 24 hours'
    },
    {
      icon: <FaNewspaper className="text-green-500" />,
      title: 'New Articles',
      value: stats?.last24Hours?.newArticles || 0,
      description: 'Last 24 hours'
    },
    {
      icon: <FaComment className="text-orange-500" />,
      title: 'New Comments',
      value: stats?.last24Hours?.newComments || 0,
      description: 'Last 24 hours'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {activities.map((activity, index) => (
        <div key={index} className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-primary">{activity.value}</h3>
                <p className="text-lg font-semibold">{activity.title}</p>
                <p className="text-sm text-base-content/70">{activity.description}</p>
              </div>
              <div className="text-3xl">
                {activity.icon}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;