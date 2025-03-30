
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
      <div className="py-8 px-4 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#5271ff]">MYMI.bio</h1>
        </div>
        <div className="space-y-6">
          {/* Navigation Links */}
          <div className="space-y-2.5">
            <Link 
              to="/dashboard" 
              className={cn(
                "flex items-center px-4 py-3 rounded-full transition-all",
                isActive("/dashboard") 
                  ? "bg-[#5271ff]/10 text-[#5271ff] font-medium shadow-sm" 
                  : "text-gray-700 hover:bg-gray-100 hover:text-[#5271ff]"
              )}
            >
              <LayoutGrid className="mr-3 h-5 w-5" />
              <span className="text-sm">Dashboard</span>
            </Link>
            
            <Link 
              to="/dashboard/analytics" 
              className={cn(
                "flex items-center px-4 py-3 rounded-full transition-all",
                isActive("/dashboard/analytics") 
                  ? "bg-[#5271ff]/10 text-[#5271ff] font-medium shadow-sm" 
                  : "text-gray-700 hover:bg-gray-100 hover:text-[#5271ff]"
              )}
            >
              <BarChart className="mr-3 h-5 w-5" />
              <span className="text-sm">Analytics</span>
            </Link>
            
            <Link 
              to="/dashboard/theme" 
              className={cn(
                "flex items-center px-4 py-3 rounded-full transition-all",
                isActive("/dashboard/theme") 
                  ? "bg-[#5271ff]/10 text-[#5271ff] font-medium shadow-sm" 
                  : "text-gray-700 hover:bg-gray-100 hover:text-[#5271ff]"
              )}
            >
              <Palette className="mr-3 h-5 w-5" />
              <span className="text-sm">Theme</span>
            </Link>
            
            <Link 
              to="/dashboard/settings" 
              className={cn(
                "flex items-center px-4 py-3 rounded-full transition-all",
                isActive("/dashboard/settings") 
                  ? "bg-[#5271ff]/10 text-[#5271ff] font-medium shadow-sm" 
                  : "text-gray-700 hover:bg-gray-100 hover:text-[#5271ff]"
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
