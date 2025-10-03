import React from 'react';
import { Plus, Filter, SortAsc, CheckSquare } from 'lucide-react';

const TaskControls = ({ 
  filterStatus, 
  setFilterStatus, 
  sortBy, 
  setSortBy, 
  isAdmin, 
  onAddTaskClick,
  // Bulk mode props
  bulkMode = false,
  onBulkModeToggle = null
}) => {
  return (
    <div className="backdrop-blur-md bg-white/10 border border-cyan-400/30 rounded-2xl shadow-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        
        {/* Filter and Sort */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-green-300" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-lg bg-white/10 border border-cyan-400 text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option>All</option>
              <option>New</option>
              <option>Active</option>
              <option>Completed</option>
              <option>Failed</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <SortAsc size={18} className="text-yellow-300" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg bg-white/10 border border-cyan-400 text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="date">Sort by Date</option>
              <option value="priority">Sort by Priority</option>
            </select>
          </div>
        </div>

        {/* Admin Actions */}
        {isAdmin && (
          <div className="flex gap-2">
            {/* Bulk Mode Toggle */}
            {onBulkModeToggle && (
              <button
                onClick={onBulkModeToggle}
                className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-all hover:scale-105 ${
                  bulkMode 
                    ? 'bg-orange-400 hover:bg-orange-400 shadow-orange-300/40' 
                    : 'bg-gray-600 hover:bg-gray-500 shadow-gray-300/40'
                }`}
              >
                <CheckSquare size={18} />
                {bulkMode ? 'Exit Bulk Mode' : 'Bulk Actions'}
              </button>
            )}
            
            <button
              onClick={onAddTaskClick}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-600 hover:bg-cyan-500 font-semibold transition-all hover:scale-105 hover:shadow-cyan-300/40"
            >
              <Plus size={18} />
              New Task
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskControls;