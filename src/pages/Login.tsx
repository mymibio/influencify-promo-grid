
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/ui/navbar";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // In demo mode, just simulate a successful login
      toast.success("Logged in successfully! Redirecting to dashboard...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Failed to log in");
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
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">
              Sign in to access your MYMI.bio account
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
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
            
            <Button 
              type="submit"
              className="w-full bg-[#FF66B3] hover:bg-[#E54C9A] text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
            
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#FF66B3] hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
