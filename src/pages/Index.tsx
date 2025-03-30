
import { useEffect, useState, lazy, Suspense } from "react";
import Navbar from "@/components/ui/navbar";
import Hero from "@/components/landing/hero";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load components that are not above the fold
const LazyFeatures = lazy(() => import("@/components/landing/features"));
const LazyHowItWorks = lazy(() => import("@/components/landing/how-it-works"));
const LazyTestimonials = lazy(() => import("@/components/landing/testimonials"));
const LazyPricingSection = lazy(() => import("@/components/landing/pricing"));
const LazyFooter = lazy(() => import("@/components/landing/footer"));

// Loading fallback component
const SectionSkeleton = () => (
  <div className="w-full py-8">
    <div className="max-w-6xl mx-auto px-4">
      <Skeleton className="h-8 w-64 mb-4 mx-auto" />
      <Skeleton className="h-4 w-full max-w-2xl mx-auto mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-40 rounded-xl" />
        ))}
      </div>
    </div>
  </div>
);

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Mark page as loaded
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    // Preload components after initial page load
    const preloadTimer = setTimeout(() => {
      const links = [
        "/components/landing/features",
        "/components/landing/how-it-works",
        "/components/landing/testimonials",
        "/components/landing/pricing",
      ];
      
      links.forEach(link => {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'prefetch';
        preloadLink.href = link;
        document.head.appendChild(preloadLink);
      });
    }, 800);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(preloadTimer);
    };
  }, []);

  return (
    <div className={`min-h-screen flex flex-col bg-white overflow-x-hidden transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-brand-sky-blue rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-soft" style={{ animationDuration: '8s' }}></div>
          <div className="absolute bottom-40 right-10 w-80 h-80 bg-brand-light-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-soft" style={{ animationDuration: '12s' }}></div>
          
          <Suspense fallback={<SectionSkeleton />}>
            <LazyFeatures />
          </Suspense>
        </div>
        
        <div className="relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-40 right-20 w-72 h-72 bg-brand-sky-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-soft" style={{ animationDuration: '10s' }}></div>
          
          <Suspense fallback={<SectionSkeleton />}>
            <LazyHowItWorks />
          </Suspense>
        </div>
        
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute top-20 left-20 w-80 h-80 bg-brand-sky-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-soft" style={{ animationDuration: '15s' }}></div>
          
          <Suspense fallback={<SectionSkeleton />}>
            <LazyTestimonials />
          </Suspense>
        </div>
        
        <div className="relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-brand-sky-blue rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-soft" style={{ animationDuration: '12s' }}></div>
          
          <Suspense fallback={<SectionSkeleton />}>
            <LazyPricingSection />
          </Suspense>
        </div>
      </main>
      
      <Suspense fallback={<SectionSkeleton />}>
        <LazyFooter />
      </Suspense>
    </div>
  );
};

export default Index;
