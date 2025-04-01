
import { LayoutGrid, Settings, BarChart, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const SimpleSidebar = () => {
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
    <div className="min-h-screen w-[240px] border-r bg-white hidden md:block">
      <div className="py-6 px-3 space-y-6">
        <div className="space-y-4">
          {/* Navigation Links */}
          <div className="space-y-1">
            <Link 
              to="/dashboard" 
              className={cn(
                "flex items-center px-3 py-2 rounded-md transition-colors",
                isActive("/dashboard") 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-gray-700 hover:bg-gray-100 hover:text-primary"
              )}
            >
              <LayoutGrid className="mr-3 h-5 w-5" />
              <span className="text-sm">Dashboard</span>
            </Link>
            
            <Link 
              to="/dashboard/analytics" 
              className={cn(
                "flex items-center px-3 py-2 rounded-md transition-colors",
                isActive("/dashboard/analytics") 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-gray-700 hover:bg-gray-100 hover:text-primary"
              )}
            >
              <BarChart className="mr-3 h-5 w-5" />
              <span className="text-sm">Analytics</span>
            </Link>
            
            <Link 
              to="/dashboard/theme" 
              className={cn(
                "flex items-center px-3 py-2 rounded-md transition-colors",
                isActive("/dashboard/theme") 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-gray-700 hover:bg-gray-100 hover:text-primary"
              )}
            >
              <Palette className="mr-3 h-5 w-5" />
              <span className="text-sm">Theme</span>
            </Link>
            
            <Link 
              to="/dashboard/settings" 
              className={cn(
                "flex items-center px-3 py-2 rounded-md transition-colors",
                isActive("/dashboard/settings") 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-gray-700 hover:bg-gray-100 hover:text-primary"
              )}
            >
              <Settings className="mr-3 h-5 w-5" />
              <span className="text-sm">Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleSidebar;
