import { TASKS_KEY, USERS_KEY } from "../config";
import { User, Task } from "../types";
import { loadFromStorage, saveToStorage } from "../utils/storageUtils";

const mockApiCall = <T>(data: T, delay = 1000): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
};

export const signup = (
  newUser: User
): Promise<{ success: boolean; user?: User; error?: string }> => {
  const users: User[] = loadFromStorage<User[]>(USERS_KEY) || [];

  if (users.some((user) => user.email === newUser.email)) {
    return mockApiCall({ success: false, error: "Email already exists" }, 500);
  }

  users.push(newUser);
  saveToStorage(USERS_KEY, users);

  return mockApiCall({ success: true, user: newUser }, 500);
};

export const signin = (
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; error?: string }> => {
  const users: User[] = loadFromStorage<User[]>(USERS_KEY) || [];

  const user = users.find((user) => user.email === email);

  if (!user) {
    return mockApiCall({ success: false, error: "User not found" }, 500);
  }

  if (user.password !== password) {
    return mockApiCall({ success: false, error: "Invalid password" }, 500);
  }

  return mockApiCall({ success: true, user }, 500);
};

export const fetchTasks = (userId: string): Promise<Task[]> => {
  const tasks: Task[] = loadFromStorage<Task[]>(TASKS_KEY) || [];
  const userTasks = tasks.filter((task) => task.userId === userId);
  return mockApiCall(userTasks, 1000);
};

export const addTask = (
  newTask: Omit<Task, "createDate" | "userId">,
  userId: string
): Promise<{ success: boolean; task?: Task; error?: string }> => {
  const tasks: Task[] = loadFromStorage<Task[]>(TASKS_KEY) || [];

  const taskWithId: Task = {
    ...newTask,
    createDate: new Date().toISOString(),
    userId,
  };

  tasks.push(taskWithId);
  saveToStorage(TASKS_KEY, tasks);

  return mockApiCall({ success: true, task: taskWithId }, 500);
};


export const deleteTask = (
  createDate: string
): Promise<{ success: boolean; error?: string }> => {
  const tasks: Task[] = loadFromStorage<Task[]>(TASKS_KEY) || [];
  const updatedTasks = tasks.filter((task) => task.createDate !== createDate);

  if (updatedTasks.length === tasks.length) {
    return mockApiCall({ success: false, error: "Task not found" }, 500);
  }

  saveToStorage(TASKS_KEY, updatedTasks);
  return mockApiCall({ success: true }, 500);
};

export const updateTask = (
  createDate: string,
  updatedFields: Partial<Task>
): Promise<{ success: boolean; task?: Task; error?: string }> => {
  const tasks: Task[] = loadFromStorage<Task[]>(TASKS_KEY) || [];
  const taskIndex = tasks.findIndex((task) => task.createDate === createDate);

  if (taskIndex === -1) {
    return mockApiCall({ success: false, error: "Task not found" }, 500);
  }

  tasks[taskIndex] = { ...tasks[taskIndex], ...updatedFields };
  saveToStorage(TASKS_KEY, tasks);

  return mockApiCall({ success: true, task: tasks[taskIndex] }, 500);
};
