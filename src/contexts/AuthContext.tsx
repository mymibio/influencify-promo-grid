
import { createContext, useContext, ReactNode, useState } from 'react';

// Create a simplified context without authentication but with profile data
interface AuthContextType {
  isLoading: boolean;
  profile: {
    id: string;
    username: string;
    name: string;
    email: string;
    bio?: string;
    profilePicture?: string;
    socialLinks?: Record<string, string>;
  } | null;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Use demo profile data since we're in demo mode
  const [profile, setProfile] = useState({
    id: 'demo-user-id',
    username: 'demo',
    name: 'Demo User',
    email: 'demo@example.com',
    bio: 'This is a demo account',
    socialLinks: {
      instagram: 'demouser',
      twitter: 'demouser',
    }
  });

  // Simulate refreshing profile
  const refreshProfile = async () => {
    // In demo mode, this doesn't do anything but is needed by components
    console.log('Refreshing profile in demo mode');
    return Promise.resolve();
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isLoading: false,
        profile,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
