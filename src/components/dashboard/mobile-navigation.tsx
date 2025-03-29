
import React from "react";
import { Link } from "react-router-dom";
import { LayoutGrid, BarChart, Palette, Settings } from "lucide-react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const MobileNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isActive = (path: string) => {
    if (path === "/dashboard" && currentPath === "/dashboard") {
      return true;
    }
    if (path !== "/dashboard" && currentPath.includes(path)) {
      return true;
    }
    return false;
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden z-40">
      <nav className="flex justify-around items-center h-16">
        <Link 
          to="/dashboard" 
          className={cn(
            "flex flex-col items-center justify-center w-full py-2",
            isActive("/dashboard") ? "text-primary" : "text-muted-foreground"
          )}
        >
          <LayoutGrid size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link 
          to="/dashboard/analytics" 
          className={cn(
            "flex flex-col items-center justify-center w-full py-2",
            isActive("/dashboard/analytics") ? "text-primary" : "text-muted-foreground"
          )}
        >
          <BarChart size={24} />
          <span className="text-xs mt-1">Analytics</span>
        </Link>
        
        <Link 
          to="/dashboard/theme" 
          className={cn(
            "flex flex-col items-center justify-center w-full py-2",
            isActive("/dashboard/theme") ? "text-primary" : "text-muted-foreground"
          )}
        >
          <Palette size={24} />
          <span className="text-xs mt-1">Theme</span>
        </Link>
        
        <Link 
          to="/dashboard/settings" 
          className={cn(
            "flex flex-col items-center justify-center w-full py-2",
            isActive("/dashboard/settings") ? "text-primary" : "text-muted-foreground"
          )}
        >
          <Settings size={24} />
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </nav>
    </div>
  );
};

export default MobileNavigation;
