import React, { useState, useMemo } from 'react';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import TaskFormModal from '../components/TaskFormModal';
import ToastContainer from '../components/common/ToastContainer';
import Header from '../components/Header';
import StatsCards from '../components/StatsCards';
import TaskControls from '../components/TaskControls';

const AdminDashboard = () => {
  const { user } = useAuth();
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
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
  
  // Stats calculation
  const stats = useMemo(() => ({
    total: tasks.length,
    new: tasks.filter((t) => t.status === 'New').length,
    active: tasks.filter((t) => t.status === 'Active').length,
    completed: tasks.filter((t) => t.status === 'Completed').length,
  }), [tasks]);

  return (
    <div className="min-h-screen w-full bg-black bg-gradient-to-br from-black via-gray-900 to-black text-white relative">
      <ToastContainer />
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6 overflow-y-auto scrollbar-hide" style={{ maxHeight: 'calc(100vh - 80px)' }}>

        <StatsCards stats={stats} />

        <TaskControls
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          sortBy={sortBy}
          setSortBy={setSortBy}
          isAdmin={isAdmin}
          onAddTaskClick={() => {
            setEditingTask(null);
            setShowForm(true);
          }}
        />

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
            <AlertCircle size={48} className="mx-auto text-cyan-300 mb-4 animate-pulse" />
            <h3 className="text-xl font-semibold text-cyan-200 mb-2">No tasks found</h3>
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

export default AdminDashboard;