
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";

const Hero = () => {
  const [username, setUsername] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow lowercase letters, numbers, and underscore
    const sanitizedValue = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "");
    setUsername(sanitizedValue);
    // Clear error when user starts typing again
    if (usernameError) {
      setUsernameError("");
    }
  };

  const checkUsername = async () => {
    if (!username) {
      setUsernameError("Please enter a username");
      toast.error("Please enter a username");
      return;
    }

    if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters");
      toast.error("Username must be at least 3 characters");
      return;
    }

    setIsChecking(true);
    setUsernameError("");
    
    try {
      // Query Supabase to check if the username is already taken
      const { data, error } = await supabase
        .from('user_profiles')
        .select('username')
        .eq('username', username)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        // PGRST116 means no rows returned, which is good (username is available)
        console.error("Error checking username:", error);
        setUsernameError("Error checking username availability");
        toast.error("Error checking username availability");
        setIsChecking(false);
        return;
      }
      
      if (data) {
        // Username exists - show error message below input
        setUsernameError("Username is already taken. Please choose another one.");
        toast.error("Username is already taken. Please choose another one.");
        setIsChecking(false);
        return;
      }
      
      // Username is available
      toast.success("Username is available! Continue to sign up.");
      navigate(`/signup?username=${username}`);
      
    } catch (error) {
      console.error("Error:", error);
      setUsernameError("Error checking username availability");
      toast.error("Error checking username availability");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-gray-50 to-blue-50 opacity-80"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-brand-light-purple/20 to-blue-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-r from-brand-purple/10 to-pink-300/10 rounded-full blur-3xl"></div>
      
      <div className="container px-4 md:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <div className={`inline-block mb-6 rounded-full bg-brand-purple/10 px-3 py-1 text-sm font-semibold text-brand-purple transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <span className="inline-flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Introducing Influencify — Monetize your Instagram bio</span>
                <Sparkles className="h-3.5 w-3.5" />
              </span>
            </div>
            
            <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Turn Your Instagram Bio Into a
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-light-purple to-pink-500 inline-block ml-2">Money-Making Machine</div>
            </h1>
            
            <p className={`mx-auto max-w-[700px] text-gray-600 text-lg md:text-xl mt-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Create a beautiful product showcase that converts your followers into customers.
              Share exclusive discounts in one stunning link.
            </p>
          </div>
          
          {/* Signup form */}
          <div className={`w-full max-w-md mx-auto mt-12 bg-white p-4 md:p-6 rounded-xl shadow-xl border border-gray-100 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="flex gap-2 flex-col sm:flex-row">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                  influencify.com/
                </div>
                <Input
                  type="text"
                  placeholder="yourname"
                  value={username}
                  onChange={handleUsernameChange}
                  className="pl-32 pr-4 bg-gray-50 border-gray-200 focus:ring-brand-purple focus:border-brand-purple"
                />
              </div>
              
              <Button 
                className="bg-brand-purple hover:bg-brand-dark-purple text-white whitespace-nowrap group"
                onClick={checkUsername}
                disabled={isChecking}
              >
                {isChecking ? "Checking..." : (
                  <>
                    Claim your link
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </div>
            
            {/* Error message display */}
            {usernameError && (
              <div className="text-red-500 mt-2 text-sm">
                {usernameError}
              </div>
            )}
            
            <div className="text-xs text-gray-500 mt-2 text-center">
              Claim your unique link before someone else takes it!
            </div>
          </div>
          
          <div className={`flex flex-col sm:flex-row gap-4 max-w-md mx-auto mt-8 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link to="/signup" className="flex-1">
              <Button className="bg-brand-purple hover:bg-brand-dark-purple text-white py-6 rounded-lg text-lg w-full shadow-lg hover:shadow-brand-purple/30 transition-all hover:scale-105">
                Get Started — It's Free
              </Button>
            </Link>
            <Link to="/examples" className="flex-1">
              <Button variant="outline" className="py-6 text-lg w-full hover:bg-gray-100 transition-all hover:scale-105">
                See Examples
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full">
          <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
