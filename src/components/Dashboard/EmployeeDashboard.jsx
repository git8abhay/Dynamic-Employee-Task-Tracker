import React, { useContext, useEffect, useState } from 'react';
import Header from '../other/Header';
import TaskListNumbers from '../other/TaskListNumbers';
import TaskList from '../TaskList/TaskList';
import Footer from '../other/Footer';
import { AuthContext } from '../../context/AuthProvider';

const EmployeeDashboard = ({ changeUser }) => {
  const { userData } = useContext(AuthContext);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedIn?.role === 'employee') {
      const updatedEmployee = userData?.find(emp => emp.id === loggedIn.data.id);
      setEmployee(updatedEmployee);
    }
  }, [userData]); // Runs every time userData updates

  if (!employee) {
    return <p className="text-white text-center">Loading employee data...</p>;
  }

  return (
    <div className="scrollbar-hide overflow-y-auto h-full w-full bg-black bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <Header changeUser={changeUser} data={employee} />
      <main>
        <TaskListNumbers data={employee} />
        <TaskList data={employee} />
      </main>
      <Footer />
    </div>
  );
};

export default EmployeeDashboard;
