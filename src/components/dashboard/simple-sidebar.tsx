
import { LayoutGrid, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const SimpleSidebar = () => {
  return (
    <div className="min-h-screen w-[240px] border-r bg-white hidden md:block">
      <div className="py-6 px-3 space-y-6">
        <div className="space-y-3">
          <Link 
            to="/dashboard" 
            className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <LayoutGrid className="mr-3 h-5 w-5" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          
          <Link 
            to="/dashboard/settings" 
            className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <Settings className="mr-3 h-5 w-5" />
            <span className="text-sm font-medium">Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SimpleSidebar;
