import React from 'react';
import { LayoutList, AlertCircle, Clock, CheckCircle, TrendingUp, Award } from 'lucide-react';

const StatsCards = ({ stats }) => {
  // Basic stats
  const basicStats = [
    { label: 'Total Tasks', count: stats.total, color: 'red', icon: LayoutList },
    { label: 'New Tasks', count: stats.new, color: 'blue', icon: AlertCircle },
    { label: 'Active Tasks', count: stats.active, color: 'yellow', icon: Clock },
    { label: 'Completed Tasks', count: stats.completed, color: 'green', icon: CheckCircle },
  ];

  const colorMap = {
    red: 'border-red-400 shadow-red-500/50 text-red-500',
    blue: 'border-blue-400 shadow-blue-400/50 text-blue-500',
    yellow: 'border-yellow-400 shadow-yellow-400/50 text-yellow-500',
    green: 'border-green-400 shadow-green-400/50 text-green-500',
    purple: 'border-purple-400 shadow-purple-400/50 text-purple-500',
    cyan: 'border-cyan-400 shadow-cyan-400/50 text-cyan-500',
  };

  return (
    <div className="mb-6">
      {/* Main Stats Row */}
      <div className="flex flex-wrap justify-center gap-6 mb-4">
        {basicStats.map(({ label, count, color, icon: Icon }, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center justify-center w-36 h-36 rounded-full bg-white/5 backdrop-blur-md border-4 transition-all duration-300 ${
              colorMap[color]
            } ${label === 'New Tasks' ? 'animate-pulse' : ''}`}
          >
            {Icon && <Icon size={28} className={`mb-2 ${colorMap[color].split(' ')[2]}`} />}
            <span className={`text-sm font-semibold ${colorMap[color].split(' ')[2].replace('500', '400')}`}>
              {label}
            </span>
            <span className="text-2xl font-bold text-cyan-100 mt-1">{count}</span>
          </div>
        ))}
      </div>

      {/* Additional Stats (if available) */}
      {(stats.completionRate !== undefined || stats.highPriorityPending !== undefined) && (
        <div className="flex flex-wrap justify-center gap-4">
          {stats.completionRate !== undefined && (
            <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-400/30 backdrop-blur-md">
              <TrendingUp size={24} className="text-yellow-400" />
              <div>
                <div className="text-xs text-orange-300 font-medium">Completion Rate</div>
                <div className="text-2xl font-bold text-white flex items-center gap-2">
                  {stats.completionRate}%
                  <Award size={20} className="text-yellow-400" />
                </div>
              </div>
            </div>
          )}
          
          {stats.highPriorityPending !== undefined && stats.highPriorityPending > 0 && (
            <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-red-600/20 border border-red-400/30 backdrop-blur-md">
              <AlertCircle size={24} className="text-red-400" />
              <div>
                <div className="text-xs text-red-300 font-medium">High Priority Pending</div>
                <div className="text-2xl font-bold text-white">
                  {stats.highPriorityPending}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StatsCards;