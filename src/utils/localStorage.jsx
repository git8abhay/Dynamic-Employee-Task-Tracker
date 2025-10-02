const employees = [
  {
    id: 1,
    firstName: "Oliver",
    email: "e@e.com",
    password: "123",
    taskCounts: {
      newTask: 1,
      active: 1,
      completed: 1,
      failed: 1
    },
    tasks: [
      {
        newTask: true,
        active: false,
        completed: false,
        failed: false,
        taskTitle: "Design login UI",
        taskDescription: "Create a responsive login screen using Tailwind CSS.",
        taskDate: "2025-07-12",
        category: "UI/UX"
      },
      {
        newTask: false,
        active: true,
        completed: false,
        failed: false,
        taskTitle: "Refactor backend API",
        taskDescription: "Optimize user authentication and session handling.",
        taskDate: "2025-07-10",
        category: "Backend"
      },
      {
        newTask: false,
        active: false,
        completed: true,
        failed: false,
        taskTitle: "Bug fixing sprint",
        taskDescription: "Resolve all open issues from last release cycle.",
        taskDate: "2025-07-08",
        category: "Bug Fix"
      },
      {
        newTask: false,
        active: false,
        completed: false,
        failed: true,
        taskTitle: "Create documentation",
        taskDescription: "Document all API endpoints for  web-developers.",
        taskDate: "2025-07-06",
        category: "Documentation"
      }
    ]
  },
  {
    id: 2,
    firstName: "Emily",
    email: "employee2@example.com",
    password: "123",
    taskCounts: {
      newTask: 1,
      active: 2,
      completed: 1,
      failed: 0
    },
    tasks: [
      {
        newTask: true,
        active: false,
        completed: false,
        failed: false,
        taskTitle: "Build user dashboard",
        taskDescription: "Implement dashboard for employee task tracking.",
        taskDate: "2025-07-11",
        category: "Frontend"
      },
      {
        newTask: false,
        active: true,
        completed: false,
        failed: false,
        taskTitle: "Fix layout bugs",
        taskDescription: "Resolve responsive issues on mobile devices.",
        taskDate: "2025-07-09",
        category: "Bug Fix"
      },
      {
        newTask: false,
        active: true,
        completed: false,
        failed: false,
        taskTitle: "Set up database schema",
        taskDescription: "Create schema for new features in Postgres.",
        taskDate: "2025-07-07",
        category: "Database"
      },
      {
        newTask: false,
        active: false,
        completed: true,
        failed: false,
        taskTitle: "Client call",
        taskDescription: "Discuss project requirements and timelines.",
        taskDate: "2025-07-05",
        category: "Management"
      }
    ]
  },
  {
    id: 3,
    firstName: "Noah",
    email: "employee3@example.com",
    password: "123",
    taskCounts: {
      newTask: 1,
      active: 1,
      completed: 2,
      failed: 0
    },
    tasks: [
      {
        newTask: true,
        active: false,
        completed: false,
        failed: false,
        taskTitle: "Redesign homepage",
        taskDescription: "Update UI of the homepage for better engagement.",
        taskDate: "2025-07-10",
        category: "UI/UX"
      },
      {
        newTask: false,
        active: true,
        completed: false,
        failed: false,
        taskTitle: "Set up CI/CD",
        taskDescription: "Implement CI pipeline for automated testing.",
        taskDate: "2025-07-09",
        category: "DevOps"
      },
      {
        newTask: false,
        active: false,
        completed: true,
        failed: false,
        taskTitle: "Write unit tests",
        taskDescription: "Ensure code coverage above 90% for all modules.",
        taskDate: "2025-07-06",
        category: "Testing"
      },
      {
        newTask: false,
        active: false,
        completed: true,
        failed: false,
        taskTitle: "Refactor dashboard code",
        taskDescription: "Improve readability and remove redundant code.",
        taskDate: "2025-07-05",
        category: "Frontend"
      }
    ]
  },
  {
    id: 4,
    firstName: "Ava",
    email: "employee4@example.com",
    password: "123",
    taskCounts: {
      newTask: 1,
      active: 2,
      completed: 1,
      failed: 0
    },
    tasks: [
      {
        newTask: true,
        active: false,
        completed: false,
        failed: false,
        taskTitle: "Conduct QA session",
        taskDescription: "Review application thoroughly before release.",
        taskDate: "2025-07-12",
        category: "QA"
      },
      {
        newTask: false,
        active: true,
        completed: false,
        failed: false,
        taskTitle: "Update landing page",
        taskDescription: "Enhance hero section with animation and CTA.",
        taskDate: "2025-07-10",
        category: "UI/UX"
      },
      {
        newTask: false,
        active: true,
        completed: false,
        failed: false,
        taskTitle: "Optimize queries",
        taskDescription: "Improve slow queries in the dashboard module.",
        taskDate: "2025-07-09",
        category: "Database"
      },
      {
        newTask: false,
        active: false,
        completed: true,
        failed: false,
        taskTitle: "Design logo concept",
        taskDescription: "Create a fresh logo for brand identity.",
        taskDate: "2025-07-07",
        category: "Design"
      }
    ]
  },
  {
    id: 5,
    firstName: "Liam",
    email: "employee5@example.com",
    password: "123",
    taskCounts: {
      newTask: 1,
      active: 1,
      completed: 2,
      failed: 0
    },
    tasks: [
      {
        newTask: true,
        active: false,
        completed: false,
        failed: false,
        taskTitle: "Prepare release notes",
        taskDescription: "Summarize updates for the new version launch.",
        taskDate: "2025-07-12",
        category: "Documentation"
      },
      {
        newTask: false,
        active: true,
        completed: false,
        failed: false,
        taskTitle: "Analyze user feedback",
        taskDescription: "Review feedback from recent user testing.",
        taskDate: "2025-07-10",
        category: "Support"
      },
      {
        newTask: false,
        active: false,
        completed: true,
        failed: false,
        taskTitle: "Fix login issue",
        taskDescription: "Resolve login failures reported by QA team.",
        taskDate: "2025-07-08",
        category: "Bug Fix"
      },
      {
        newTask: false,
        active: false,
        completed: true,
        failed: false,
        taskTitle: "Team sync meeting",
        taskDescription: "Discuss weekly progress with all departments.",
        taskDate: "2025-07-06",
        category: "Management"
      }
    ]
  }
];

const admin = [
  {
    id: 1,
    name: "Admin",
    email: "admin@me.com",
    password: "123"
  }
];

export const setLocalStorage = () => {
  localStorage.setItem('employees', JSON.stringify(employees));
  localStorage.setItem('admin', JSON.stringify(admin));
};

export const getLocalStorage = () => {
  const employees = JSON.parse(localStorage.getItem('employees'));
  const admin = JSON.parse(localStorage.getItem('admin'));
  return { employees, admin };
};
