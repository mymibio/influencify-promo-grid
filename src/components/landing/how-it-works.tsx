
import { useEffect, useState, useRef } from "react";
import { Check, ArrowRight } from "lucide-react";

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
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            const elements = document.querySelectorAll(".step-item");
            elements.forEach((el, i) => {
              setTimeout(() => {
                const index = parseInt(el.getAttribute("data-index") || "0");
                setVisibleItems((prev) => [...prev, index]);
              }, i * 200);
            });
          }, 200);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#FFF9F4] relative overflow-hidden" id="how-it-works">
      {/* Background elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FFE6D9] opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FFE6D9] opacity-30 rounded-full blur-3xl"></div>
      
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7F50] to-[#FF5F35]">Works</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Get started in just three simple steps
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line */}
          <div className="absolute top-24 left-1/2 h-[calc(100%-8rem)] w-0.5 bg-gradient-to-b from-[#FFE6D9] via-[#FFD6C3] to-[#FFE6D9] -translate-x-1/2 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10">
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
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FF7F50] to-[#FF5F35] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-[#FF7F50]/20">
                    {step.number}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                
                {/* Feature highlights */}
                <div className="mt-6 bg-white p-5 rounded-xl w-full shadow-sm border border-gray-100">
                  <ul className="space-y-3 text-left">
                    {[1, 2, 3].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <div className="mt-1 bg-[#FFE6D9] rounded-full p-1">
                          <Check className="h-3 w-3 text-[#FF7F50]" />
                        </div>
                        <span className="text-sm text-gray-600">Feature {item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Next step arrow - only show between steps */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:flex justify-center mt-8">
                      <ArrowRight className="h-6 w-6 text-[#FFB499]" />
                    </div>
                  )}
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
