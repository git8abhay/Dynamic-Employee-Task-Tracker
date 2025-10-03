import React from 'react';
import { useTasks } from '../../context/TaskContext';

const ToastContainer = () => {
  const { toasts } = useTasks();
  
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          // Your existing toast styling
          className={`px-4 py-3 rounded-lg shadow-lg text-white transition-opacity duration-300 ease-out ${
            toast.type === 'success' ? 'bg-green-500' :
            toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;