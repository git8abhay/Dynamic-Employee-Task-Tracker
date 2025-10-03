# 🚀 Dynamic Employee Task Tracker

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4.11-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-10.14.1-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.15-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A modern, real-time employee task management system built with React and Firebase**

[Live Demo](https://dynamicems.vercel.app/) • [Report Bug](https://github.com/git8abhay/Dynamic-Employee-Task-Tracker/issues) • [Request Feature](https://github.com/git8abhay/Dynamic-Employee-Task-Tracker/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Firebase Setup](#firebase-setup)
  - [Environment Variables](#environment-variables)
- [Usage](#-usage)
  - [Admin Features](#admin-features)
  - [Employee Features](#employee-features)
- [Project Structure](#-project-structure)
- [Task Lifecycle](#-task-lifecycle)
- [Contributing](#-contributing)
- [Contact](#-contact)

---

## 🌟 Overview

**Dynamic Employee Task Tracker** is a comprehensive web application designed to streamline task management in organizations. Built with modern technologies like React, Firebase, and Tailwind CSS, it provides real-time task tracking, role-based access control, and an intuitive user interface for both administrators and employees.

### Why This Project?

- **Real-time Collaboration**: Powered by Firebase Firestore for instant updates across all users
- **Role-Based Access**: Separate interfaces and permissions for Admins and Employees
- **Modern Architecture**: Built with React 18+ and Vite for optimal performance
- **Responsive Design**: Fully responsive UI using Tailwind CSS
- **Secure Authentication**: Firebase Authentication with role management

---

## ✨ Features

### 🔐 Authentication & Authorization
- **Firebase Authentication** integration for secure login/logout
- **Role-based access control** with Admin and Employee roles
- **Persistent sessions** with automatic role detection
- **Secure route protection** based on user roles

### 📊 Task Management
- **Create, Read, Update, Delete (CRUD)** operations for tasks
- **Real-time synchronization** with Firebase Firestore
- **Task lifecycle management** with multiple states:
  - 🆕 **New** - Newly assigned tasks
  - ⚡ **Active** - Tasks in progress
  - ✅ **Completed** - Successfully finished tasks
  - ❌ **Failed** - Tasks that couldn't be completed
- **Task prioritization** system
- **Form validation** for data integrity

### 🎯 Admin Dashboard
- **Create and assign tasks** to employees
- **Monitor all tasks** across the organization
- **User management** capabilities
- **Task filtering and sorting** options

### 👤 Employee Dashboard
- **View assigned tasks** with detailed information
- **Update task status** (Active, Completed, Failed)
- **Personal task statistics** and progress tracking
- **Task filtering** by date & priority
- **Chronological task sorting**

### 🔔 Real-Time Features
- **Live task updates** without page refresh
- **Toast notifications** for task changes
- **Optimistic UI updates** for better UX
- **Real-time database listeners** for instant sync

### 🎨 User Interface
- **Responsive design** for all screen sizes
- **Modern UI components** with Tailwind CSS
- **Intuitive navigation** with React Router
- **Loading states** and error handling
- **Smooth animations** and transitions

### 🔍 Advanced Features
- **Task filtering** by status (New, Active, Completed, Failed)
- **Sorting capabilities** by date and priority
- **Context API** for efficient state management

---

## 🛠 Tech Stack

### Frontend
- **[React 18.3.1](https://react.dev/)** - UI library for building interactive interfaces
- **[Vite 5.4.11](https://vitejs.dev/)** - Next-generation frontend build tool
- **[Tailwind CSS 3.4.15](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Router DOM](https://reactrouter.com/)** - Client-side routing

### Backend & Services
- **[Firebase 10.14.1](https://firebase.google.com/)** - Backend-as-a-Service platform
  - **Authentication** - User authentication and authorization
  - **Firestore** - NoSQL real-time database

### State Management
- **Context API** - React's built-in state management solution
- **React Hooks** - useState, useEffect, useContext for state logic

### Additional Libraries
- **React Toastify** - Toast notifications
- **React Icons** - Lucide library

---

## 🏗 Architecture

### Data Flow
1. **Authentication**: User logs in → Firebase Auth → Role detection → Route to appropriate dashboard
2. **Task Creation**: Admin creates task → Firestore → Real-time listener → Employee dashboard updates
3. **Task Update**: Employee updates status → Firestore → Real-time listener → Admin dashboard updates
4. **State Management**: Context API manages global state across components

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **npm** (v9.0.0 or higher) or **yarn**
- **Git** for cloning the repository
- A **Firebase account** (free tier is sufficient)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/git8abhay/Dynamic-Employee-Task-Tracker.git
   cd Dynamic-Employee-Task-Tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

### Firebase Setup

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add Project" and follow the setup wizard
   - Enable Google Analytics (optional)

2. **Enable Authentication**
   - In Firebase Console, navigate to **Authentication**
   - Click "Get Started"
   - Enable **Email/Password** sign-in method
   - (Optional) Enable other providers like Google, GitHub, etc.

3. **Create Firestore Database**
   - Navigate to **Firestore Database**
   - Click "Create Database"
   - Start in **Test Mode** (change to production rules later)
   - Choose a location closest to your users

4. **Set up Firestore Rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Users collection
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       
       // Tasks collection
       match /tasks/{taskId} {
         allow read: if request.auth != null;
         allow create: if request.auth != null && 
                          get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
         allow update, delete: if request.auth != null;
       }
     }
   }
   ```

5. **Get Firebase Configuration**
   - In Project Settings → General
   - Scroll to "Your apps" section
   - Click the web icon (</>) to add a web app
   - Register your app and copy the configuration object

### Environment Variables

1. **Create environment file**
   ```bash
   cp .env.example .env
   ```

2. **Add Firebase credentials to `.env`**
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
   VITE_FIREBASE_PROJECT_ID=your_project_id_here
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
   VITE_FIREBASE_APP_ID=your_app_id_here
   ```

   > ⚠️ **Important**: Never commit your `.env` file to version control

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The app should be running!

---

## 📱 Usage

### Admin Features

1. **Login as Admin**
   - Use admin credentials to access the admin dashboard
   - Default admin email: `admin@me.com` password: `123456` (set up in Firebase)

2. **Create Tasks**
   - Click "Create Task" button
   - Fill in task details:
     - Task title
     - Description
     - Assign to employee
     - Set priority
     - Due date
   - Submit to create

3. **Monitor Tasks**
   - View all tasks in the organization
   - Filter by New, Active, Completed or Failed
   - Track task completion state

### Employee Features

1. **Login as Employee**
   - Use employee credentials
   - Access personal dashboard

2. **View Tasks**
   - See all assigned tasks
   - View task details and priority
   - Check due dates

3. **Update Task Status**
   - Click on a task card
   - Update status:
     - **Accept Task** → Changes to Active
     - **Complete Task** → Changes to Completed
     - **Mark Failed** → Changes to Failed


## 🔄 Task Lifecycle

Tasks in the application follow a defined lifecycle:

```
┌─────────┐
│   NEW   │ ← Task created by Admin
└────┬────┘
     │
     ▼
┌─────────┐
│ ACTIVE  │ ← Employee accepts and starts working
└────┬────┘
     │
     ├─────────────┐
     ▼             ▼
┌───────────┐  ┌────────┐
│ COMPLETED │  │ FAILED │
└───────────┘  └────────┘
```

### Status Descriptions

- **🆕 New**: Task has been created and assigned but not yet accepted
- **⚡ Active**: Employee has accepted and is currently working on the task
- **✅ Completed**: Task has been successfully finished
- **❌ Failed**: Task could not be completed

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Project**
   ```bash
   git clone https://github.com/git8abhay/Dynamic-Employee-Task-Tracker.git
   ```

2. **Create your Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Commit your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Open a Pull Request**
   - Go to the repository on GitHub
   - Click "Pull Requests" → "New Pull Request"
   - Select your branch and submit

### Contribution Guidelines

- Write clear, concise commit messages
- Follow the existing code style and structure
- Add comments for complex logic
- Update documentation for new features
- Test your changes thoroughly
- Ensure all existing tests pass

## 👨‍💻 Contact

**Abhay Chauhan**

- GitHub: [@git8abhay](https://github.com/git8abhay)
- LinkedIn: [Abhay Chauhan](https://www.linkedin.com/in/abhay-chauhan-4b3001288/)
- Email: abhay120529@gmail.com

**Project Link**: [https://github.com/git8abhay/Dynamic-Employee-Task-Tracker](https://github.com/git8abhay/Dynamic-Employee-Task-Tracker)

**Live Demo**: [https://dynamicems.vercel.app/](https://dynamicems.vercel.app/)

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Lucide](https://lucide.dev/icons/) for icons
- [Vercel](https://vercel.com/) for deployment


<div align="center">

**⭐ If you found this project helpful, please give it a star! ⭐**

Made with ❤️ by [Abhay Chauhan](https://github.com/git8abhay)

</div>
