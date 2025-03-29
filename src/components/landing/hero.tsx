
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [username, setUsername] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow lowercase letters, numbers, and underscore
    const sanitizedValue = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "");
    setUsername(sanitizedValue);
  };

  const checkUsername = async () => {
    if (!username) {
      toast.error("Please enter a username");
      return;
    }

    if (username.length < 3) {
      toast.error("Username must be at least 3 characters");
      return;
    }

    setIsChecking(true);
    
    try {
      // Here we would check if the username is available
      // For this demo, we'll simulate a check with a timeout
      // In a real implementation, you'd query your database
      
      // Simulated check - replace with actual Supabase query in the future
      setTimeout(() => {
        toast.success("Username is available! Continue to sign up.");
        navigate(`/signup?username=${username}`);
        setIsChecking(false);
      }, 1000);
      
    } catch (error) {
      toast.error("Error checking username");
      setIsChecking(false);
    }
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Turn Your Instagram Bio Into a
              <span className="text-brand-purple"> Money-Making Machine</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mt-4">
              Create a beautiful product showcase that converts your followers into customers.
              Share exclusive discounts and promotions in one stunning link.
            </p>
          </div>
          
          {/* Username claim section */}
          <div className="w-full max-w-md mt-8 bg-white p-4 md:p-6 rounded-lg shadow-sm border">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="yourname"
                  value={username}
                  onChange={handleUsernameChange}
                  className="pr-24"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  influencify.com/
                </div>
              </div>
              
              <Button 
                className="bg-brand-purple hover:bg-brand-dark-purple text-white whitespace-nowrap"
                onClick={checkUsername}
                disabled={isChecking}
              >
                {isChecking ? "Checking..." : "Claim your link"}
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link to="/signup">
              <Button className="bg-brand-purple hover:bg-brand-dark-purple text-white px-8 py-2 rounded-lg">
                Get Started — It's Free
              </Button>
            </Link>
            <Link to="/examples">
              <Button variant="outline">
                See Examples
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
