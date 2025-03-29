
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  
  // Don't render navbar on the index page
  if (location.pathname === "/") {
    return null;
  }
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center font-bold text-xl">
            <span className="text-brand-purple">Influencify</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" className="hover:text-brand-purple transition-colors">
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-brand-purple hover:bg-brand-dark-purple">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
