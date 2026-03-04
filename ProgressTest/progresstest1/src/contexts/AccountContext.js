import React, { createContext, useContext, useReducer } from 'react';

const AccountContext = createContext();

const initialState = {
  accounts: [],
  loading: false,
  error: null,
};

function accountReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ACCOUNTS':
      return { ...state, accounts: action.payload, loading: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'UPDATE_ACCOUNT_STATUS':
      return {
        ...state,
        accounts: state.accounts.map((acc) =>
          acc.id === action.payload.id
            ? { ...acc, status: action.payload.status }
            : acc
        ),
      };
    default:
      return state;
  }
}

export function AccountProvider({ children }) {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  const setLoading = (val) => dispatch({ type: 'SET_LOADING', payload: val });
  const setAccounts = (accounts) => dispatch({ type: 'SET_ACCOUNTS', payload: accounts });
  const setError = (err) => dispatch({ type: 'SET_ERROR', payload: err });
  const updateAccountStatus = (id, status) =>
    dispatch({ type: 'UPDATE_ACCOUNT_STATUS', payload: { id, status } });

  return (
    <AccountContext.Provider
      value={{ ...state, setLoading, setAccounts, setError, updateAccountStatus }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccounts() {
  return useContext(AccountContext);
}

export default AccountContext;
