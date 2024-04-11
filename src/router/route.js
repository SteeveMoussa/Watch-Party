import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const PrivateRoute = ({Component}) => {
    const user = useAuth();
    return user.sessionId ? <Component /> : <Navigate to="/login" />
  };
  
  export default PrivateRoute;