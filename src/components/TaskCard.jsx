import React from "react";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Edit2,
  Trash2,
} from "lucide-react";

const TaskCard = ({ 
  task, 
  onEdit, 
  onDelete, 
  onStatusChange, 
  isAdmin,
  // Bulk selection props
  bulkMode = false,
  isSelected = false,
  onToggleSelect = null
}) => {
  const statusConfig = {
    New: {
      icon: AlertCircle,
      color: "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30",
      iconColor: "text-cyan-400",
    },
    Active: {
      icon: Clock,
      color: "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30",
      iconColor: "text-yellow-400",
    },
    Completed: {
      icon: CheckCircle,
      color: "bg-green-500/20 text-green-300 border border-green-400/30",
      iconColor: "text-green-400",
    },
    Failed: {
      icon: XCircle,
      color: "bg-red-500/20 text-red-300 border border-red-400/30",
      iconColor: "text-red-400",
    },
  };

  const config = statusConfig[task.status] || statusConfig.New;
  const StatusIcon = config.icon;

  return (
    <div
      className={`rounded-2xl p-5 
      bg-white/10 backdrop-blur-md border 
      ${isSelected ? 'border-orange-300 ring-2 ring-orange-300/50 shadow-lg shadow-purple-500/30' : 'border-cyan-400/20'}
      shadow-md hover:shadow-cyan-400/40 transition-all hover:scale-[1.02] 
      duration-300 ease-in-out flex flex-col justify-between`}
    >
      {/* Header with Checkbox (if bulk mode) + Title + Action Buttons */}
      <div className="flex justify-between items-start mb-4 gap-3">
        <div className="flex items-start gap-3 flex-1">
          {/* Bulk selection checkbox */}
          {bulkMode && onToggleSelect && (
            <div className="pt-1">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggleSelect(task.id)}
                className="w-5 h-5 rounded accent-orange-300 cursor-pointer"
              />
            </div>
          )}
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-cyan-200 mb-1">
              {task.title}
            </h3>
            <p className="text-sm text-cyan-100/80">{task.description}</p>
          </div>
        </div>

        {isAdmin && !bulkMode && (
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => onEdit(task)}
              className="p-2 text-cyan-300 hover:text-cyan-100 hover:bg-cyan-500/20 rounded-lg transition-all"
              title="Edit"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 text-red-400 hover:text-red-200 hover:bg-red-500/20 rounded-lg transition-all"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Status + Priority Tags */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${config.color} backdrop-blur-sm`}
        >
          <StatusIcon size={14} className={config.iconColor} />
          {task.status}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm
          ${
            task.priority === "High"
              ? "bg-red-500/20 text-red-300 border border-red-400/30"
              : task.priority === "Medium"
              ? "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30"
              : "bg-green-500/20 text-green-300 border border-green-400/30"
          }`}
        >
          {task.priority}
        </span>
      </div>

      {/* Meta Info */}
      <div className="text-xs text-cyan-100/70 space-y-1 mb-4">
        <p>
          <span className="font-medium text-cyan-200">Assigned:</span>{" "}
          {task.assignedTo}
        </p>
        <p>
          <span className="font-medium text-cyan-200">Due:</span>{" "}
          {new Date(task.dueDate).toLocaleDateString()}
        </p>
      </div>

      {/* Status Buttons - Hide in bulk mode */}
      {!bulkMode && (
        <div className="flex flex-wrap gap-2 mt-auto">
          {["New", "Active", "Completed", "Failed"].map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(task.id, { status })}
              disabled={task.status === status}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-all
                ${
                  task.status === status
                    ? "bg-cyan-600 text-white shadow-md cursor-default"
                    : "bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/30"
                }`}
            >
              {status}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskCard;