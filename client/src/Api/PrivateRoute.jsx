import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
