
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/ui/navbar";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useAuth();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (profile) {
      navigate("/dashboard");
    }
  }, [profile, navigate]);

  // Get username from URL if available
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const usernameParam = searchParams.get('username');
    if (usernameParam) {
      console.log("Found username in URL:", usernameParam);
      setUsername(usernameParam);
    }
  }, [location]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Handling signup submission");
    
    if (!username || !name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log("Checking if username is still available...");
      // Check username availability once more before signup
      const { data: usernameCheck, error: usernameError } = await supabase
        .from('user_profiles')
        .select('username')
        .eq('username', username)
        .maybeSingle();
        
      if (usernameCheck) {
        toast.error("Username was claimed while you were signing up. Please choose another.");
        setIsSubmitting(false);
        return;
      }
      
      console.log("Username is available, proceeding with signup");
      // First sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            name,
          }
        }
      });
      
      if (authError) {
        console.error("Auth error during signup:", authError);
        throw authError;
      }
      
      if (!authData.user) {
        console.error("No user returned from signUp");
        throw new Error("Failed to create user");
      }

      console.log("User created successfully, creating profile");
      // Create the user profile
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: authData.user.id,
          username,
          name,
          email,
          bio: '',
          social_links: {}
        });
      
      if (profileError) {
        console.error("Profile creation error:", profileError);
        throw profileError;
      }
      
      console.log("User profile created successfully");
      toast.success("Account created! Redirecting to dashboard...");
      
      // Use navigate for redirection
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error during signup:", error);
      toast.error(error.message || "Failed to create account");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-sm border">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Create Your Account</h1>
            <p className="text-muted-foreground mt-2">
              Sign up to start using MYMI.bio
            </p>
          </div>
          
          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                  placeholder="yourname"
                  className="w-full"
                  disabled={!!location.search.includes('username=')}
                />
                <p className="text-xs text-gray-500 mt-1">This will be your unique link: mymi.bio/{username}</p>
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters</p>
              </div>
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-[#5271FF] hover:bg-[#4262EA] text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
            
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-[#5271FF] hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
