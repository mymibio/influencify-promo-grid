
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    username: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    username: ""
  });

  // Extract username from URL query parameters if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const usernameParam = params.get('username');
    
    if (usernameParam) {
      setFormData(prev => ({ ...prev, username: usernameParam }));
    }
  }, [location.search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // For username field, apply restrictions
    if (name === "username") {
      const sanitizedValue = value.toLowerCase().replace(/[^a-z0-9_]/g, "");
      setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (!formData.name) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.username) {
      newErrors.username = "Username is required";
      valid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = "Username can only contain letters, numbers and underscores";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsLoading(true);

      // First check if username already exists
      const { data: existingUsers, error: checkError } = await supabase
        .from('user_profiles')
        .select('username')
        .eq('username', formData.username)
        .single();

      if (existingUsers) {
        toast.error("Username already taken. Please choose another one.");
        setErrors(prev => ({ ...prev, username: "Username already taken" }));
        setIsLoading(false);
        return;
      }

      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 means no rows returned, which is what we want
        throw checkError;
      }

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            username: formData.username,
          }
        }
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Create user profile record
        const { error: profileError } = await supabase.from('user_profiles').insert({
          id: data.user.id,
          username: formData.username,
          name: formData.name,
          email: formData.email
        });

        if (profileError) {
          console.error("Error creating user profile:", profileError);
          toast.error("Failed to complete signup. Please try again.");
          return;
        }

        toast.success("Account created successfully!");
        
        // Redirect to dashboard after signup with a slight delay to ensure data is saved
        setTimeout(() => {
          navigate('/dashboard');
        }, 500);
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      if (error.code === '23505') {
        toast.error("Email already registered. Try signing in instead.");
      } else {
        toast.error(error.message || "Failed to create account");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-sm border">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Sign Up</h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign In
              </Link>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                className={errors.username ? "border-red-500" : ""}
                // Make it readonly if it came from URL parameter
                readOnly={location.search.includes('username=')}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
              {location.search.includes('username=') && (
                <p className="text-green-500 text-xs mt-1">This username is available!</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={errors.email ? "border-red-500" : ""}
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className={errors.password ? "border-red-500" : ""}
                autoComplete="new-password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
