import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle, Sparkles, Heart, Star, ArrowDown, ArrowLeft } from "lucide-react";

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
    const sanitizedValue = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "");
    setUsername(sanitizedValue);
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
      const { data, error } = await supabase
        .from('user_profiles')
        .select('username')
        .eq('username', username)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error("Error checking username:", error);
        setUsernameError("Error checking username availability");
        toast.error("Error checking username availability");
        setIsChecking(false);
        return;
      }
      
      if (data) {
        setUsernameError("Username is already taken. Please choose another one.");
        toast.error("Username is already taken. Please choose another one.");
        setIsChecking(false);
        return;
      }
      
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
      <div className="absolute inset-0 bg-gradient-to-b from-brand-sky-blue to-white -z-10"></div>
      
      <div className="absolute top-20 right-10 w-80 h-80 bg-brand-light-blue rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse-soft" style={{ animationDuration: '15s' }}></div>
      <div className="absolute -bottom-20 left-10 w-96 h-96 bg-brand-light-blue rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-soft" style={{ animationDuration: '20s' }}></div>
      <div className="absolute left-1/4 top-1/3 w-64 h-64 bg-brand-light-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-soft" style={{ animationDuration: '18s' }}></div>
      
      <div className="container px-4 md:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="flex flex-col items-start text-left">
            <div className={`inline-block mb-6 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-brand-blue transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Introducing MYMI.bio — Monetize your Instagram bio</span>
              </span>
            </div>
            
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight leading-tight transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              We make <span className="text-brand-blue">monetizing</span> your social presence <span className="text-brand-blue">better.</span>
            </h1>
            
            <p className={`max-w-[500px] text-muted-foreground text-lg md:text-xl mt-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              So you can share exclusive products with your followers and turn every click into a conversion.
            </p>
            
            <div className={`w-full max-w-md mt-12 bg-white p-4 md:p-6 rounded-3xl shadow-xl border border-gray-50 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <div className="flex gap-2 flex-col sm:flex-row">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                    mymi.bio/
                  </div>
                  <Input
                    type="text"
                    placeholder="yourname"
                    value={username}
                    onChange={handleUsernameChange}
                    className="pl-24 pr-4 bg-gray-50 border-gray-200 focus:ring-brand-blue focus:border-brand-blue rounded-xl"
                  />
                </div>
                
                <Button 
                  className="bg-brand-blue hover:opacity-90 text-white whitespace-nowrap group rounded-xl"
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
              
              {usernameError && (
                <div className="text-red-500 mt-2 text-sm">
                  {usernameError}
                </div>
              )}
              
              <div className="text-xs text-gray-500 mt-2 text-center">
                Claim your unique link before someone else takes it!
              </div>
            </div>
            
            <div className={`flex flex-col sm:flex-row gap-4 max-w-md w-full mt-8 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Link to="/signup" className="flex-1">
                <Button className="bg-brand-blue hover:opacity-90 text-white py-6 rounded-full text-lg w-full shadow-lg hover:shadow-brand-blue/30 transition-all hover:translate-y-[-2px]">
                  Get Started — It's Free
                </Button>
              </Link>
              <Link to="/examples" className="flex-1">
                <Button variant="outline" className="py-6 text-lg w-full hover:bg-gray-50 transition-all hover:translate-y-[-2px] border-gray-200 rounded-full text-gray-700">
                  See Examples
                </Button>
              </Link>
            </div>
          </div>
          
          <div className={`relative mx-auto w-full max-w-[320px] transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="phone-mockup border-[12px] border-black bg-white shadow-2xl">
              <div className="phone-notch"></div>
              
              <div className="relative w-full h-full overflow-hidden">
                <div className="flex justify-between px-6 py-1 text-xs bg-brand-blue text-white">
                  <div>9:41</div>
                  <div className="flex space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10a6 6 0 0 0-12 0v8h12z"></path><path d="M7 10v1"></path><path d="M17 10v1"></path><path d="M12 20v2"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21v-13a7 7 0 0 1 7-7h2a7 7 0 0 1 7 7v13"></path><path d="M17 21h1"></path><path d="M14 21h1"></path><path d="M7 21h1"></path><path d="M10 21h1"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 6c3.33-3.33 8.67-3.33 12 0 3.33 3.33 3.33 8.67 0 12-3.33 3.33-8.67 3.33-12 0-3.33-3.33-3.33-8.67 0-12z"></path><path d="M12 12v.01"></path><path d="M12 16v.01"></path><path d="M12 8v.01"></path></svg>
                  </div>
                </div>
                
                <div className="h-full bg-white flex flex-col">
                  <div className="flex justify-between items-center p-4 border-b border-gray-100">
                    <div className="h-8 w-8 rounded-full bg-brand-light-blue flex items-center justify-center text-brand-blue">
                      <ArrowLeft size={16} />
                    </div>
                    <div className="text-brand-blue font-medium">My Profile</div>
                    <div className="h-8 w-8 rounded-full bg-brand-light-blue flex items-center justify-center text-brand-blue">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-4 overflow-auto">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-24 h-24 rounded-full bg-brand-light-blue border-4 border-white shadow-lg overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-brand-blue to-brand-light-blue opacity-60"></div>
                      </div>
                      
                      <div className="text-xl font-bold text-center">@yourname</div>
                      
                      <div className="text-sm text-center text-gray-600 max-w-[200px]">
                        Turn your Instagram bio into a money-making machine with MYMI.bio
                      </div>
                      
                      <div className="w-full grid grid-cols-1 gap-4 mt-4">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 animate-float" style={{ animationDelay: '0s' }}>
                          <div className="h-36 bg-gradient-to-r from-brand-light-blue to-brand-sky-blue"></div>
                          <div className="p-3">
                            <div className="font-bold">Product Name</div>
                            <div className="text-sm text-gray-600">$49.99</div>
                            <Button className="w-full mt-2 bg-brand-blue text-white rounded-lg text-sm py-1">
                              Buy Now
                            </Button>
                          </div>
                        </div>
                        
                        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 animate-float" style={{ animationDelay: '0.2s' }}>
                          <div className="h-36 bg-gradient-to-r from-[#FFD6A5] to-[#FFEDCC]"></div>
                          <div className="p-3">
                            <div className="font-bold">Special Offer</div>
                            <div className="text-sm text-gray-600">$29.99</div>
                            <Button className="w-full mt-2 bg-[#FF9A3C] text-white rounded-lg text-sm py-1">
                              Claim Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 p-4 flex justify-around">
                    <div className="flex flex-col items-center text-xs text-brand-blue">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                      <span>Home</span>
                    </div>
                    <div className="flex flex-col items-center text-xs text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 21a6 6 0 0 0-12 0"></path><circle cx="12" cy="9" r="6"></circle></svg>
                      <span>Profile</span>
                    </div>
                    <div className="flex flex-col items-center text-xs text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                      <span>Links</span>
                    </div>
                    <div className="flex flex-col items-center text-xs text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                      <span>Add</span>
                    </div>
                  </div>
                </div>
                
                <div className="phone-nav-pill"></div>
              </div>
              
              <div className="absolute w-full h-8 bg-black/10 bottom-[-25px] blur-md rounded-full mx-auto left-0 right-0 scale-x-75"></div>
              
              <div className="absolute -top-6 -right-6 w-12 h-12 animate-float" style={{ animationDelay: '0.3s' }}>
                <Star className="text-yellow-400 w-full h-full drop-shadow-md" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-10 h-10 animate-float" style={{ animationDelay: '0.7s' }}>
                <Heart className="text-pink-400 w-full h-full drop-shadow-md" />
              </div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={scrollToNextSection}
          className="mt-16 inline-flex flex-col items-center text-gray-500 hover:text-brand-blue transition-colors animate-bounce mx-auto block"
          style={{ animationDuration: '2s' }}
        >
          <span className="text-sm mb-2">Scroll to discover</span>
          <ArrowDown className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
