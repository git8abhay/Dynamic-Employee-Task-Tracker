import React from "react";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Edit2,
  Trash2,
} from "lucide-react";

const TaskCard = ({ task, onEdit, onDelete, onStatusChange, isAdmin }) => {
  const statusConfig = {
    New: {
      icon: AlertCircle,
      color: "bg-blue-200/30 text-blue-700 border border-blue-300/40 backdrop-blur-md",
      iconColor: "text-blue-500",
    },
    Active: {
      icon: Clock,
      color: "bg-yellow-200/30 text-yellow-700 border border-yellow-300/40 backdrop-blur-md",
      iconColor: "text-yellow-500",
    },
    Completed: {
      icon: CheckCircle,
      color: "bg-green-200/30 text-green-700 border border-green-300/40 backdrop-blur-md",
      iconColor: "text-green-500",
    },
    Failed: {
      icon: XCircle,
      color: "bg-red-200/30 text-red-700 border border-red-300/40 backdrop-blur-md",
      iconColor: "text-red-500",
    },
  };

  const priorityColors = {
    High: "border-red-500",
    Medium: "border-yellow-500",
    Low: "border-green-500",
  };

  const config = statusConfig[task.status] || statusConfig.New;
  const StatusIcon = config.icon;

  return (
    <div
      className={`rounded-2xl shadow-lg p-5 border-l-4 ${priorityColors[task.priority]} 
      bg-white/30 backdrop-blur-xl transition-all hover:shadow-2xl hover:scale-[1.01] 
      duration-300 ease-in-out`}
    >
      {/* Header with Title + Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {task.title}
          </h3>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>

        {isAdmin && (
          <div className="flex gap-2">
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
          </div>
        )}
      </div>

      {/* Status + Priority Tags */}
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${config.color}`}
        >
          <StatusIcon size={14} className={config.iconColor} />
          {task.status}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            task.priority === "High"
              ? "bg-red-200/40 text-red-700 border border-red-300/40"
              : task.priority === "Medium"
              ? "bg-yellow-200/40 text-yellow-700 border border-yellow-300/40"
              : "bg-green-200/40 text-green-700 border border-green-300/40"
          } backdrop-blur-md`}
        >
          {task.priority}
        </span>
      </div>

      {/* Meta Info */}
      <div className="text-xs text-gray-500 space-y-1 mb-4">
        <p>
          <span className="font-medium text-gray-700">Assigned:</span>{" "}
          {task.assignedTo}
        </p>
        <p>
          <span className="font-medium text-gray-700">Due:</span>{" "}
          {new Date(task.dueDate).toLocaleDateString()}
        </p>
      </div>

      {/* Status Buttons */}
      <div className="flex flex-wrap gap-2">
        {["New", "Active", "Completed", "Failed"].map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(task.id, { status })}
            disabled={task.status === status}
            className={`px-3 py-1 text-xs rounded-lg font-medium transition-all
              ${
                task.status === status
                  ? "bg-gray-800 text-white shadow cursor-default"
                  : "bg-gray-100/60 text-gray-700 hover:bg-gray-200"
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
