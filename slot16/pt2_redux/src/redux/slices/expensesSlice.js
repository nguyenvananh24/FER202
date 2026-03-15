import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const BASE_URL = 'http://localhost:3001';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async (_arg, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/expenses`);
      if (!res.ok) return rejectWithValue('Failed to fetch expenses');
      return await res.json();
    } catch (err) {
      return rejectWithValue('Failed to fetch expenses');
    }
  }
);

export const createExpense = createAsyncThunk(
  'expenses/createExpense',
  async (expense, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      });
      if (!res.ok) return rejectWithValue('Failed to create expense');
      return await res.json();
    } catch (err) {
      return rejectWithValue('Failed to create expense');
    }
  }
);

export const editExpense = createAsyncThunk(
  'expenses/editExpense',
  async ({ id, expense }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/expenses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      });
      if (!res.ok) return rejectWithValue('Failed to update expense');
      return await res.json();
    } catch (err) {
      return rejectWithValue('Failed to update expense');
    }
  }
);

export const removeExpense = createAsyncThunk(
  'expenses/removeExpense',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/expenses/${id}`, { method: 'DELETE' });
      if (!res.ok) return rejectWithValue('Failed to delete expense');
      return id;
    } catch (err) {
      return rejectWithValue('Failed to delete expense');
    }
  }
);

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    clearExpensesError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch expenses';
      })

      .addCase(createExpense.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editExpense.fulfilled, (state, action) => {
        const idx = state.items.findIndex((e) => e.id === action.payload.id);
        if (idx >= 0) state.items[idx] = action.payload;
      })
      .addCase(removeExpense.fulfilled, (state, action) => {
        state.items = state.items.filter((e) => e.id !== action.payload);
      })

      .addCase(createExpense.rejected, (state, action) => {
        state.error = action.payload || 'Failed to create expense';
      })
      .addCase(editExpense.rejected, (state, action) => {
        state.error = action.payload || 'Failed to update expense';
      })
      .addCase(removeExpense.rejected, (state, action) => {
        state.error = action.payload || 'Failed to delete expense';
      });
  },
});

export const { clearExpensesError } = expensesSlice.actions;
export default expensesSlice.reducer;
