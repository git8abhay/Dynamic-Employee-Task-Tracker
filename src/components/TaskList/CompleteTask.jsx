import React from 'react';
import { CheckCircle } from 'lucide-react';

const CompleteTask = ({ data }) => {
  return (
    <div className="flex-shrink-0 w-[350px] h-[250px] p-5 bg-white/10 backdrop-blur-md rounded-xl border border-green-400/80 shadow-md hover:shadow-cyan-500/30 transition-all duration-300 text-white">
      <div className="flex justify-between items-center">
        <span className="text-m bg-green-500/20 px-3 py-1 rounded-full text-green-300">
          {data.category}
        </span>
        <span className="text-s text-gray-400">{data.taskDate}</span>
      </div>

      <h2 className="mt-4 text-2xl font-semibold line-clamp-1">{data.taskTitle}</h2>
      <p className="mt-2 text-m text-cyan-100 line-clamp-3">{data.taskDescription}</p>

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-1 text-green-400">
          <CheckCircle size={22} />
          <span className="text-s font-semibold">Done</span>
        </div>
        <div className="text-green-400 text-s font-medium">Completed</div>
      </div>
    </div>
  );
};

export default CompleteTask;
