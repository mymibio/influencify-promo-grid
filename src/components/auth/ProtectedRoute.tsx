
import React, { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // No longer checks for authentication
  return <>{children}</>;
};

export default ProtectedRoute;
