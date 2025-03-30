
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LayoutGrid, BarChart, Palette, Settings, Plus, Link2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import AddItemDialog from "@/components/dashboard/add-item-dialog";
import { PromotionalItem } from "@/types/user";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const MobileNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { profile } = useAuth();
  
  // Don't render navigation if not on dashboard routes
  if (!currentPath.includes('/dashboard')) {
    return null;
  }
  
  const isActive = (path: string) => {
    if (path === "/dashboard" && currentPath === "/dashboard") {
      return true;
    }
    if (path !== "/dashboard" && currentPath.includes(path)) {
      return true;
    }
    return false;
  };

  const handleAddItem = (newItem: PromotionalItem) => {
    // In a real app, you would save this to your backend
    toast.success("Item added successfully!");
    setIsAddDialogOpen(false);
  };

  const handleCopyLink = () => {
    if (!profile) return;
    
    const shareableLink = `${window.location.origin}/${profile.username}`;
    navigator.clipboard.writeText(shareableLink)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy link");
      });
  };
  
  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center md:hidden">
      <nav className="flex items-center justify-around gap-1 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 border border-gray-100">
        <Link 
          to="/dashboard" 
          className={cn(
            "flex flex-col items-center justify-center rounded-full p-2 transition-all duration-200 hover:bg-gray-100",
            isActive("/dashboard") 
              ? "text-primary bg-primary/10" 
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
              ? "text-primary bg-primary/10" 
              : "text-muted-foreground hover:text-primary"
          )}
        >
          <BarChart size={20} />
          <span className="text-xs font-medium mt-1">Analytics</span>
        </Link>
        
        {/* Add Link Button in Middle */}
        <div className="relative flex flex-col items-center justify-center">
          <button 
            onClick={() => setIsAddDialogOpen(true)}
            className="absolute -top-6 rounded-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          >
            <Plus size={22} className="text-white" />
          </button>
          <div className="mt-6">
            <span className="text-xs font-medium text-primary">Add</span>
          </div>
        </div>
        
        <Link 
          to="/dashboard/theme" 
          className={cn(
            "flex flex-col items-center justify-center rounded-full p-2 transition-all duration-200 hover:bg-gray-100",
            isActive("/dashboard/theme") 
              ? "text-primary bg-primary/10" 
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
              ? "text-primary bg-primary/10" 
              : "text-muted-foreground hover:text-primary"
          )}
        >
          <Settings size={20} />
          <span className="text-xs font-medium mt-1">Settings</span>
        </Link>

        {/* Add Item Dialog */}
        <AddItemDialog
          open={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onAdd={handleAddItem}
          aspectRatio="9:16"
          editItem={null}
        />
      </nav>
    </div>
  );
};

export default MobileNavigation;
