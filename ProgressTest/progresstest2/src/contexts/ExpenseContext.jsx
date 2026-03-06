import React, { createContext, useContext, useReducer } from 'react';

const ExpenseContext = createContext();

const initialState = {
  expenses: [],
  loading: false,
  error: null,
};

function expenseReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_EXPENSES':
      return { ...state, expenses: action.payload, loading: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.payload] };
    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map((exp) =>
          exp.id === action.payload.id ? action.payload : exp
        ),
      };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter((exp) => exp.id !== action.payload),
      };
    default:
      return state;
  }
}

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  const setLoading = (val) => dispatch({ type: 'SET_LOADING', payload: val });
  const setExpenses = (expenses) => dispatch({ type: 'SET_EXPENSES', payload: expenses });
  const setError = (err) => dispatch({ type: 'SET_ERROR', payload: err });
  const addExpense = (expense) => dispatch({ type: 'ADD_EXPENSE', payload: expense });
  const updateExpense = (expense) => dispatch({ type: 'UPDATE_EXPENSE', payload: expense });
  const deleteExpense = (id) => dispatch({ type: 'DELETE_EXPENSE', payload: id });

  return (
    <ExpenseContext.Provider
      value={{
        ...state,
        setLoading,
        setExpenses,
        setError,
        addExpense,
        updateExpense,
        deleteExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  return useContext(ExpenseContext);
}

export default ExpenseContext;
