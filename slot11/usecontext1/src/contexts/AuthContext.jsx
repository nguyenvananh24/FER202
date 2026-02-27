import React, { createContext, useReducer, useContext } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true, error: null };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
        isAuthenticated: true
      };

    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
        isAuthenticated: false
      };

    case "LOGOUT":
      return initialState;

    case "CLEAR_ERROR":
      return { ...state, error: null };

    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Mock data
  const mockAccounts = [
    {
      id: 1,
      username: "admin",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
      status: "active"
    },
    {
      id: 2,
      username: "user1",
      email: "user1@example.com",
      password: "123456",
      role: "user",
      status: "active"
    },
    {
      id: 3,
      username: "user2",
      email: "user2@example.com",
      password: "123456",
      role: "user",
      status: "locked"
    }
  ];

  function login(identifier, password) {
    dispatch({ type: "LOGIN_START" });

    return new Promise((resolve) => {
      setTimeout(() => {
        const isEmail = identifier.includes("@");

        const account = mockAccounts.find((acc) => {
          return isEmail
            ? acc.email === identifier && acc.password === password
            : acc.username === identifier && acc.password === password;
        });

        if (!account) {
          dispatch({
            type: "LOGIN_FAILURE",
            payload: "Invalid credentials."
          });
          resolve({ ok: false });
          return;
        }

        if (account.status === "locked") {
          dispatch({
            type: "LOGIN_FAILURE",
            payload: "Account is locked."
          });
          resolve({ ok: false });
          return;
        }

        if (account.role !== "admin") {
          dispatch({
            type: "LOGIN_FAILURE",
            payload: "Only admin can login."
          });
          resolve({ ok: false });
          return;
        }

        const userInfo = {
          id: account.id,
          username: account.username,
          email: account.email,
          role: account.role
        };

        dispatch({ type: "LOGIN_SUCCESS", payload: userInfo });
        resolve({ ok: true });
      }, 1000);
    });
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
  }

  function clearError() {
    dispatch({ type: "CLEAR_ERROR" });
  }

  const value = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    isAuthenticated: state.isAuthenticated,
    login,
    logout,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;