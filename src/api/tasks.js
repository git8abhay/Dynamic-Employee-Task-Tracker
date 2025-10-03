// src/api/tasks.js

import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase'; // Assuming firebase.js is in src/

const TASKS_COLLECTION = 'tasks';
const tasksCollection = collection(db, TASKS_COLLECTION);

/**
 * Real-time listener for tasks data from Firestore.
 * @param {function} onData - Callback function for data updates.
 * @param {function} onError - Callback function for errors.
 * @returns {function} Unsubscribe function.
 */
export const subscribeToTasks = (onData, onError) => {
  const q = query(tasksCollection, orderBy('createdAt', 'desc'));
  
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const tasksData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Handle Date conversion from Firebase Timestamp
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      dueDate: doc.data().dueDate || new Date().toISOString().split('T')[0]
    }));
    onData(tasksData);
  }, onError);

  return unsubscribe;
};

/**
 * Adds a new task to Firestore.
 * @param {object} task - The task data.
 */
export const createTask = (task) => {
  return addDoc(tasksCollection, {
    ...task,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
};

/**
 * Updates an existing task in Firestore.
 * @param {string} id - Task ID.
 * @param {object} updates - Fields to update.
 */
export const updateTaskData = (id, updates) => {
  const taskRef = doc(db, TASKS_COLLECTION, id);
  return updateDoc(taskRef, {
    ...updates,
    updatedAt: serverTimestamp()
  });
};

/**
 * Deletes a task from Firestore.
 * @param {string} id - Task ID.
 */
export const deleteTaskData = (id) => {
  return deleteDoc(doc(db, TASKS_COLLECTION, id));
};