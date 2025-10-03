import React from 'react';
import { LayoutList, AlertCircle, Clock, CheckCircle } from 'lucide-react';

const StatsCards = ({ stats }) => {
  const statData = [
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
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 mt-6 mb-6">
      {statData.map(({ label, count, color, icon: Icon }, idx) => (
        <div
          key={idx}
          className={`flex flex-col items-center justify-center w-36 h-36 rounded-full bg-white/5 backdrop-blur-md border-4 transition-all duration-300 ${
            colorMap[color]
          } ${label === 'New Tasks' ? 'animate-pulse' : ''}`}
        >
          {Icon && <Icon size={28} className={`mb-2 ${colorMap[color].split(' ')[2]}`} />}
          <span className={`text-sm font-semibold ${colorMap[color].split(' ')[2].replace('500', '400')}`}>{label}</span>
          <span className="text-2xl font-bold text-cyan-100 mt-1">{count}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;