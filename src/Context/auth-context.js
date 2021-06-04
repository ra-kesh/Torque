import { createContext, useReducer } from "react";
import { authReducer } from "../Reducer";

export const AuthContext = createContext();

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

export const AuthProvider = ({ children }) => {
  let initialState = {
    userInfo: userInfoFromStorage,
    loading: null,
    error: null,
  };

  let [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
