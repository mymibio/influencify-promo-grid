
import { useState, useEffect } from "react";
import { Check, Star, TrendingUp, BarChart, Palette, Link } from "lucide-react";

const features = [
  {
    title: "Beautiful Pinterest-Style Grid",
    description: "Showcase your promotions in a visually stunning, responsive layout that captures attention.",
    icon: <Palette className="h-6 w-6 text-brand-purple" />
  },
  {
    title: "Multiple Card Formats",
    description: "Choose between 1:1 square cards or 9:16 vertical cards to best showcase your products.",
    icon: <Star className="h-6 w-6 text-brand-purple" />
  },
  {
    title: "Easy Coupon Sharing",
    description: "Provide exclusive discount codes to your followers with one-click copy functionality.",
    icon: <Link className="h-6 w-6 text-brand-purple" />
  },
  {
    title: "Custom Branding",
    description: "Match your page to your personal brand with customizable colors, fonts, and layout options.",
    icon: <Palette className="h-6 w-6 text-brand-purple" />
  },
  {
    title: "Performance Analytics",
    description: "Track clicks, conversions, and engagement to optimize your promotional strategy.",
    icon: <BarChart className="h-6 w-6 text-brand-purple" />
  },
  {
    title: "Direct Product Links",
    description: "Send followers directly to product pages with trackable affiliate links.",
    icon: <TrendingUp className="h-6 w-6 text-brand-purple" />
  }
];

const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  delay 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  delay: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div 
      className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 transition-all duration-700 transform hover:shadow-xl hover:-translate-y-1 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="mt-1 bg-brand-purple/10 rounded-full p-2">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-muted-foreground mt-2">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="py-20 relative overflow-hidden" id="features">
      {/* Background elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-brand-purple opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-brand-light-purple opacity-5 rounded-full blur-3xl"></div>
      
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center rounded-full bg-brand-purple/10 px-3 py-1 text-sm font-semibold text-brand-purple mb-4">
            <span>Powerful Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight animate-fade-in">
            Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-light-purple">Monetize Your Following</span>
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform is designed specifically for influencers looking to maximize their promotional opportunities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              title={feature.title} 
              description={feature.description} 
              icon={feature.icon}
              delay={100 + index * 100} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

