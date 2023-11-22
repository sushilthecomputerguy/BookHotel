import React, { useEffect, useState } from 'react';
import { Navigate, Route } from "react-router-dom";
import axios from 'axios';
// import jwt_decode from "jwt-decode";


function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("isAuth");
  return isAuth === 'true' ? children : <Navigate to="/" />;
};

export default ProtectedRoute;