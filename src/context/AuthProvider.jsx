import React, { createContext, useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setLocalStorage();
    const { employees } = getLocalStorage();
    setUserData(employees);
  }, []);

  // 🔧 Accept Task
  const acceptTask = (empId, taskIndex) => {
  const updatedData = JSON.parse(JSON.stringify(userData)); // deep copy
  const emp = updatedData.find((e) => e.id === empId);

  const task = emp.tasks[taskIndex];
  if (task.newTask && !task.active) {
    task.newTask = false;
    task.active = true;
    emp.taskCounts.newTask--;
    emp.taskCounts.active++;
  }

  updateAndSync(updatedData);
};



  // ✅ Complete Task
  const completeTask = (empId, taskIndex) => {
    const updatedData = JSON.parse(JSON.stringify(userData)); // deep clone

    const emp = updatedData.find((e) => e.id === empId);

    const task = emp.tasks[taskIndex];
    if (task.active && !task.completed) {
      task.active = false;
      task.completed = true;
      emp.taskCounts.active--;
      emp.taskCounts.completed++;
    }

    updateAndSync(updatedData);
  };

  // ❌ Fail Task
  const failTask = (empId, taskIndex) => {
    const updatedData = JSON.parse(JSON.stringify(userData)); // deep clone

    const emp = updatedData.find((e) => e.id === empId);

    const task = emp.tasks[taskIndex];
    if (task.active && !task.failed) {
      task.active = false;
      task.failed = true;
      emp.taskCounts.active--;
      emp.taskCounts.failed++;
    }

    updateAndSync(updatedData);
  };

  // 🔄 Update state + localStorage
  const updateAndSync = (updated) => {
    setUserData(updated);
    localStorage.setItem('employees', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{ userData, setUserData, acceptTask, completeTask, failTask }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
