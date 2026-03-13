import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const getExpenses = async () => {
  const response = await axios.get(`${BASE_URL}/expenses`);
  return response.data;
};

export const addExpense = async (expense) => {
  const response = await axios.post(`${BASE_URL}/expenses`, expense);
  return response.data;
};

export const updateExpense = async (id, expense) => {
  const response = await axios.put(`${BASE_URL}/expenses/${id}`, expense);
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await axios.delete(`${BASE_URL}/expenses/${id}`);
  return response.data;
};
