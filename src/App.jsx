import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Login from './components/Auth/Login';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import Credentials from './components/Auth/Credentials'; 
import { AuthContext } from './context/AuthProvider';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [adminInfo, setAdminInfo] = useState(null);
  const { userData } = useContext(AuthContext);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed.role);

      if (parsed.role === 'employee') {
        setLoggedInUserId(parsed.data.id);
      } else if (parsed.role === 'admin') {
        setAdminInfo(parsed.data);
      }
    }
  }, []);

  // Login handler
  const handleLogin = (email, password) => {
    if (email === 'admin@me.com' && password === '123') {
      const adminData = {
        id: 0,
        email: 'admin@me.com',
        name: 'Admin',
      };
      setUser('admin');
      setAdminInfo(adminData);
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin', data: adminData }));
    } else if (userData) {
      const emp = userData.find((e) => e.email === email && e.password === password);
      if (emp) {
        setUser('employee');
        setLoggedInUserId(emp.id);
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: emp }));
      } else {
        alert('Invalid Credentials');
      }
    }
  };

  const currentEmployee = userData?.find((e) => e.id === loggedInUserId);

  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        {/* Credentials page for login info */}
        <Route path="/credentials" element={<Credentials />} />

        {/* Login and dashboards handled via logic */}
        <Route
          path="/"
          element={
            !user ? (
              <Login handleLogin={handleLogin} />
            ) : user === 'admin' && adminInfo ? (
              <AdminDashboard changeUser={setUser} data={adminInfo} />
            ) : user === 'employee' && currentEmployee ? (
              <EmployeeDashboard changeUser={setUser} data={currentEmployee} />
            ) : null
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
