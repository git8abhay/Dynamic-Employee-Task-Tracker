import React from 'react';
import { Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import AdminDashboard from './AdminDashboard'; 
import EmployeeDashboard from './EmployeeDashboard';

// Loading Spinner Component  (funtry)
const LoadingSpinner = () => (
    <div className="min-h-screen flex items-center justify-center bg-black bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="text-center">
        <Clock className="animate-spin mx-auto mb-4 text-cyan-400" size={48} />
        <p className="text-cyan-200">Loading tasks...</p>
      </div>
    </div>
  );

const Dashboard = () => {
  const { user } = useAuth();
  const { loading } = useTasks();

  if (loading) {
    return <LoadingSpinner />;
  }

  // Role-based routing
  if (user?.role === 'admin') {
    return <AdminDashboard />;
  }  
  return <EmployeeDashboard />;
};

export default Dashboard;