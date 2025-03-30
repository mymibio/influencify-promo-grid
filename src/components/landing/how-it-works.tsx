
import { useEffect, useState } from "react";
import { Check } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Create Your Account",
    description: "Sign up for free and set up your profile with your name, bio, and social links.",
    icon: <Check className="h-5 w-5 text-white" />
  },
  {
    number: 2,
    title: "Add Your Products",
    description: "Upload products and coupons with images, links, and discount codes.",
    icon: <Check className="h-5 w-5 text-white" />
  },
  {
    number: 3,
    title: "Share Your Link",
    description: "Add your unique Influencify link to your Instagram bio and start earning.",
    icon: <Check className="h-5 w-5 text-white" />
  }
];

const HowItWorks = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setVisibleItems((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll(".step-item");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="how-it-works">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 opacity-30 rounded-full blur-3xl"></div>
      
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-light-purple">Works</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Get started in just three simple steps
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line */}
          <div className="absolute top-24 left-1/2 h-[calc(100%-8rem)] w-0.5 bg-gray-200 -translate-x-1/2 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                data-index={index}
                className={`step-item relative flex flex-col items-center text-center transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative z-10 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-purple to-brand-light-purple rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-brand-purple/20">
                    {step.number}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                
                {/* Feature highlights */}
                <div className="mt-6 bg-gray-50 p-4 rounded-lg w-full">
                  <ul className="space-y-2 text-left">
                    {[1, 2, 3].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <div className="mt-1 bg-green-100 rounded-full p-1">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-sm text-gray-600">Feature {item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
