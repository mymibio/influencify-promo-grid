
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';

// Create a context with authentication and profile data
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
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<AuthContextType['profile']>(null);

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      setIsLoading(true);
      try {
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // If we have a session, fetch the user profile
          await fetchUserProfile(session.user.id);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setProfile(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsLoading(true);
        if (event === 'SIGNED_IN' && session?.user) {
          await fetchUserProfile(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setProfile(null);
        }
        setIsLoading(false);
      }
    );

    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        throw error;
      }

      if (data) {
        // Handle the conversion from Json type to Record<string, string>
        const socialLinksObj = data.social_links as Json;
        
        // Convert socialLinks from Json to Record<string, string>
        let typedSocialLinks: Record<string, string> = {};
        
        // Only process if it's an object and not a string, array, or null
        if (socialLinksObj && typeof socialLinksObj === 'object' && !Array.isArray(socialLinksObj)) {
          Object.entries(socialLinksObj).forEach(([key, value]) => {
            if (typeof value === 'string') {
              typedSocialLinks[key] = value;
            }
          });
        }
        
        setProfile({
          id: data.id,
          username: data.username,
          name: data.name,
          email: data.email,
          bio: data.bio,
          profilePicture: data.profile_picture,
          socialLinks: typedSocialLinks
        });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setProfile(null);
    }
  };

  // Function to refresh profile data
  const refreshProfile = async () => {
    if (!profile?.id) return Promise.resolve();
    
    try {
      await fetchUserProfile(profile.id);
      return Promise.resolve();
    } catch (error) {
      console.error("Error refreshing profile:", error);
      return Promise.reject(error);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isLoading,
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
