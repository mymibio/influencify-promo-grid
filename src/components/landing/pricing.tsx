
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(document.querySelector(".pricing-container") as Element);
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
    <section className="py-24 bg-white relative overflow-hidden" id="pricing">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 opacity-30 rounded-full blur-3xl"></div>
      
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-light-purple">Transparent</span> Pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that's right for your growing business
          </p>
          
          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                !isYearly ? "bg-white shadow text-brand-purple" : "text-gray-600"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                isYearly ? "bg-white shadow text-brand-purple" : "text-gray-600"
              }`}
            >
              Yearly <span className="text-xs text-green-600 font-normal">Save 16%</span>
            </button>
          </div>
        </div>
        
        <div className={`pricing-container grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}>
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`flex flex-col border rounded-xl overflow-hidden ${
                plan.popular ? "border-brand-purple shadow-xl shadow-brand-purple/10" : "border-gray-200 shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="bg-brand-purple text-white text-xs font-bold uppercase tracking-wider text-center py-1.5">
                  Most Popular
                </div>
              )}
              <div className={`p-6 ${plan.popular ? "bg-brand-purple/5" : "bg-white"}`}>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-gray-600 mt-1">{plan.description}</p>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-bold">{isYearly ? plan.price.yearly : plan.price.monthly}</span>
                  <span className="text-gray-500 ml-2">{plan.name !== "Free" ? `/${isYearly ? "year" : "month"}` : ""}</span>
                </div>
                
                <Link to={plan.link}>
                  <Button 
                    className={`w-full py-5 ${
                      plan.popular 
                        ? "bg-brand-purple hover:bg-brand-dark-purple text-white" 
                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
              
              <div className="p-6 flex-1 bg-white">
                <p className="font-medium text-sm uppercase text-gray-500 tracking-wider mb-4">What's included:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className={`mt-1 rounded-full p-1 ${plan.popular ? "text-brand-purple" : "text-gray-600"}`}>
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
