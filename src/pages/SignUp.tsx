
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/ui/navbar";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { UserPlus, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const usernameParam = queryParams.get('username');
    
    if (usernameParam) {
      setFormData(prev => ({ ...prev, username: usernameParam }));
      validateUsername(usernameParam);
    }
  }, [location]);

  const validateUsername = async (username: string) => {
    if (!username) return;

    try {
      const { data: existingUsers, error: checkError } = await supabase
        .from('user_profiles')
        .select('username')
        .eq('username', username);
        
      if (checkError) {
        console.error("Error checking username:", checkError);
        return;
      }
      
      if (existingUsers && existingUsers.length > 0) {
        setUsernameError("Username already taken. Please choose another one.");
        return false;
      } else {
        setUsernameError("");
        return true;
      }
    } catch (error) {
      console.error("Error validating username:", error);
      return false;
    }
  };

  // Check if email already exists in auth system
  const checkEmailExists = async (email: string) => {
    try {
      // We can only indirectly check if an email exists by attempting to sign in with 
      // an invalid password and checking the error message
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: "deliberately-wrong-password-for-check"
      });
      
      // If the error message mentions "Invalid login credentials", the email exists
      // If it mentions "Email not confirmed", the email exists but needs verification
      if (error && (error.message.includes("Invalid login credentials") || 
                     error.message.includes("Email not confirmed"))) {
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Error checking email:", error);
      return false; // Assume email doesn't exist if check fails
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'username') {
      const sanitizedValue = value.toLowerCase().replace(/[^a-z0-9_]/g, "");
      setFormData({ ...formData, [name]: sanitizedValue });
      
      // Clear previous errors
      setFormError("");
      
      // Validate username as user types
      if (sanitizedValue.length >= 3) {
        await validateUsername(sanitizedValue);
      } else if (sanitizedValue) {
        setUsernameError("Username must be at least 3 characters");
      } else {
        setUsernameError("");
      }
    } else {
      setFormData({ ...formData, [name]: value });
      setFormError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError("");
    
    try {
      // Validate all fields
      if (!formData.name || !formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
        setFormError("All fields are required");
        setIsLoading(false);
        return;
      }
      
      // Check password matching
      if (formData.password !== formData.confirmPassword) {
        setFormError("Passwords don't match");
        setIsLoading(false);
        return;
      }
      
      // Validate username length
      if (formData.username.length < 3) {
        setUsernameError("Username must be at least 3 characters");
        setIsLoading(false);
        return;
      }
      
      // Check if username already exists
      const isUsernameValid = await validateUsername(formData.username);
      if (usernameError || isUsernameValid === false) {
        setIsLoading(false);
        return;
      }
      
      // Check if email already exists
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        setFormError("This email is already registered. Please log in instead.");
        setIsLoading(false);
        return;
      }
      
      // Register user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      if (data && data.user) {
        try {
          // Check if profile already exists before inserting
          const { data: existingProfile } = await supabase
            .from('user_profiles')
            .select('id')
            .eq('id', data.user.id)
            .maybeSingle();
          
          if (existingProfile) {
            console.log("Profile already exists for this user, skipping creation");
            toast.success("Account created successfully! Redirecting to dashboard...");
            navigate("/dashboard");
            return;
          }
          
          // Insert a record in user_profiles table
          const { error: profileError } = await supabase
            .from('user_profiles')
            .insert({
              id: data.user.id,
              username: formData.username,
              name: formData.name,
              email: formData.email,
              social_links: {},
              created_at: new Date().toISOString()
            });
            
          if (profileError) {
            console.error("Error creating user profile:", profileError);
            
            if (profileError.message.includes("user_profiles_pkey")) {
              // If the error is a duplicate key constraint, the user profile already exists
              // This is not really an error for the user, so we can continue
              console.log("Profile already exists, continuing with login");
            } else {
              throw profileError;
            }
          }
          
          toast.success("Account created successfully! Redirecting to dashboard...");
          navigate("/dashboard");
        } catch (profileErr: any) {
          // If profile creation fails, attempt to clean up the auth user
          console.error("Error during profile creation:", profileErr);
          
          // Don't throw here - we want to show an error but we've already created the auth record
          setFormError(profileErr.message || "Error creating user profile. Please try again.");
        }
      }
    } catch (error: any) {
      console.error("Error during sign up:", error);
      
      if (error.message.includes("duplicate key")) {
        if (error.message.includes("user_profiles_username_key")) {
          setFormError("Username already taken. Please choose another one.");
        } else if (error.message.includes("user_profiles_pkey")) {
          setFormError("An account with this email already exists. Please log in instead.");
        } else {
          setFormError(error.message || "Failed to create account. Please try again.");
        }
      } else if (error.message.includes("User already registered")) {
        setFormError("This email is already registered. Please log in instead.");
      } else if (error.message.includes("email address")) {
        setFormError("Email address is already in use.");
      } else {
        setFormError(error.message || "Failed to create account. Please try again.");
      }
      
      toast.error("Signup failed. Please check the form for errors.");
    } finally {
      setIsLoading(false);
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
              Start sharing your favorite products today
            </p>
          </div>
          
          {formError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    mymi.bio/
                  </span>
                  <Input
                    id="username"
                    name="username"
                    placeholder="yourname"
                    value={formData.username}
                    onChange={handleChange}
                    className={`pl-24 ${usernameError ? 'border-red-500' : ''}`}
                    required
                    disabled={!!new URLSearchParams(location.search).get('username')}
                  />
                </div>
                {usernameError && (
                  <p className="mt-1 text-sm text-red-500">{usernameError}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">Passwords don't match</p>
                )}
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-[#5271FF] hover:bg-[#4262EA] text-white" 
              disabled={isLoading}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
            
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-[#5271FF] hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
