import React from 'react';
import { useTasks } from '../../context/TaskContext';
import { X } from 'lucide-react';

const ToastContainer = () => {
  const { toasts } = useTasks();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2 w-full max-w-md px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            backdrop-blur-md rounded-2xl shadow-lg p-4 flex items-center justify-between text-white
            transition-opacity duration-300 ease-out
            ${
              toast.type === 'success'
                ? 'bg-green-500/90 border border-green-400/40'
                : toast.type === 'error'
                ? 'bg-red-500/90 border border-red-400/40'
                : 'bg-cyan-500/90 border border-cyan-400/40'
            }
          `}
        >
          <p className="text-sm font-medium">{toast.message}</p>
          <button
            className="ml-4 text-white hover:text-gray-200"
            onClick={() => toast.onClose && toast.onClose(toast.id)}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
