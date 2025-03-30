
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { User as AppUser } from '@/types/user';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  profile: AppUser | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const createUserProfile = async (userId: string, email: string) => {
    try {
      // First check if a profile already exists for this user to avoid duplicates
      const { data: existingProfile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
        
      // If profile exists, return it and don't create a new one
      if (existingProfile) {
        console.log("Found existing profile, not creating a new one");
        return {
          id: existingProfile.id,
          username: existingProfile.username,
          email: existingProfile.email,
          name: existingProfile.name,
          profilePicture: existingProfile.profile_picture,
          bio: existingProfile.bio,
          socialLinks: existingProfile.social_links as AppUser['socialLinks'] || {},
          categories: existingProfile.categories,
          createdAt: existingProfile.created_at,
        };
      }

      // Extract username from email (before the @)
      const username = email.split('@')[0];
      
      // Create a default name from the username
      const name = username.charAt(0).toUpperCase() + username.slice(1);
      
      console.log("Creating new user profile for user", userId);
      
      // Create a new profile
      const { data, error } = await supabase
        .from('user_profiles')
        .insert({
          id: userId,
          username: username,
          email: email,
          name: name,
          bio: '',
          social_links: {},
          categories: []
        })
        .select('*')
        .single();
      
      if (error) {
        // If we get a duplicate key error, it means the profile already exists but we missed it
        if (error.message.includes("user_profiles_pkey")) {
          console.log("Duplicate profile creation attempted, fetching existing profile instead");
          
          const { data: existingData, error: fetchError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', userId)
            .single();
            
          if (fetchError) {
            console.error("Error fetching existing user profile:", fetchError);
            return null;
          }
          
          return {
            id: existingData.id,
            username: existingData.username,
            email: existingData.email,
            name: existingData.name,
            profilePicture: existingData.profile_picture,
            bio: existingData.bio,
            socialLinks: existingData.social_links as AppUser['socialLinks'] || {},
            categories: existingData.categories,
            createdAt: existingData.created_at,
          };
        }
        
        console.error("Error creating user profile:", error);
        return null;
      }
      
      // Map from snake_case DB fields to camelCase User type
      const profileData: AppUser = {
        id: data.id,
        username: data.username,
        email: data.email,
        name: data.name,
        profilePicture: data.profile_picture,
        bio: data.bio,
        socialLinks: data.social_links as AppUser['socialLinks'] || {},
        categories: data.categories,
        createdAt: data.created_at,
      };
      
      return profileData;
    } catch (error) {
      console.error("Error in createUserProfile:", error);
      return null;
    }
  };

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();  // Use maybeSingle instead of single to avoid errors when no profile exists

      if (error) {
        console.error("Error fetching user profile:", error);
        return null;
      }

      // If no profile exists, create one
      if (!data) {
        console.log("No profile found for user, creating one...");
        const userData = await supabase.auth.getUser();
        if (userData.data?.user) {
          return await createUserProfile(userId, userData.data.user.email || '');
        }
        return null;
      }

      // Map from snake_case DB fields to camelCase User type
      const profileData: AppUser = {
        id: data.id,
        username: data.username,
        email: data.email,
        name: data.name,
        profilePicture: data.profile_picture,
        bio: data.bio,
        socialLinks: data.social_links as AppUser['socialLinks'] || {},
        categories: data.categories,
        createdAt: data.created_at,
      };

      return profileData;
    } catch (error) {
      console.error("Error in fetchProfile:", error);
      return null;
    }
  };

  const refreshProfile = async () => {
    if (user) {
      const profileData = await fetchProfile(user.id);
      if (profileData) {
        setProfile(profileData);
      }
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const setupAuth = async () => {
      setIsLoading(true);
      
      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        const profileData = await fetchProfile(session.user.id);
        if (profileData) {
          setProfile(profileData);
        }
      }
      
      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setUser(session?.user || null);
          
          if (session?.user) {
            const profileData = await fetchProfile(session.user.id);
            if (profileData) {
              setProfile(profileData);
            }
          } else {
            setProfile(null);
          }
        }
      );
      
      setIsLoading(false);
      
      return () => {
        subscription.unsubscribe();
      };
    };
    
    setupAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, isLoading, signOut, refreshProfile }}>
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
