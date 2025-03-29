
import React from "react";
import { Link } from "react-router-dom";
import { LayoutGrid, BarChart, Palette, Settings, Plus } from "lucide-react";
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
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center md:hidden">
      <nav className="flex items-center justify-around gap-1 rounded-full bg-white/90 backdrop-blur-md shadow-lg px-3 py-1 border border-gray-100" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.05)", transform: "translateY(0)" }}>
        <Link 
          to="/dashboard" 
          className={cn(
            "flex flex-col items-center justify-center rounded-full p-2 transition-all duration-200 hover:bg-gray-100",
            isActive("/dashboard") 
              ? "text-primary bg-primary/10 shadow-sm" 
              : "text-muted-foreground hover:text-primary"
          )}
        >
          <LayoutGrid size={20} />
          <span className="text-xs font-medium mt-1">Home</span>
        </Link>
        
        <Link 
          to="/dashboard/analytics" 
          className={cn(
            "flex flex-col items-center justify-center rounded-full p-2 transition-all duration-200 hover:bg-gray-100",
            isActive("/dashboard/analytics") 
              ? "text-primary bg-primary/10 shadow-sm" 
              : "text-muted-foreground hover:text-primary"
          )}
        >
          <BarChart size={20} />
          <span className="text-xs font-medium mt-1">Analytics</span>
        </Link>
        
        {/* Add Link Button in Middle */}
        <Link
          to="/dashboard/links"
          className="relative flex flex-col items-center justify-center"
        >
          <div className="absolute -top-6 rounded-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
            <Plus size={22} className="text-white" />
          </div>
          <div className="mt-6">
            <span className="text-xs font-medium text-primary">Add Link</span>
          </div>
        </Link>
        
        <Link 
          to="/dashboard/theme" 
          className={cn(
            "flex flex-col items-center justify-center rounded-full p-2 transition-all duration-200 hover:bg-gray-100",
            isActive("/dashboard/theme") 
              ? "text-primary bg-primary/10 shadow-sm" 
              : "text-muted-foreground hover:text-primary"
          )}
        >
          <Palette size={20} />
          <span className="text-xs font-medium mt-1">Theme</span>
        </Link>
        
        <Link 
          to="/dashboard/settings" 
          className={cn(
            "flex flex-col items-center justify-center rounded-full p-2 transition-all duration-200 hover:bg-gray-100",
            isActive("/dashboard/settings") 
              ? "text-primary bg-primary/10 shadow-sm" 
              : "text-muted-foreground hover:text-primary"
          )}
        >
          <Settings size={20} />
          <span className="text-xs font-medium mt-1">Settings</span>
        </Link>
      </nav>
    </div>
  );
};

export default MobileNavigation;
