
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
              <h2 className="text-3xl font-bold tracking-tight animate-fade-in">
                How It Works
              </h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                Get started in just three simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{animationDelay: "100ms"}}>
                <div className="h-12 w-12 bg-brand-purple/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-brand-purple font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Create Your Account</h3>
                <p className="text-muted-foreground">
                  Sign up for free and set up your profile with your name, bio, and social links.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{animationDelay: "200ms"}}>
                <div className="h-12 w-12 bg-brand-purple/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-brand-purple font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Add Your Products</h3>
                <p className="text-muted-foreground">
                  Upload products and coupons with images, links, and discount codes.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{animationDelay: "300ms"}}>
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
        <section className="py-16 bg-gradient-to-r from-brand-purple to-brand-dark-purple text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAgOCkiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMS4yNSIgY3g9IjE3NiIgY3k9IjEyIiByPSI0Ii8+PHBhdGggZD0iTTIwLjUuNWwyMyAxMW0tMjkgODRsLTMuNzkgMTAuMzc3TTI3LjAzNyAxMzEuNGw1Ljg5OCAyLjIwMy0zLjQ2IDUuOTQ3IDYuMDcyIDIuMzkyLTMuOTMzIDUuNzU4bTEyOC43MzMgMzUuMzdsLjY5My05LjMxNiAxMC4yOTIuMDUyLjQxNi05LjIyMiA5LjI3NC4zMzJNLjUgNDguNXM2LjEzMSA2LjQxMyA2Ljg0NyAxNC44MDVjLjcxNSA4LjM5My0yLjUyIDE0LjgwNi0yLjUyIDE0LjgwNk0xMjQuNTU1IDkwcy03LjQ0NCAwLTEzLjY3IDYuMTkyYy02LjIyNyA2LjE5Mi00LjgzOCAxMi4wMTItNC44MzggMTIuMDEybTIuMjQgNjguNjI2cy00LjAyNi05LjAyNS0xOC4xNDUtOS4wMjUtMTguMTQ1IDUuNy0xOC4xNDUgNS43IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMS4yNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTg1LjcxNiAzNi4xNDZsNS4yNDMtOS41MjFoMTEuMDkzbDUuNDE2IDkuNTIxLTUuNDEgOS4xODVIOTAuOTUzbC01LjIzNy05LjE4NXptNjMuOTA5IDE1LjQ3OWgxMC43NXYxMC43NWgtMTAuNzV6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxjaXJjbGUgZmlsbD0iI2ZmZiIgY3g9IjcxLjUiIGN5PSI3LjUiIHI9IjMuNSIvPjxjaXJjbGUgZmlsbD0iI2ZmZiIgY3g9IjE3MC41IiBjeT0iOTUuNSIgcj0iMy41Ii8+PGNpcmNsZSBmaWxsPSIjZmZmIiBjeD0iODEuNSIgY3k9IjEzNC41IiByPSIzLjUiLz48Y2lyY2xlIGZpbGw9IiNmZmYiIGN4PSIxMy41IiBjeT0iMjMuNSIgcj0iMy41Ii8+PHBhdGggZD0iTTkzIDcxaDN2M2gtM3ptMzMgODRoM3YzaC0zem0tODUgMThoM3YzaC0zeiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0zOS4zODQgNTEuMTIybDUuNzU4LTQuNDU0IDYuNDUzIDQuMjA1LTIuMjk0IDcuMzYzaC03Ljc5bC0yLjEyNy03LjExNHpNMTMwLjE5NSA0LjAzbDEzLjgzIDUuMDYyLTEwLjA5IDcuMDQ4LTMuNzQtMTIuMTF6bS04MyA5NWwxNC44MyA1LjQyOS0xMC44MiA3LjU1Ny00LjAxLTEyLjk4N3pNNS4yMTMgMTYxLjQ5NWwxMS4zMjggMjAuODk3TDIuMjY1IDE4MGwyLjk0OC0xOC41MDV6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxwYXRoIGQ9Ik0xNDkuMDUgMTI3LjQ2OHMtLjUxIDIuMTgzLjk5NSAzLjM2NmMxLjU2IDEuMjI2IDguNjQyLTEuODk1IDMuOTY3LTcuNzg1LTIuMzY3LTIuNDc3LTYuNS0zLjIyNi05LjMzIDAtNS4yMDggNS45MzYgMCAxNy41MSAxMS42MSAxMy43MyAxMi40NTgtNi4yNTcgNS42MzMtMjEuNjU2LTUuMDczLTIyLjY1NC02LjYwMi0uNjA2LTE0LjA0MyAxLjc1Ni0xNi4xNTcgMTAuMjY4LTEuNzE4IDYuOTIgMS41ODQgMTcuMzg3IDEyLjQ1IDIwLjQ3NiAxMC44NjYgMy4wOSAxOS4zMzEtNC4zMSAxOS4zMzEtNC4zMSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEuMjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz48L3N2Zz4=')] opacity-10 bg-center"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2 animate-fade-in">
                <h2 className="text-3xl font-bold tracking-tight">
                  Ready to Boost Your Influence?
                </h2>
                <p className="mx-auto max-w-[700px] text-white/80 md:text-xl mt-4">
                  Join thousands of influencers who are monetizing their social media presence.
                </p>
              </div>
              {/* Removed the "Get Started For Free" button */}
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
