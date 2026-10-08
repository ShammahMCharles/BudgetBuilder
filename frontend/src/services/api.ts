//We're establishing one central location for the backend URL rather than scattering it throughout the frontend code.
const API_URL = "http://localhost:3000/api";

export const registerUser = async (
  username: string,
  email: string,
  password: string,
) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const getCurrentUser = async (token: string) => {
  const response = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not retrieve user");
  }

  return data;
};

// ===============================
// BUDGET GOALS
// ===============================

export const getGoals = async (token: string) => {
  const response = await fetch(`${API_URL}/budget-goals`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to retrieve goals.");
  }

  return data;
};

export const createGoal = async (
  token: string,
  goal: {
    name: string;
    targetAmount: number;
    currentAmount: number;
    targetDate: string;
    category: string;
  }
) => {
  const response = await fetch(`${API_URL}/budget-goals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(goal),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create goal.");
  }

  return data;
};

export const updateGoal = async (
  token: string,
  id: string,
  goal: {
    name: string;
    targetAmount: number;
    currentAmount: number;
    targetDate: string;
    category: string;
  }
) => {
  const response = await fetch(`${API_URL}/budget-goals/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(goal),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update goal.");
  }

  return data;
};

export const deleteGoal = async (token: string, id: string) => {
  const response = await fetch(`${API_URL}/budget-goals/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete goal.");
  }

  return data;
};