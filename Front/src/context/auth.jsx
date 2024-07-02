import { AUTH } from "@/constants";
import React, { useReducer } from "react";

const tokenStorage = localStorage.getItem("token");
const userStorage = JSON.parse(localStorage.getItem("user"));

const initialState = {
  isAuthenticated: tokenStorage && userStorage ? true : false,
  token: tokenStorage ?? null,
  user: userStorage ?? null,
};

function authReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case AUTH.LOGIN: {
      const { token, user } = payload;
      return {
        ...state,
        isAuthenticated: true,
        token,
        user,
      };
    }
    case AUTH.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
      };
    default:
      return state;
  }
}

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const handleLogin = (data) => {
    dispatch({ type: AUTH.LOGIN, payload: data });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const handleLogout = () => {
    dispatch({ type: AUTH.LOGOUT });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ state, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
