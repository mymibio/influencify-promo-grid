
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/95 shadow-sm backdrop-blur-sm" : "bg-transparent"
    }`}>
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center font-bold text-xl">
            <span className="text-brand-purple">Influencify</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="#features" className="text-sm font-medium hover:text-brand-purple transition-colors">
            Features
          </Link>
          <Link to="#how-it-works" className="text-sm font-medium hover:text-brand-purple transition-colors">
            How It Works
          </Link>
          <Link to="#pricing" className="text-sm font-medium hover:text-brand-purple transition-colors">
            Pricing
          </Link>
          <Link to="/login">
            <Button variant="outline" className="ml-2">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-brand-purple hover:bg-brand-dark-purple">
              Sign Up
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b p-4 shadow-lg animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link
                to="#features"
                className="text-sm font-medium hover:text-brand-purple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                to="#how-it-works"
                className="text-sm font-medium hover:text-brand-purple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                to="#pricing"
                className="text-sm font-medium hover:text-brand-purple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-brand-purple hover:bg-brand-dark-purple">
                  Sign Up
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
