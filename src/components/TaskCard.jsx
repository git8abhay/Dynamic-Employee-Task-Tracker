import React from 'react';
import { AlertCircle, CheckCircle, Clock, XCircle, Edit2, Trash2 } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange, isAdmin }) => {
  const statusConfig = {
    New: { icon: AlertCircle, color: 'bg-blue-100 text-blue-700', iconColor: 'text-blue-500' },
    Active: { icon: Clock, color: 'bg-yellow-100 text-yellow-700', iconColor: 'text-yellow-500' },
    Completed: { icon: CheckCircle, color: 'bg-green-100 text-green-700', iconColor: 'text-green-500' },
    Failed: { icon: XCircle, color: 'bg-red-100 text-red-700', iconColor: 'text-red-500' }
  };

  const priorityColors = {
    High: 'border-red-500',
    Medium: 'border-yellow-500',
    Low: 'border-green-500'
  };

  const config = statusConfig[task.status] || statusConfig.New;
  const StatusIcon = config.icon;

  return (
    <div className={`bg-white rounded-lg shadow-md p-5 border-l-4 ${priorityColors[task.priority]} hover:shadow-lg transition-shadow`}>
      {/* ... (Rest of your existing TaskCard JSX) */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{task.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <>
              <button
                onClick={() => onEdit(task)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color} flex items-center gap-1`}>
          <StatusIcon size={14} className={config.iconColor} />
          {task.status}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          task.priority === 'High' ? 'bg-red-100 text-red-700' :
          task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
          'bg-green-100 text-green-700'
        }`}>
          {task.priority}
        </span>
      </div>

      <div className="text-xs text-gray-500 space-y-1 mb-3">
        <p>Assigned: {task.assignedTo}</p>
        <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {['New', 'Active', 'Completed', 'Failed'].map(status => (
          <button
            key={status}
            onClick={() => onStatusChange(task.id, { status })}
            disabled={task.status === status}
            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
              task.status === status
                ? 'bg-gray-800 text-white cursor-default'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;