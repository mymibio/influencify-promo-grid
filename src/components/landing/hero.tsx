
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDown } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Hero = () => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Reset the error when the username changes
  useEffect(() => {
    if (usernameError) {
      setUsernameError("");
    }
  }, [username]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow lowercase letters, numbers, and underscores
    const sanitizedUsername = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "");
    
    if (sanitizedUsername !== e.target.value) {
      toast.info("Username can only contain lowercase letters, numbers, and underscores");
    }
    
    setUsername(sanitizedUsername);
    
    // Clear any error when typing
    if (usernameError) {
      setUsernameError("");
    }
  };

  const checkUsernameAndNavigate = async () => {
    console.log("Starting username check");
    
    if (!username) {
      setUsernameError("Please enter a username");
      toast.error("Please enter a username");
      setIsChecking(false);
      return;
    }

    if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters");
      toast.error("Username must be at least 3 characters");
      setIsChecking(false);
      return;
    }

    try {
      console.log("Checking username availability:", username);
      const { data, error } = await supabase
        .from('user_profiles')
        .select('username')
        .eq('username', username)
        .maybeSingle();
      
      console.log("Check result:", { data, error });
      
      if (error) {
        console.error("Database error:", error);
        throw error;
      }
      
      if (data) {
        setUsernameError("Username is already taken. Please choose another one.");
        toast.error("Username is already taken. Please choose another one.");
        setIsChecking(false);
        return;
      }
      
      toast.success("Username is available! Redirecting to sign up...");
      console.log("Username is available, redirecting to signup");
      
      // Navigate to signup page with username parameter
      navigate(`/signup?username=${encodeURIComponent(username)}`);
    } catch (error) {
      console.error("Error checking username:", error);
      setUsernameError("Error checking username availability");
      toast.error("Error checking username availability");
      setIsChecking(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsChecking(true);
    checkUsernameAndNavigate();
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const scrollToNextSection = () => {
    const nextSection = heroRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={heroRef} className="relative bg-gradient-to-b from-white to-gray-50 min-h-screen flex flex-col items-center justify-center pt-20 pb-12 md:py-40 px-4">
      {/* Desktop background effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute bg-brand-blue/20 rounded-full filter blur-3xl"
          style={{
            top: "40%",
            left: "-10%",
            width: "300px",
            height: "300px",
          }}
        />
        <div
          className="absolute bg-brand-purple/20 rounded-full filter blur-3xl"
          style={{
            bottom: "20%",
            right: "-20%",
            width: "400px",
            height: "400px",
          }}
        />
      </div>
      
      <div className="z-10 container mx-auto flex flex-col items-center justify-center text-center px-4">
        <h1 className={`text-4xl md:text-6xl font-bold tracking-tight transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          Your Online Identity, <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5271FF] to-[#5427DB]">
            All in One Link
          </span>
        </h1>
        
        <p className={`mt-6 text-xl md:text-2xl text-gray-600 max-w-2xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          Create a customizable landing page for all your important links,
          social media profiles, and more. Share a single link with your audience.
        </p>
        
        <form 
          onSubmit={handleFormSubmit} 
          className={`w-full max-w-md mt-12 bg-white p-4 md:p-6 rounded-3xl shadow-xl border border-gray-50 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
        >
          <div className="text-left mb-4">
            <h2 className="text-xl font-bold text-gray-900">Claim your link</h2>
            <p className="text-sm text-gray-500 mt-1">Check if your username is available</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <div className="flex items-center">
                <div className="px-3 py-2 bg-gray-100 border border-r-0 rounded-l-lg text-gray-500 text-sm">
                  yourbio.link/
                </div>
                <Input 
                  value={username}
                  onChange={handleUsernameChange}
                  className="rounded-l-none border-l-0"
                  placeholder="yourname" 
                />
              </div>
              {usernameError && (
                <p className="absolute text-xs text-red-500 mt-1">{usernameError}</p>
              )}
            </div>
            <Button 
              type="submit"
              disabled={isChecking} 
              className="bg-[#5271FF] hover:bg-[#4262EA] text-white py-2 px-4 rounded-lg transition-colors"
            >
              {isChecking ? "Checking..." : "Claim It"}
            </Button>
          </div>
          
          <div className="flex justify-center mt-4">
            <Button 
              type="button"
              onClick={handleSignUpClick} 
              className="bg-transparent hover:bg-gray-50 text-[#5271FF] font-semibold py-2 px-4 border border-[#5271FF] rounded-lg transition-colors"
            >
              Get Started
            </Button>
          </div>
        </form>
        
        <div className={`mt-12 md:mt-20 flex flex-col items-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button 
            onClick={scrollToNextSection}
            className="flex flex-col items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
          >
            <span className="text-sm mb-2">See how it works</span>
            <ArrowDown className="animate-bounce" />
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 hidden md:flex justify-center overflow-hidden">
        <div className="w-full max-w-5xl relative">
          {/* Phone mockup */}
          <img
            src="/images/iphone-mockup.png"
            alt="iPhone Mockup"
            className="w-full"
          />
          
          {/* Animated Phone Screen */}
          <div className="absolute transform -translate-x-1/2 left-1/2 bottom-0 w-64 pb-12 transition-all duration-1000 delay-1000 translate-y-0 z-20">
            <div className="bg-white rounded-t-xl shadow-2xl overflow-hidden">
              {/* Phone Header */}
              <div className="bg-gray-50 h-10 flex items-center justify-center border-b">
                <span className="text-sm text-gray-500">
                  yourbio.link/{username || "yourname"}
                </span>
              </div>
              
              {/* Content Preview */}
              <div className="bg-white p-3">
                {/* Profile Preview */}
                <div className="flex flex-col items-center mb-4">
                  <div className="w-16 h-16 bg-[#5271FF]/10 rounded-full flex items-center justify-center mb-2">
                    <span className="text-lg font-bold text-[#5271FF]">
                      {username ? username.substring(0, 2).toUpperCase() : "MY"}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm">
                    {username || "yourname"}
                  </h3>
                  <p className="text-xs text-gray-500">Digital Creator</p>
                </div>
                
                {/* Links Preview */}
                <div className="space-y-2">
                  <Button className="w-full justify-start text-sm rounded-full bg-gray-50 border shadow-none hover:bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <rect width="20" height="8" x="2" y="4" rx="1" ry="1"></rect>
                      <path d="M2 16h20"></path>
                      <rect width="20" height="8" x="2" y="12" rx="1" ry="1"></rect>
                    </svg>
                    My Portfolio
                  </Button>
                  <Button className="w-full justify-start text-sm rounded-full bg-gray-50 border shadow-none hover:bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M16 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2"></path>
                      <path d="M15 9h6"></path>
                      <path d="M15 13h6"></path>
                      <path d="M4 9h5v12H4z"></path>
                    </svg>
                    YouTube Channel
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 w-full z-10">
            <div className="flex justify-between px-8 pb-8">
              <div className="flex flex-col items-center text-xs text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span>Profile</span>
              </div>
              <div className="flex flex-col items-center text-xs text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path><path d="M12 5v14"></path><path d="M12 8v14"></path></svg>
                <span>Links</span>
              </div>
              <div className="flex flex-col items-center text-xs text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h20v6H2z"></path><path d="M2 15h20v6H2z"></path><path d="M7 3v18"></path><path d="M17 3v18"></path></svg>
                <span>Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
