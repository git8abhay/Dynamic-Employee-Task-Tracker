import React, { useState } from "react";

const TaskFormModal = ({ task, onSave, onClose }) => {
  const [formData, setFormData] = useState(
    task || {
      title: "",
      description: "",
      status: "New",
      priority: "Medium",
      assignedTo: "",
      dueDate: new Date().toISOString().split("T")[0], // YYYY-MM-DD
    }
  );
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title required";
    if (!formData.description.trim())
      newErrors.description = "Description required";
    if (!formData.assignedTo.trim()) newErrors.assignedTo = "Email required";
    if (formData.assignedTo && !formData.assignedTo.includes("@")) {
      newErrors.assignedTo = "Valid email required";
    }
    if (!formData.dueDate) newErrors.dueDate = "Due date required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-40">
      <div className="bg-white/20 backdrop-blur-xl border border-cyan-300/40 
        rounded-2xl shadow-2xl p-6 w-full max-w-md max-h-screen overflow-y-auto">
        
        <h2 className="text-2xl font-bold text-cyan-600 mb-6 text-center">
          {task ? "Edit Task" : "Create New Task"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg bg-white/30 text-gray-900 
                border ${errors.title ? "border-red-500" : "border-cyan-300/40"} 
                focus:ring-2 focus:ring-cyan-500 focus:outline-none`}
              placeholder="Task title"
            />
            {errors.title && (
              <p className="text-red-400 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg bg-white/30 text-gray-900 
                border ${errors.description ? "border-red-500" : "border-cyan-300/40"} 
                focus:ring-2 focus:ring-cyan-500 focus:outline-none`}
              rows="3"
              placeholder="Task description"
            />
            {errors.description && (
              <p className="text-red-400 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          {/* Status + Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white/30 text-gray-900 
                  border border-cyan-300/40 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              >
                <option>New</option>
                <option>Active</option>
                <option>Completed</option>
                <option>Failed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white/30 text-gray-900 
                  border border-cyan-300/40 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>

          {/* Assigned To */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Assigned To *
            </label>
            <input
              type="email"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg bg-white/30 text-gray-900 
                border ${errors.assignedTo ? "border-red-500" : "border-cyan-300/40"} 
                focus:ring-2 focus:ring-cyan-500 focus:outline-none`}
              placeholder="user@company.com"
            />
            {errors.assignedTo && (
              <p className="text-red-400 text-xs mt-1">{errors.assignedTo}</p>
            )}
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Due Date *
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg bg-white/30 text-gray-900 
                border ${errors.dueDate ? "border-red-500" : "border-cyan-300/40"} 
                focus:ring-2 focus:ring-cyan-500 focus:outline-none`}
            />
            {errors.dueDate && (
              <p className="text-red-400 text-xs mt-1">{errors.dueDate}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white 
                py-2 rounded-lg shadow-md hover:shadow-cyan-400/40 hover:scale-[1.02] 
                transition-all font-medium"
            >
              {task ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200/70 text-gray-800 py-2 rounded-lg 
                hover:bg-gray-300 transition-all font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;
