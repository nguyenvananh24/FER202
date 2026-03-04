import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const accountService = {
  getAll: () => axios.get(`${BASE_URL}/accounts`),
  getById: (id) => axios.get(`${BASE_URL}/accounts/${id}`),
  updateStatus: (id, status) => axios.patch(`${BASE_URL}/accounts/${id}`, { status }),
};

export default accountService;
