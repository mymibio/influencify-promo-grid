
import { useState, useEffect, useRef } from "react";
import { Check, BarChart, Palette, Link as LinkIcon, Users, Zap, Globe, Award, Shield } from "lucide-react";

const features = [
  {
    title: "Beautiful Link Pages",
    description: "Showcase your promotions in a visually stunning, responsive layout that captures attention.",
    icon: <Palette className="h-6 w-6 text-brand-purple" />
  },
  {
    title: "Multiple Card Formats",
    description: "Choose between square or vertical cards to best showcase your products and promotions.",
    icon: <Award className="h-6 w-6 text-brand-purple" />
  },
  {
    title: "Easy Coupon Sharing",
    description: "Provide exclusive discount codes to your followers with one-click copy functionality.",
    icon: <LinkIcon className="h-6 w-6 text-brand-purple" />
  },
  {
    title: "Custom Branding",
    description: "Match your page to your personal brand with customizable colors, fonts, and layout options.",
    icon: <Globe className="h-6 w-6 text-brand-purple" />
  },
  {
    title: "Performance Analytics",
    description: "Track clicks, conversions, and engagement to optimize your promotional strategy.",
    icon: <BarChart className="h-6 w-6 text-brand-purple" />
  },
  {
    title: "Direct Product Links",
    description: "Send followers directly to product pages with trackable affiliate links.",
    icon: <Zap className="h-6 w-6 text-brand-purple" />
  }
];

const Features = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const timeout = setTimeout(() => {
            const elements = document.querySelectorAll(".feature-card");
            elements.forEach((el, i) => {
              setTimeout(() => {
                setVisibleItems((prev) => [...prev, i]);
              }, i * 100);
            });
          }, 300);
          return () => clearTimeout(timeout);
        }
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <section className="py-24 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden" id="features">
      {/* Background elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-brand-purple opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-brand-light-purple opacity-5 rounded-full blur-3xl"></div>
      
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center rounded-full bg-brand-purple/10 px-3 py-1 text-sm font-semibold text-brand-purple mb-4">
            <span>Powerful Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-light-purple">Monetize Your Following</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform is designed specifically for influencers looking to maximize their promotional opportunities.
          </p>
        </div>
        
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`feature-card bg-white rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 ${
                visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              } hover:-translate-y-1`}
            >
              <div className="p-6">
                <div className="bg-brand-purple/10 rounded-full p-3 inline-block mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                
                <ul className="mt-6 space-y-2">
                  {[1, 2, 3].map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="h-4 w-4 text-brand-purple" />
                      <span>Feature subpoint {point}</span>
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

export default Features;
