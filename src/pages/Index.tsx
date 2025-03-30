
import Navbar from "@/components/ui/navbar";
import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import HowItWorks from "@/components/landing/how-it-works";
import Testimonials from "@/components/landing/testimonials";
import PricingSection from "@/components/landing/pricing";
import Footer from "@/components/landing/footer";
import { useEffect, lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load components that are not above the fold
const LazyFeatures = lazy(() => import("@/components/landing/features"));
const LazyHowItWorks = lazy(() => import("@/components/landing/how-it-works"));
const LazyTestimonials = lazy(() => import("@/components/landing/testimonials"));
const LazyPricingSection = lazy(() => import("@/components/landing/pricing"));
const LazyFooter = lazy(() => import("@/components/landing/footer"));

// Loading fallback component
const SectionSkeleton = () => (
  <div className="w-full py-16">
    <div className="max-w-6xl mx-auto px-4">
      <Skeleton className="h-8 w-64 mb-6 mx-auto" />
      <Skeleton className="h-4 w-full max-w-2xl mx-auto mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-64 rounded-xl" />
        ))}
      </div>
    </div>
  </div>
);

const Index = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Preload components after initial page load
    const timer = setTimeout(() => {
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
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        {/* Critical path - render immediately */}
        <Hero />
        
        {/* Lazily load below-the-fold content */}
        <Suspense fallback={<SectionSkeleton />}>
          <LazyFeatures />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <LazyHowItWorks />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <LazyTestimonials />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <LazyPricingSection />
        </Suspense>
      </main>
      
      <Suspense fallback={<SectionSkeleton />}>
        <LazyFooter />
      </Suspense>
    </div>
  );
};

export default Index;
