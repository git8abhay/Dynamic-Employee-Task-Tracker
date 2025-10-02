
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import {
  ClipboardList,
  Clock,
  CheckCircle,
  XCircle,
  User
} from 'lucide-react';

const AllTask = () => {
  const {userData} = useContext(AuthContext);
  if (!userData || !Array.isArray(userData)) {
    return <p className="text-white text-center">Loading employee data...</p>;
  }

  return ( 
    <div className="m-6 pb-6">
      <h2 className="text-3xl font-bold text-white mt-12 mb-6 text-center">Team Task Overview</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {userData.map((emp, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center gap-4 bg-white/10 backdrop-blur-md border-2 border-cyan-400/40 rounded-2xl shadow-lg p-6 text-white hover:shadow-cyan-500/40 transition-all duration-500 "
          >
            {/* Avatar */}
            <div className="bg-cyan-500/20 p-4 rounded-full">
              <User size={36} />
            </div>

            {/* Name */}
            <h3 className="text-xl font-semibold">{emp.firstName}</h3>

            {/* Task stats */}
            <div className="flex flex-col gap-2 w-full mt-2 text-sm">
              <div className="flex justify-between items-center bg-white/5 px-3 py-2 rounded-md hover:scale-105 transition-all duration-300 hover:border-2 border-blue-500">
                <span className="flex items-center gap-2 !text-blue-300">
                  <ClipboardList size={18} /> New Tasks
                </span>
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full animate-pulse ">
                  {emp.taskCounts.newTask}
                </span>
              </div>

              <div className="flex justify-between items-center bg-white/5 px-3 py-2 rounded-md hover:scale-105 transition-all duration-300  hover:border-2 border-yellow-500">
                <span className="flex items-center gap-2 !text-yellow-400">
                  <Clock size={18} /> Active Tasks
                </span>
                <span className="bg-yellow-400 text-white text-xs px-2 py-1 rounded-full">
                  {emp.taskCounts.active}
                </span>
              </div>

              <div className="flex justify-between items-center bg-white/5 px-3 py-2 rounded-md hover:scale-105 transition-all duration-300  hover:border-2 border-green-500">
                <span className="flex items-center gap-2 !text-green-300">
                  <CheckCircle size={18} /> Completed
                </span>
                <span className="bg-green-400 text-white text-xs px-2 py-1 rounded-full">
                  {emp.taskCounts.completed}
                </span>
              </div>

              <div className="flex justify-between items-center bg-white/5 px-3 py-2 rounded-md hover:scale-105 transition-all duration-300  hover:border-2 border-red-500">
                <span className="flex items-center gap-2 !text-red-400">
                  <XCircle size={18} /> Failed
                </span>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {emp.taskCounts.failed}
                </span>
              </div>
            </div>

            {/* Optional CTA */}
            <button className="mt-4 text-sm !text-cyan-300 hover:underline hover:text-cyan-100 transition cursor-pointer">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTask;
