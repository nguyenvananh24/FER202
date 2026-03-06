import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const expenseService = {
  getUsers: () => axios.get(`${BASE_URL}/users`),
  getUserById: (id) => axios.get(`${BASE_URL}/users/${id}`),
  // json-server v1 beta doesn't support ?field=value filtering → fetch all then filter client-side
  getAllExpenses: () => axios.get(`${BASE_URL}/expenses`),
  addExpense: (expense) => axios.post(`${BASE_URL}/expenses`, expense),
  updateExpense: (id, expense) => axios.put(`${BASE_URL}/expenses/${id}`, expense),
  deleteExpense: (id) => axios.delete(`${BASE_URL}/expenses/${id}`),
};

export default expenseService;
