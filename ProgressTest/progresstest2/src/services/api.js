import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const expenseService = {
  getUsers: () => axios.get(`${BASE_URL}/users`),
  getUserById: (id) => axios.get(`${BASE_URL}/users/${id}`),
  getAllExpenses: () => axios.get(`${BASE_URL}/expenses`),
  addExpense: (expense) => axios.post(`${BASE_URL}/expenses`, expense),
  updateExpense: (id, expense) => axios.put(`${BASE_URL}/expenses/${id}`, expense),
  deleteExpense: (id) => axios.delete(`${BASE_URL}/expenses/${id}`),
};

export default expenseService;
