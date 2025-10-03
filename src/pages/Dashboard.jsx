import React, { useState } from 'react';
import {
  LogOut,
  Plus,
  Filter,
  SortAsc,
  AlertCircle,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import TaskFormModal from '../components/TaskFormModal';
import ToastContainer from '../components/common/ToastContainer';

// Loading Spinner
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-black bg-gradient-to-br from-black via-gray-900 to-black">
    <div className="text-center">
      <Clock className="animate-spin mx-auto mb-4 text-cyan-400" size={48} />
      <p className="text-cyan-200">Loading tasks...</p>
    </div>
  </div>
);

const Dashboard = () => {
  const { user, logout } = useAuth();
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
    loading,
  } = useTasks();

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const isAdmin = user?.role === 'admin';

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleSave = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
    handleCloseForm();
  };

  const stats = {
    total: tasks.length,
    new: tasks.filter((t) => t.status === 'New').length,
    active: tasks.filter((t) => t.status === 'Active').length,
    completed: tasks.filter((t) => t.status === 'Completed').length,
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen w-full bg-black bg-gradient-to-br from-black via-gray-900 to-black text-white relative">
      <ToastContainer />

      {/* Header */}
      <header className="backdrop-blur-md bg-white/10 border-b border-cyan-400/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-cyan-400">Dynamic EMS Task Tracker</h1>
            <p className="text-sm text-cyan-200">
              Welcome, {user?.email}{' '}
              <span className="font-semibold text-cyan-300">
                ({isAdmin ? 'Admin' : 'Employee'})
              </span>
            </p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 font-semibold transition-all hover:scale-105"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 overflow-y-auto scrollbar-hide" style={{ maxHeight: 'calc(100vh - 120px)' }}>

       {/* Statistics Section (Glassmorphism Circular Cards) */}
        <div className="flex flex-wrap justify-center gap-6 mt-6 mb-6">
        {[
        { label: 'Total Tasks', count: stats.total, color: 'cyan', icon: null },
        { label: 'New Tasks', count: stats.new, color: 'blue', icon: AlertCircle },
        { label: 'Active Tasks', count: stats.active, color: 'yellow', icon: Clock },
        { label: 'Completed Tasks', count: stats.completed, color: 'green', icon: CheckCircle },
        ].map(({ label, count, color, icon: Icon }, idx) => {
        const colorMap = {
        cyan: 'border-cyan-400 shadow-cyan-400/50',
        blue: 'border-blue-400 shadow-blue-400/50',
        yellow: 'border-yellow-400 shadow-yellow-400/50',
        green: 'border-green-400 shadow-green-400/50',
        };

        return (
        <div
        key={idx}
        className={`flex flex-col items-center justify-center w-36 h-36 rounded-full bg-white/5 backdrop-blur-md border-4 ${colorMap[color]} transition-all duration-300 ${
        label === 'New Tasks' ? 'animate-pulse' : ''
        }`}
        >
        {Icon && <Icon size={28} className={`mb-2 text-${color}-400`} />}
        <span className={`text-sm font-semibold text-${color}-300`}>{label}</span>
        <span className="text-2xl font-bold text-cyan-100 mt-1">{count}</span>
        </div>
        );
        })}
        </div>


        {/* Controls */}
        <div className="backdrop-blur-md bg-white/10 border border-cyan-400/30 rounded-2xl shadow-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Filter and Sort */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-cyan-300" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-white/10 border border-cyan-400 text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option>All</option>
                  <option>New</option>
                  <option>Active</option>
                  <option>Completed</option>
                  <option>Failed</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <SortAsc size={18} className="text-cyan-300" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-white/10 border border-cyan-400 text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="date">Sort by Date</option>
                  <option value="priority">Sort by Priority</option>
                </select>
              </div>
            </div>

            {/* Admin: Add Task */}
            {isAdmin && (
              <button
                onClick={() => {
                  setEditingTask(null);
                  setShowForm(true);
                }}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-600 hover:bg-cyan-500 font-semibold transition-all hover:scale-105 hover:shadow-cyan-300/40"
              >
                <Plus size={18} />
                New Task
              </button>
            )}
          </div>
        </div>

        {/* Tasks Grid */}
        {tasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={deleteTask}
                onStatusChange={updateTask}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        ) : (
          <div className="backdrop-blur-md bg-white/10 border border-cyan-400/30 rounded-2xl shadow-lg p-12 text-center">
            <AlertCircle
              size={48}
              className="mx-auto text-cyan-300 mb-4 animate-pulse"
            />
            <h3 className="text-xl font-semibold text-cyan-200 mb-2">
              No tasks found
            </h3>
            <p className="text-cyan-400 mb-4">
              {filterStatus === 'All'
                ? 'Get started by creating your first task!'
                : `No tasks with "${filterStatus}" status`}
            </p>
            {isAdmin && filterStatus === 'All' && (
              <button
                onClick={() => {
                  setEditingTask(null);
                  setShowForm(true);
                }}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-cyan-600 hover:bg-cyan-500 font-semibold transition-all hover:scale-105 hover:shadow-cyan-300/40"
              >
                <Plus size={18} />
                Create Task
              </button>
            )}
          </div>
        )}
      </main>

      {/* Task Form Modal */}
      {showForm && (
        <TaskFormModal
          task={editingTask}
          onSave={handleSave}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default Dashboard;
