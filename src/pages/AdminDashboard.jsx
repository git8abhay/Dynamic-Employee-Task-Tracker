import React, { useState, useMemo } from 'react';
import { AlertCircle, Plus, Search, CheckSquare, X } from 'lucide-react';
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
  } = useTasks();

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  
  // Search functionality
  const [searchQuery, setSearchQuery] = useState('');
  
  // Bulk actions
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState(new Set());

  const isAdmin = user?.role === 'admin';

  // Search and filter tasks
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(task =>
        task.title?.toLowerCase().includes(query) ||
        task.assignedTo?.toLowerCase().includes(query) ||
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
  }, [tasks, searchQuery, filterStatus, sortBy]);

  // Stats calculation (use ALL tasks, not filtered)
  const stats = useMemo(() => ({
    total: tasks.length,
    new: tasks.filter((t) => t.status === 'New').length,
    active: tasks.filter((t) => t.status === 'Active').length,
    completed: tasks.filter((t) => t.status === 'Completed').length,
  }), [tasks]);

  // Handlers
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

  // Bulk action handlers
  const toggleTaskSelection = (taskId) => {
    const newSelected = new Set(selectedTasks);
    if (newSelected.has(taskId)) {
      newSelected.delete(taskId);
    } else {
      newSelected.add(taskId);
    }
    setSelectedTasks(newSelected);
  };

  const selectAllVisible = () => {
    if (selectedTasks.size === filteredTasks.length && filteredTasks.length > 0) {
      setSelectedTasks(new Set());
    } else {
      setSelectedTasks(new Set(filteredTasks.map(t => t.id)));
    }
  };

  const bulkUpdateStatus = (newStatus) => {
    if (selectedTasks.size === 0) return;
    
    selectedTasks.forEach(taskId => {
      updateTask(taskId, { status: newStatus });
    });
    
    setSelectedTasks(new Set());
    setBulkMode(false);
  };

  const clearBulkMode = () => {
    setSelectedTasks(new Set());
    setBulkMode(false);
  };

  return (
    <div className="min-h-screen w-full bg-black bg-gradient-to-br from-black via-gray-900 to-black text-white relative">
      <ToastContainer />
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6 overflow-y-auto scrollbar-hide" style={{ maxHeight: 'calc(100vh - 80px)' }}>

        <StatsCards stats={stats} />

        {/* Search Bar */}
        <div className="backdrop-blur-md bg-white/10 border border-gray-400/30 rounded-2xl shadow-lg p-4 mb-4">
          <div className="flex items-center gap-2">
            <Search size={20} className="text-white" />
            <input
              type="text"
              placeholder="Search tasks by title, assigned to, priority, or description..."
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

        {/* Task Controls */}
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
          // Bulk mode toggle
          bulkMode={bulkMode}
          onBulkModeToggle={() => {
            setBulkMode(!bulkMode);
            if (bulkMode) setSelectedTasks(new Set());
          }}
        />

        {/*Bulk Actions Bar */}
        {bulkMode && (
          <div className="backdrop-blur-md bg-cyan-300/20 border border-orange-100/50 rounded-2xl shadow-lg p-4 mb-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-orange-400 font-medium">
                  {selectedTasks.size} task(s) selected
                </span>
                <button
                  onClick={selectAllVisible}
                  className="text-cyan-500 hover:text-cyan-300 text-sm underline"
                >
                  {selectedTasks.size === filteredTasks.length && filteredTasks.length > 0
                    ? 'Deselect All'
                    : 'Select All Visible'}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => bulkUpdateStatus('New')}
                  disabled={selectedTasks.size === 0}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium"
                >
                  Set New
                </button>
                <button
                  onClick={() => bulkUpdateStatus('Active')}
                  disabled={selectedTasks.size === 0}
                  className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium"
                >
                  Set Active
                </button>
                <button
                  onClick={() => bulkUpdateStatus('Completed')}
                  disabled={selectedTasks.size === 0}
                  className="px-4 py-2 rounded-lg bg-green-700 hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium"
                >
                  Set Completed
                </button>
                <button
                  onClick={clearBulkMode}
                  className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition-all text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tasks Grid */}
        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={deleteTask}
                onStatusChange={updateTask}
                isAdmin={isAdmin}
                // Bulk selection props
                bulkMode={bulkMode}
                isSelected={selectedTasks.has(task.id)}
                onToggleSelect={toggleTaskSelection}
              />
            ))}
          </div>
        ) : (
          <div className="backdrop-blur-md bg-white/10 border border-cyan-400/30 rounded-2xl shadow-lg p-12 text-center">
            <AlertCircle size={48} className="mx-auto text-cyan-300 mb-4 animate-pulse" />
            <h3 className="text-xl font-semibold text-cyan-200 mb-2">No tasks found</h3>
            <p className="text-cyan-400 mb-4">
              {searchQuery 
                ? 'Try adjusting your search query or filters'
                : filterStatus === 'All'
                ? 'Get started by creating your first task!'
                : `No tasks with "${filterStatus}" status`}
            </p>
            {isAdmin && filterStatus === 'All' && !searchQuery && (
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