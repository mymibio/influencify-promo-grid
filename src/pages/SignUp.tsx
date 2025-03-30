
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/ui/navbar";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get username from URL if available
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const usernameParam = searchParams.get('username');
    if (usernameParam) {
      setUsername(usernameParam);
    }
  }, [location]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !name || !email) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // In demo mode, just simulate a successful signup
      toast.success("Account created! Redirecting to dashboard...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Failed to create account");
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
