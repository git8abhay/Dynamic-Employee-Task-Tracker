import React, { useMemo } from 'react';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import ToastContainer from '../components/common/ToastContainer';
import Header from '../components/Header';
import StatsCards from '../components/StatsCards';
import TaskControls from '../components/TaskControls';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const {
    tasks,
    updateTask, // Allow employee to update ONLY status
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
  } = useTasks();

  const employeeEmail = user?.email;

  // 1. Employee task filtering
  const employeeTasks = useMemo(() => {
    return tasks.filter(task => task.assignedTo === employeeEmail);
  }, [tasks, employeeEmail]);
  
  // 2. Statistics calculation
  const stats = useMemo(() => ({
    total: employeeTasks.length,
    new: employeeTasks.filter((t) => t.status === 'New').length,
    active: employeeTasks.filter((t) => t.status === 'Active').length,
    completed: employeeTasks.filter((t) => t.status === 'Completed').length,
  }), [employeeTasks]);
  
  // Note: TaskCard props: onEdit/onDelete ko null rakhenge ya AdminControls ko 'false' pass karenge
  
  return (
    <div className="min-h-screen w-full bg-black bg-gradient-to-br from-black via-gray-900 to-black text-white relative">
      <ToastContainer />
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-6 overflow-y-auto scrollbar-hide" style={{ maxHeight: 'calc(100vh - 80px)' }}>

        <StatsCards stats={stats} />

        {/* Task Controls (No "New Task" button) */}
        <TaskControls
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          sortBy={sortBy}
          setSortBy={setSortBy}
          isAdmin={false} // Employee cannot add tasks
          onAddTaskClick={() => {}} 
        />

        {/* Tasks Grid - Filtered for Employee */}
        {employeeTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {employeeTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={null} // Employee cannot edit details
                onDelete={null} // Employee cannot delete
                onStatusChange={updateTask} // Employee can only change status
                isAdmin={false} // Hide all admin controls in card
              />
            ))}
          </div>
        ) : (
          <div className="backdrop-blur-md bg-white/10 border border-cyan-400/30 rounded-2xl shadow-lg p-12 text-center">
            <AlertCircle size={48} className="mx-auto text-cyan-300 mb-4" />
            <h3 className="text-xl font-semibold text-cyan-200 mb-2">No tasks assigned</h3>
            <p className="text-cyan-400">
              {filterStatus === 'All'
                ? 'You have no active tasks assigned to you.'
                : `No tasks with "${filterStatus}" status assigned to you.`}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default EmployeeDashboard;