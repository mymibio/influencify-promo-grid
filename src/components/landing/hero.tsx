
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  const [username, setUsername] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
    <section className="py-20 md:py-28 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 animate-spin-slow">
        <div className="h-20 w-20 rounded-full bg-gradient-to-r from-pink-500 to-brand-purple opacity-30 blur-xl"></div>
      </div>
      <div className="absolute bottom-10 left-10">
        <div className="h-32 w-32 rounded-full bg-gradient-to-r from-brand-light-purple to-blue-400 opacity-20 blur-xl"></div>
      </div>
      
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2 max-w-5xl">
            <div className={`inline-block mb-4 rounded-full bg-brand-purple/10 px-3 py-1 text-sm font-semibold text-brand-purple transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <span className="inline-flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Introducing Influencify — The best link for Instagram bios</span>
                <Sparkles className="h-3.5 w-3.5" />
              </span>
            </div>
            
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Turn Your Instagram Bio Into a
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-light-purple to-brand-purple animate-gradient-x inline-block"> Money-Making Machine</div>
            </h1>
            
            <p className={`mx-auto max-w-[800px] text-gray-500 md:text-xl dark:text-gray-400 mt-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Create a beautiful product showcase that converts your followers into customers.
              Share exclusive discounts and promotions in one stunning link.
            </p>
          </div>
          
          {/* Username claim section */}
          <div className={`w-full max-w-md mt-8 bg-white p-4 md:p-6 rounded-xl shadow-xl border border-gray-100 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
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
            
            <div className="text-xs text-gray-500 mt-2 text-center">
              Claim your unique link before someone else takes it!
            </div>
          </div>
          
          <div className={`flex flex-col sm:flex-row gap-4 mt-8 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link to="/signup">
              <Button className="bg-brand-purple hover:bg-brand-dark-purple text-white px-8 py-6 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
                Get Started — It's Free
              </Button>
            </Link>
            <Link to="/examples">
              <Button variant="outline" className="px-8 py-6 text-lg hover:bg-gray-100 transition-all hover:scale-105">
                See Examples
              </Button>
            </Link>
          </div>
          
          {/* Social proof */}
          <div className={`mt-10 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-sm text-gray-500">Trusted by over 10,000+ creators and influencers</p>
            <div className="flex justify-center gap-8 mt-4 grayscale opacity-60">
              <div className="h-8">
                <span className="font-bold text-xl">instagram</span>
              </div>
              <div className="h-8">
                <span className="font-bold text-xl">youtube</span>
              </div>
              <div className="h-8">
                <span className="font-bold text-xl">tiktok</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path fill="#f8f9fa" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,165.3C960,160,1056,192,1152,202.7C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;

