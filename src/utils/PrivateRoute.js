import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../Hook";

export const PrivateRoute = ({ path, ...props }) => {
  const { userInfo } = useAuth();

  if (userInfo) {
    return <Route {...props} />;
  } else return <Navigate to="/login" replace state={{ from: path }} />;
};
