import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <header className="backdrop-blur-md bg-white/10 border-b border-cyan-400/30 shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold text-cyan-400">Dynamic EMS Task Tracker</h1>
          <p className="text-sm text-yellow-300">
            Welcome, {user?.email}{' '}
            <span className="font-semibold text-red-500">
              ({isAdmin ? 'Admin' : 'Employee'})
            </span>
          </p>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 font-semibold transition-all hover:scale-105"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;