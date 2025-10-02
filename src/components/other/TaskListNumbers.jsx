import React from 'react';
import {
  ClipboardList,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';

const TaskListNumbers = ({ data }) => {
const { newTask, active, completed, failed } = data.taskCounts;
  const items = [
    {
      label: 'New Tasks',
      count: newTask,
      icon: ClipboardList,
      border: 'border-blue-400',
      pulse: true,
      text: 'text-blue-400'
    },
    {
      label: 'Completed Tasks',
      count: completed,
      icon: CheckCircle,
      border: 'border-green-400',
      text: 'text-green-400'
    },
    {
      label: 'Active Tasks',
      count: active,
      icon: Clock,
      border: 'border-yellow-400',
      text: 'text-yellow-400'
    },
    {
      label: 'Failed Tasks',
      count: failed,
      icon: XCircle,
      border: 'border-red-500',
      text: 'text-red-500'
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-8 mt-10 ">
      {items.map(({ label, count, icon: Icon, border, glow, pulse, text }, idx) => (
        <div key={idx} className="flex flex-col items-center group">
          <div
            className={`w-35 h-35 rounded-full flex flex-col items-center justify-center bg-white/5 backdrop-blur-md ${text} border-4 ${border} ${glow} transition-all duration-300 ${
              pulse ? 'animate-pulse border-[4px]' : ''
            }`}
          >
            <Icon size={30} className="mb-2" />
            <span className="text-m">{label}</span>
          </div>
          <span className="mt-3 text-2xl font-bold text-cyan-100">{count}</span>
        </div>
      ))}
    </div>
  );
};

export default TaskListNumbers;
