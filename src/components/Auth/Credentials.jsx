import React, { useEffect, useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Credentials = () => {
  const [admin, setAdmin] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setAdmin(JSON.parse(localStorage.getItem('admin')) || []);
    setEmployees(JSON.parse(localStorage.getItem('employees')) || []);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-6 bg-black bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-6">
        🔐 Login Credentials
      </h1>
      {/* Admin */}
      <div className="border-3 border-cyan-500 rounded-xl p-4 w-full max-w-4xl mb-6 backdrop-blur-md bg-white/10 hover:scale-102 transition duration-300 hover:shadow-lg shadow-cyan-500/30">
        <h2 className="text-2xl font-bold mb-2 text-yellow-500 flex items-center gap-2">
          🏆 Admin
        </h2>
        {admin.map((a) => (
          <div key={a.id} className="space-y-1">
            <p className="flex items-center gap-2"><Mail size={18} /> Email: <span className="font-semibold">{a.email}</span></p>
            <p className="flex items-center gap-2"><Lock size={18} /> Password: <span className="font-semibold">{a.password}</span></p>
          </div>
        ))}
      </div>

      {/* Employees */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl">
        {employees.map((e) => (
          <div key={e.id} className="border-2 border-cyan-500 rounded-xl p-4 bg-white/5 hover:shadow-cyan-300/30 hover:scale-[1.01] transition">
            <h3 className="text-lg font-semibold text-cyan-300 flex items-center gap-1">
              <User size={18} /> {e.firstName}
            </h3>
            <p className="flex items-center gap-2 mt-1"><Mail size={16} /> Email: <span className="font-medium">{e.email}</span></p>
            <p className="flex items-center gap-2"><Lock size={16} /> Password: <span className="font-medium">{e.password}</span></p>
          </div>
        ))}
      </div>

      <Link
        to="/"
        className="mt-8 text-cyan-300 hover:underline text-sm flex items-center gap-1"
      >
        ← Back to Login
      </Link>
    </div>
  );
};

export default Credentials;
