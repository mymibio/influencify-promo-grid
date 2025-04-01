
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, profile, isLoading } = useAuth();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center flex-col">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-brand-purple mb-4"></div>
        <p className="text-gray-600">Loading your profile...</p>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If authenticated but no profile, show a different loading state
  if (!profile) {
    return (
      <div className="flex h-screen w-full items-center justify-center flex-col">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-brand-purple mb-4"></div>
        <p className="text-gray-600">Setting up your profile...</p>
      </div>
    );
  }
  
  // Render children if authenticated and profile is loaded
  return <>{children}</>;
};

export default ProtectedRoute;
