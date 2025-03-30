
import React, { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // No longer checks for authentication in demo mode
  return <>{children}</>;
};

export default ProtectedRoute;
