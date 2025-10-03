import React, { useMemo, useState } from 'react';
import { AlertCircle, Search, X, TrendingUp, Award, Clock } from 'lucide-react';
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
    updateTask,
  } = useTasks();

  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  
  //  Search functionality
  const [searchQuery, setSearchQuery] = useState('');

  const employeeEmail = user?.email;

  // Filter tasks for current employee
  const employeeTasks = useMemo(() => {
    return tasks.filter(task => task.assignedTo === employeeEmail);
  }, [tasks, employeeEmail]);

  // Search and filter logic
  const filteredTasks = useMemo(() => {
    let result = [...employeeTasks];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(task =>
        task.title?.toLowerCase().includes(query) ||
        task.priority?.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (filterStatus !== 'All') {
      result = result.filter(task => task.status === filterStatus);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
      }
      return new Date(b.createdAt || b.dueDate) - new Date(a.createdAt || a.dueDate);
    });

    return result;
  }, [employeeTasks, searchQuery, filterStatus, sortBy]);
  
  // Enhanced statistics
  const stats = useMemo(() => {
    const completed = employeeTasks.filter(t => t.status === 'Completed');
    const active = employeeTasks.filter(t => t.status === 'Active');
    const highPriorityPending = employeeTasks.filter(
      t => t.priority === 'High' && t.status !== 'Completed' && t.status !== 'Failed'
    );
    
    return {
      total: employeeTasks.length,
      new: employeeTasks.filter(t => t.status === 'New').length,
      active: active.length,
      completed: completed.length,
      completionRate: employeeTasks.length > 0 
        ? Math.round((completed.length / employeeTasks.length) * 100) 
        : 0,
      highPriorityPending: highPriorityPending.length,
    };
  }, [employeeTasks]);
  
  return (
    <div className="min-h-screen w-full bg-black bg-gradient-to-br from-black via-gray-900 to-black text-white relative">
      <ToastContainer />
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-6 overflow-y-auto scrollbar-hide" style={{ maxHeight: 'calc(100vh - 80px)' }}>

        <StatsCards stats={stats} />

        {/* Enhanced Summary Card */}
        <div className="backdrop-blur-md bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-cyan-400/30 rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-orange-300 mb-2 flex items-center gap-2">
                <TrendingUp size={24} className="text-orange-300" />
                Your Performance Summary
              </h3>
              <p className="text-gray-100/80">
                Track your progress and stay on top of your tasks
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-300 mb-1">
                  {stats.completionRate}%
                </div>
                <div className="text-sm text-orange-300 flex items-center gap-1">
                  <Award size={16} />
                  Completion Rate
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*Search Bar */}
        <div className="backdrop-blur-md bg-white/10 border border-gray-400/30 rounded-2xl shadow-lg p-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Search size={20} className="text-white" />
                    <input
                      type="text"
                      placeholder="Search tasks by title, priority, or description..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent border-none text-white placeholder-gray-300/50 focus:outline-none"
                    />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={18} className="text-cyan-400" />
              </button>
            )}
          </div>
        </div>

        {/* Task Controls (No "New Task" button) */}
        <TaskControls
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          sortBy={sortBy}
          setSortBy={setSortBy}
          isAdmin={false}
          onAddTaskClick={() => {}} 
        />

        {/* Tasks Grid - Filtered for Employee */}
        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map((task) => (
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
            <h3 className="text-xl font-semibold text-cyan-200 mb-2">No tasks found</h3>
            <p className="text-cyan-400">
              {searchQuery 
                ? 'Try adjusting your search query or filters'
                : filterStatus === 'All'
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