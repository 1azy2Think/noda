import React from 'react';
import { Navigate } from 'react-router';
// import { useAuth } from '../context/authContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { token, userId } = useAuth();

//   if (!token || !userId) {
//     return <Navigate to="/login" replace />;
//   }

  return <>{children}</>;
};

export default ProtectedRoute;
