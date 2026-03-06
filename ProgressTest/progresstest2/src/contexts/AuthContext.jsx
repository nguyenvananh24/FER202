import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
  loggedUser: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, loggedUser: action.payload };
    case 'LOGOUT':
      return { ...state, loggedUser: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (user) => dispatch({ type: 'LOGIN', payload: user });
  const logout = () => dispatch({ type: 'LOGOUT' });

  return (
    <AuthContext.Provider value={{ loggedUser: state.loggedUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
