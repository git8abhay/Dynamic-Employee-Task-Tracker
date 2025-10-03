import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { subscribeToTasks, createTask, updateTaskData, deleteTaskData } from '../api/tasks';

const TaskContext = createContext();

// Custom hook for easy access
export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [toasts, setToasts] = useState([]); 
  const [loading, setLoading] = useState(true);

  // Toast logic (Memoized)
  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  // Real-time listener
  useEffect(() => {
    const unsubscribe = subscribeToTasks(
      (tasksData) => {
        setTasks(tasksData);
        setLoading(false);
      }, 
      (error) => {
        console.error('Error fetching tasks:', error);
        showToast('Failed to load tasks', 'error');
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [showToast]);

  // CRUD Operations using API functions
  const addTask = async (task) => {
    try {
      await createTask(task);
      showToast('Task created successfully!', 'success');
    } catch (error) {
      showToast('Failed to create task', 'error');
    }
  };

  const updateTask = async (id, updates) => {
    try {
      await updateTaskData(id, updates);
      showToast('Task updated successfully!', 'success');
    } catch (error) {
      showToast('Failed to update task', 'error');
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskData(id);
      showToast('Task deleted!', 'success');
    } catch (error) {
      showToast('Failed to delete task', 'error');
    }
  };

  // Filter and Sort Logic
  const getFilteredTasks = () => {
    let filtered = filterStatus === 'All' ? tasks : tasks.filter(t => t.status === filterStatus);
    
    return filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'priority') {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    });
  };

  const value = {
    tasks: getFilteredTasks(), // Provide filtered tasks
    addTask,
    updateTask,
    deleteTask,
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
    toasts, // Toasts are provided here for the ToastContainer
    loading
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};