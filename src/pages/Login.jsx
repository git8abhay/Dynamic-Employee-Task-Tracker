import React, { useState } from 'react';
import { AlertCircle, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill all fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      if (isRegister) {
        await register(email, password);
      } else {
        await login(email, password);
      }
    } catch (err) {
      console.error('Auth error:', err);
      if (
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/invalid-credential'
      ) {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Email already registered');
      } else {
        setError(err.message || 'Authentication failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="w-[90%] max-w-md backdrop-blur-md bg-white/10 border border-cyan-400/40 p-8 rounded-2xl shadow-2xl hover:shadow-cyan-500/40 transition-all duration-500">
        {/* Title */}
        <h1 className="text-white text-2xl font-bold text-center mb-6">
          <LogIn className="inline mr-2" />
          Dynamic EMS Task Tracker
        </h1>

        {/* Toggle Buttons */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => { setIsRegister(false); setError(''); }}
            className={`flex-1 py-2 rounded-md font-semibold transition-all duration-300 ${
              !isRegister 
                ? 'bg-cyan-600 text-white shadow-cyan-400/40 hover:bg-cyan-500 hover:scale-105' 
                : 'bg-white/10 text-cyan-200 border border-cyan-400 hover:bg-cyan-500/20'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => { setIsRegister(true); setError(''); }}
            className={`flex-1 py-2 rounded-md font-semibold transition-all duration-300 ${
              isRegister 
                ? 'bg-cyan-600 text-white shadow-cyan-400/40 hover:bg-cyan-500 hover:scale-105' 
                : 'bg-white/10 text-cyan-200 border border-cyan-400 hover:bg-cyan-500/20'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="px-5 py-3 rounded-md bg-white/10 text-white border border-cyan-400 placeholder:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300"
          />
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="px-5 py-3 rounded-md bg-white/10 text-white border border-cyan-400 placeholder:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300"
          />

          {/* Error */}
          {error && (
            <div className="text-red-400 text-sm flex items-center gap-2">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="text-white bg-cyan-600 hover:bg-cyan-500 font-semibold py-2 rounded-full transition-all duration-300 hover:shadow-cyan-300/40 hover:scale-105 mt-2 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Please wait...' : (isRegister ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        {/* Tip */}
        <div className="mt-5 text-sm text-cyan-200 text-center space-y-1">
          <p className="font-semibold">💡 Tip:</p>
          <p>Use <strong>admin@me.com</strong> for admin access</p>
          <p>Any other email will be employee role</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
