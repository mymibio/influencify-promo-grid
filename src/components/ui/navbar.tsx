
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  
  // Hide the navbar on login and signup pages
  const hideNavbarPaths = ["/login", "/signup"];
  if (hideNavbarPaths.includes(location.pathname)) {
    return null;
  }
  
  // Only show the navbar if we're not on the index page (separate logic)
  const isIndexPage = location.pathname === "/";
  
  if (!isIndexPage) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center font-bold text-xl">
              <span className="text-brand-purple">Influencify</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" className="hover:text-brand-purple transition-colors">
                    <User size={16} className="mr-2" /> Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="hover:text-brand-purple transition-colors"
                  onClick={() => {
                    signOut();
                    location.pathname !== "/" && window.location.assign("/");
                  }}
                >
                  <LogOut size={16} className="mr-2" /> Log Out
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </header>
    );
  }
  
  // For the index page, only display the hamburger menu
  return (
    <div className="fixed top-4 right-4 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full bg-white shadow-lg">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <div className="flex flex-col gap-4 py-4">
            {user ? (
              <>
                <SheetClose asChild>
                  <Link to="/dashboard" className="flex items-center px-4 py-2 hover:bg-accent rounded-md">
                    <User size={16} className="mr-2" /> Dashboard
                  </Link>
                </SheetClose>
                <div 
                  className="flex items-center px-4 py-2 hover:bg-accent rounded-md cursor-pointer"
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                >
                  <LogOut size={16} className="mr-2" /> Log Out
                </div>
              </>
            ) : (
              <>
                <SheetClose asChild>
                  <Link to="/login" className="flex items-center px-4 py-2 hover:bg-accent rounded-md">
                    Sign In
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/signup" className="flex items-center px-4 py-2 hover:bg-accent rounded-md">
                    Sign Up
                  </Link>
                </SheetClose>
              </>
            )}
            <SheetClose asChild>
              <Link to="/about" className="flex items-center px-4 py-2 hover:bg-accent rounded-md">
                About Us
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link to="/contact" className="flex items-center px-4 py-2 hover:bg-accent rounded-md">
                Contact Us
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link to="/demo" className="flex items-center px-4 py-2 hover:bg-accent rounded-md">
                Demo
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link to="/blogs" className="flex items-center px-4 py-2 hover:bg-accent rounded-md">
                Blogs
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navbar;
