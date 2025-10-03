import React, { useState } from 'react';
import { LogOut, Plus, Filter, SortAsc, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import TaskFormModal from '../components/TaskFormModal';
import ToastContainer from '../components/common/ToastContainer';

// Optional: A simple loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <Clock className="animate-spin mx-auto mb-4 text-blue-600" size={48} />
      <p className="text-gray-600">Loading tasks...</p>
    </div>
  </div>
);

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { tasks, addTask, updateTask, deleteTask, filterStatus, setFilterStatus, sortBy, setSortBy, loading } = useTasks();
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
    new: tasks.filter(t => t.status === 'New').length,
    active: tasks.filter(t => t.status === 'Active').length,
    completed: tasks.filter(t => t.status === 'Completed').length
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer /> {/* Render the Toast container here */}

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Task Tracker</h1>
            <p className="text-sm text-gray-600">
              Welcome, {user?.email} <span className="font-semibold">({isAdmin ? 'Admin' : 'Employee'})</span>
            </p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* ... (Your existing Stats JSX) */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 mb-1">Total Tasks</div>
            <div className="text-3xl font-bold text-gray-800">{stats.total}</div>
          </div>
          <div className="bg-blue-50 rounded-lg shadow p-4">
            <div className="text-sm text-blue-600 mb-1 flex items-center gap-1"><AlertCircle size={16} />New</div>
            <div className="text-3xl font-bold text-blue-700">{stats.new}</div>
          </div>
          <div className="bg-yellow-50 rounded-lg shadow p-4">
            <div className="text-sm text-yellow-600 mb-1 flex items-center gap-1"><Clock size={16} />Active</div>
            <div className="text-3xl font-bold text-yellow-700">{stats.active}</div>
          </div>
          <div className="bg-green-50 rounded-lg shadow p-4">
            <div className="text-sm text-green-600 mb-1 flex items-center gap-1"><CheckCircle size={16} />Completed</div>
            <div className="text-3xl font-bold text-green-700">{stats.completed}</div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Filter and Sort Controls */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-600" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                >
                  <option>All</option>
                  <option>New</option>
                  <option>Active</option>
                  <option>Completed</option>
                  <option>Failed</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <SortAsc size={18} className="text-gray-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                >
                  <option value="date">Sort by Date</option>
                  <option value="priority">Sort by Priority</option>
                </select>
              </div>
            </div>
            
            {/* New Task Button (Admin Only) */}
            {isAdmin && (
              <button
                onClick={() => {
                  setEditingTask(null);
                  setShowForm(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={18} />
                New Task
              </button>
            )}
          </div>
        </div>

        {/* Task Grid */}
        {tasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map(task => (
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
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No tasks found</h3>
            <p className="text-gray-500 mb-4">
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
                className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={18} />
                Create Task
              </button>
            )}
          </div>
        )}
      </main>

      {/* Form Modal */}
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