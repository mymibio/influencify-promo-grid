
import Navbar from "@/components/ui/navbar";
import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        
        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">
                How It Works
              </h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                Get started in just three simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 bg-brand-purple/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-brand-purple font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Create Your Account</h3>
                <p className="text-muted-foreground">
                  Sign up for free and set up your profile with your name, bio, and social links.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 bg-brand-purple/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-brand-purple font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Add Your Products</h3>
                <p className="text-muted-foreground">
                  Upload products and coupons with images, links, and discount codes.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 bg-brand-purple/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-brand-purple font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Share Your Link</h3>
                <p className="text-muted-foreground">
                  Add your unique Influencify link to your Instagram bio and start earning.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-brand-purple text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                  Ready to Boost Your Influence?
                </h2>
                <p className="mx-auto max-w-[700px] text-white/80 md:text-xl mt-4">
                  Join thousands of influencers who are monetizing their social media presence.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link to="/signup">
                  <Button className="bg-white text-brand-purple hover:bg-white/90 px-8 py-2 rounded-lg">
                    Get Started For Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-8 border-t">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-muted-foreground">
                  © 2023 Influencify. All rights reserved.
                </p>
              </div>
              <div className="flex gap-6">
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms
                </Link>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy
                </Link>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
