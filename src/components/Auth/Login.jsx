import React, { useState } from 'react';
import { LogIn,User, Lock, Mail} from "lucide-react";
import { Link } from 'react-router-dom';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="w-[90%] h-[60%] max-w-md backdrop-blur-md bg-white/10 border-3 border-cyan-400/40 p-10 rounded-2xl shadow-2xl hover:shadow-cyan-500/40 transition-all duration-500">
        <h1 className="text-white text-3xl font-bold text-center mb-10">
          <LogIn className="inline mr-2" />
           Login</h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Enter your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-5 py-3 rounded-md bg-white/10 text-white border border-cyan-400 placeholder:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-5 py-3 rounded-md bg-white/10 text-white border border-cyan-400 placeholder:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300"
          />

          <button
            type="submit"
            className="text-white bg-cyan-600 hover:bg-cyan-500 font-semibold py-2 rounded-full transition-all duration-300 hover:shadow-cyan-300/40 hover:scale-105 mt-3"
          >
            Log in
          </button>

          <p className="text-center text-sm text-white">
           Don't have Login credentials? <Link to="/credentials" className="!text-cyan-200 hover:underline cursor-pointer">click here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
