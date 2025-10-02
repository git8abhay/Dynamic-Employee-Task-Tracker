import React from 'react';
import { XCircle } from 'lucide-react';

const FailedTask = ({ data }) => {
  return (
    <div className="flex-shrink-0 w-[350px] h-[250px] p-5 bg-white/10 backdrop-blur-md rounded-xl border border-red-400/80 shadow-md hover:shadow-cyan-500/30 transition-all duration-300 text-white">
      <div className="flex justify-between items-center">
        <span className="text-m bg-red-500/20 px-3 py-1 rounded-full text-red-300">
          {data.category}
        </span>
        <span className="text-s text-gray-400">{data.taskDate}</span>
      </div>

      <h2 className="mt-4 text-2xl font-semibold line-clamp-1">{data.taskTitle}</h2>
      <p className="mt-2 text-m text-cyan-100 line-clamp-3">{data.taskDescription}</p>

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-1 text-red-400">
          <XCircle size={22} />
          <span className="text-s font-medium">Failed</span>
        </div>
        <div className="text-red-400 text-s font-medium">Failed</div>
      </div>
    </div>
  );
};

export default FailedTask;
