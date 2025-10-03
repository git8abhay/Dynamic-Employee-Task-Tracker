import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// This component handles conditional rendering based on authentication state
function AppContent() {
  const { user, loading } = useAuth();
  
  // AuthProvider handles the initial loading, so this should not fire often
  if (loading) {
     return <div className="min-h-screen flex items-center justify-center text-gray-700">Initializing...</div>;
  }
  
  // Show Dashboard if user is logged in, otherwise show Login
  return user ? <Dashboard /> : <Login />;
}

// Main App component wrapping everything with necessary Context Providers
function App() {
  return (
    <AuthProvider>
      {/* TaskProvider is only needed if user is logged in, but wrapping here is fine too */}
      <TaskProvider>
        <AppContent />
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;