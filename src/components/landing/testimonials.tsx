
import { useEffect, useState, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Fashion Influencer",
    image: "/placeholder.svg",
    content:
      "Influencify has completely transformed how I monetize my Instagram following. Since I started using it, my conversion rates have increased by 40%!",
    stars: 5,
  },
  {
    name: "Samantha Lee",
    role: "Beauty Blogger",
    image: "/placeholder.svg",
    content:
      "The customization options are incredible. I can match my link page perfectly with my brand aesthetic, and my followers absolutely love it.",
    stars: 5,
  },
  {
    name: "Marcus Williams",
    role: "Fitness Coach",
    image: "/placeholder.svg",
    content:
      "I was skeptical at first, but after seeing a 50% increase in affiliate conversions in the first month, I'm completely sold. Best decision I've made for my business.",
    stars: 5,
  },
  {
    name: "Emma Rodriguez",
    role: "Travel Influencer",
    image: "/placeholder.svg",
    content:
      "The analytics features help me understand exactly which products are performing best. This has helped me optimize my recommendations and increase my earnings.",
    stars: 4,
  },
];

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
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
    <section
      ref={sectionRef}
      className="py-24 bg-white relative overflow-hidden"
      id="testimonials"
    >
      {/* Background elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#FFE6D9] opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#FFE6D9] opacity-30 rounded-full blur-3xl"></div>

      <div className="container px-4 md:px-6">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center justify-center rounded-full bg-[#FFE6D9] px-3 py-1 text-sm font-medium text-[#FF7F50] mb-4">
            <span>Our Happy Customers</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            What <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7F50] to-[#FF5F35]">Influencers</span> Say About Us
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of influencers who are already growing their business with Influencify
          </p>
        </div>

        <div
          className={`mx-auto max-w-7xl transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full">
                    <Card className="rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow h-full">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-[#FFD6C3] to-[#FFE6D9]">
                            <Quote className="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#FF7F50]/70" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                            <p className="text-gray-500 text-sm">{testimonial.role}</p>
                          </div>
                        </div>
                        
                        <div className="flex mb-4">
                          {Array.from({ length: testimonial.stars }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-[#FFAA80] fill-[#FFAA80]"
                            />
                          ))}
                        </div>
                        
                        <blockquote className="flex-1 text-gray-700 italic">
                          "{testimonial.content}"
                        </blockquote>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-2">
              <CarouselPrevious 
                className="relative left-0 right-auto mr-2 bg-white border-gray-200 hover:bg-[#FFE6D9] hover:border-[#FFD6C3] hover:text-[#FF7F50]" 
              />
              <CarouselNext 
                className="relative right-0 left-auto ml-2 bg-white border-gray-200 hover:bg-[#FFE6D9] hover:border-[#FFD6C3] hover:text-[#FF7F50]" 
              />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
