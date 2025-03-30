
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started",
      price: { monthly: "$0", yearly: "$0" },
      features: [
        "1 Bio Link Page",
        "5 Product Cards",
        "Basic Analytics",
        "Standard Support"
      ],
      cta: "Get Started",
      popular: false,
      link: "/signup"
    },
    {
      name: "Pro",
      description: "For serious creators",
      price: { monthly: "$9", yearly: "$90" },
      features: [
        "Unlimited Bio Link Pages",
        "Unlimited Product Cards",
        "Advanced Analytics",
        "Priority Support",
        "Custom Domain",
        "No Influencify Branding"
      ],
      cta: "Start Free Trial",
      popular: true,
      link: "/signup?plan=pro"
    },
    {
      name: "Business",
      description: "For teams and agencies",
      price: { monthly: "$29", yearly: "$290" },
      features: [
        "Everything in Pro",
        "Team Collaboration",
        "API Access",
        "White Label Solution",
        "Dedicated Account Manager",
        "Early Access to Features"
      ],
      cta: "Contact Sales",
      popular: false,
      link: "/contact"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-[#FFF9F4] relative overflow-hidden" id="pricing">
      {/* Background elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FFE6D9] opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FFE6D9] opacity-30 rounded-full blur-3xl"></div>
      
      <div className="container px-4 md:px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center justify-center rounded-full bg-[#FFE6D9] px-3 py-1 text-sm font-medium text-[#FF7F50] mb-4">
            <span>Pricing</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7F50] to-[#FF5F35]">Transparent</span> Pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that's right for your growing business
          </p>
          
          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center bg-white p-1.5 rounded-full shadow-sm border border-gray-100">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
                !isYearly ? "bg-[#FFE6D9] text-[#FF7F50] shadow-sm" : "text-gray-600"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
                isYearly ? "bg-[#FFE6D9] text-[#FF7F50] shadow-sm" : "text-gray-600"
              }`}
            >
              Yearly <span className="text-xs text-green-600 font-normal">Save 16%</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`flex flex-col rounded-2xl overflow-hidden transition-all duration-1000 delay-300 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              } ${
                plan.popular ? "border-2 border-[#FF7F50] shadow-xl shadow-[#FF7F50]/10" : "border border-gray-200 shadow-lg"
              }`}
              style={{ transitionDelay: `${index * 150 + 300}ms` }}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-[#FF7F50] to-[#FF5F35] text-white text-xs font-bold uppercase tracking-wider text-center py-2">
                  Most Popular
                </div>
              )}
              <div className={`p-6 flex-grow flex flex-col ${plan.popular ? "bg-[#FFF5EE]" : "bg-white"}`}>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-gray-600 mt-1">{plan.description}</p>
                <div className="mt-5 mb-6">
                  <span className="text-4xl font-bold">{isYearly ? plan.price.yearly : plan.price.monthly}</span>
                  <span className="text-gray-500 ml-2">{plan.name !== "Free" ? `/${isYearly ? "year" : "month"}` : ""}</span>
                </div>
                
                <div className="flex-grow">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className={`mt-1 rounded-full p-1 ${plan.popular ? "text-[#FF7F50]" : "text-gray-600"}`}>
                          <Check className="h-4 w-4" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link to={plan.link}>
                  <Button 
                    className={`w-full py-5 rounded-xl ${
                      plan.popular 
                        ? "bg-gradient-to-r from-[#FF7F50] to-[#FF5F35] hover:opacity-90 text-white shadow-lg shadow-[#FF7F50]/20" 
                        : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-800"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,192L48,176C96,160,192,128,288,133.3C384,139,480,181,576,181.3C672,181,768,139,864,122.7C960,107,1056,117,1152,133.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default PricingSection;
