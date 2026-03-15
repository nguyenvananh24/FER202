import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const BASE_URL = 'http://localhost:3001';

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/users`);
      if (!res.ok) {
        return rejectWithValue('Không thể kết nối đến máy chủ');
      }

      const users = await res.json();
      const found = users.find((u) => u.username === username && u.password === password);

      if (!found) {
        return rejectWithValue('Tài khoản hoặc mật khẩu không chính xác');
      }

      const { password: _pw, ...safeUser } = found;
      return safeUser;
    } catch (err) {
      return rejectWithValue('Không thể kết nối đến máy chủ');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload || 'Login failed';
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
