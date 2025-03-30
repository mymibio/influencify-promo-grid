
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle, Sparkles, Heart, Star, ArrowDown } from "lucide-react";

const Hero = () => {
  const [username, setUsername] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-scale-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
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

  const scrollToNextSection = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={heroRef} className="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5EE] to-[#FFF9F4] -z-10"></div>
      
      {/* Decorative blurred circles */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-[#FFE0D0] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" style={{ animationDuration: '15s' }}></div>
      <div className="absolute -bottom-20 left-10 w-96 h-96 bg-[#FFDCC3] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDuration: '20s' }}></div>
      <div className="absolute left-1/4 top-1/3 w-64 h-64 bg-[#FFD6B3] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDuration: '18s' }}></div>
      
      {/* Floating elements */}
      <div className="absolute top-1/4 right-1/4 w-12 h-12 animate-float opacity-60 hidden md:block">
        <Heart className="text-[#FF8F73] w-full h-full" />
      </div>
      <div className="absolute bottom-1/3 left-1/5 w-10 h-10 animate-float opacity-50 hidden md:block" style={{ animationDelay: '1s' }}>
        <Star className="text-[#FFB499] w-full h-full" />
      </div>
      <div className="absolute top-1/3 left-1/4 w-14 h-14 animate-float opacity-40 hidden md:block" style={{ animationDelay: '2s' }}>
        <Sparkles className="text-[#FFAA80] w-full h-full" />
      </div>
      
      <div className="container px-4 md:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className={`inline-block mb-6 rounded-full bg-[#FFE6D9] px-4 py-1.5 text-sm font-medium text-[#FF7F50] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Introducing Influencify — Monetize your Instagram bio</span>
                <Sparkles className="h-3.5 w-3.5" />
              </span>
            </div>
            
            <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Turn Your Instagram Bio Into a
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7F50] to-[#FF5F35] inline-block ml-2">Money-Making Machine</div>
            </h1>
            
            <p className={`mx-auto max-w-[700px] text-gray-600 text-lg md:text-xl mt-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Create a beautiful product showcase that converts your followers into customers.
              Share exclusive discounts in one stunning link.
            </p>
            
            {/* Signup form */}
            <div className={`w-full max-w-md mx-auto mt-12 bg-white p-4 md:p-6 rounded-3xl shadow-xl border border-gray-50 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
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
                    className="pl-32 pr-4 bg-gray-50 border-gray-200 focus:ring-[#FF7F50] focus:border-[#FF7F50] rounded-xl"
                  />
                </div>
                
                <Button 
                  className="bg-gradient-to-r from-[#FF7F50] to-[#FF5F35] hover:opacity-90 text-white whitespace-nowrap group rounded-xl"
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
                <Button className="bg-gradient-to-r from-[#FF7F50] to-[#FF5F35] hover:opacity-90 text-white py-6 rounded-xl text-lg w-full shadow-lg hover:shadow-[#FF7F50]/30 transition-all hover:translate-y-[-2px]">
                  Get Started — It's Free
                </Button>
              </Link>
              <Link to="/examples" className="flex-1">
                <Button variant="outline" className="py-6 text-lg w-full hover:bg-gray-50 transition-all hover:translate-y-[-2px] border-gray-200 rounded-xl text-gray-700">
                  See Examples
                </Button>
              </Link>
            </div>
            
            {/* Scroll indicator */}
            <button 
              onClick={scrollToNextSection}
              className="mt-16 inline-flex flex-col items-center text-gray-500 hover:text-[#FF7F50] transition-colors animate-bounce"
              style={{ animationDuration: '2s' }}
            >
              <span className="text-sm mb-2">Scroll to discover</span>
              <ArrowDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
