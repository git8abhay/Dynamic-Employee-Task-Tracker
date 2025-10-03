// src/api/auth.js

import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Assuming firebase.js is in src/

/**
 * Logs in an existing user.
 * @param {string} email 
 * @param {string} password 
 */
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Registers a new user and creates a user profile in Firestore.
 * @param {string} email 
 * @param {string} password 
 */
export const registerUser = async (email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  
  // Basic role determination based on email
  const role = email.includes('admin') ? 'admin' : 'employee';
  
  await setDoc(doc(db, 'users', result.user.uid), {
    email,
    role,
    createdAt: serverTimestamp()
  });
  return result.user;
};

/**
 * Logs out the current user.
 */
export const logoutUser = () => {
  return signOut(auth);
};

/**
 * Sets up a listener for Firebase Auth state changes.
 * @param {function} callback - Function to run on state change.
 * @returns {function} Unsubscribe function.
 */
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};