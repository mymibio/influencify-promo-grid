
import { LayoutGrid, Settings, BarChart, Palette, Plus, Link2, Copy } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import AddItemDialog from "@/components/dashboard/add-item-dialog";
import { PromotionalItem } from "@/types/user";

const SimpleSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const isActive = (path: string) => {
    if (path === "/dashboard" && currentPath === "/dashboard") {
      return true;
    }
    if (path !== "/dashboard" && currentPath.includes(path)) {
      return true;
    }
    return false;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://yourdomain.com/fashionista")
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy link");
      });
  };

  const handleAddItem = (newItem: PromotionalItem) => {
    // In a real app, you would save this to your backend
    toast.success("Item added successfully!");
    setIsAddDialogOpen(false);
  };
  
  return (
    <div className="min-h-screen w-[240px] border-r bg-white hidden md:block">
      <div className="py-6 px-3 space-y-6">
        <div className="space-y-4">
          {/* Link Copy UI */}
          <div className="flex items-center px-3 gap-1 bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-100 p-1.5 rounded-full">
            <div className="flex items-center gap-2 pl-2">
              <Link2 size={16} className="text-indigo-500" />
              <span className="text-xs font-medium text-gray-700 truncate">yourdomain.com/fashionista</span>
            </div>
            <Button 
              size="sm"
              variant="secondary" 
              className="h-6 rounded-full bg-white hover:bg-gray-100 transition-colors"
              onClick={handleCopyLink}
            >
              <Copy size={12} className="mr-1" />
              <span className="text-xs">Copy</span>
            </Button>
          </div>

          {/* Add New Item Button */}
          <Button 
            className="w-full mb-2"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus size={16} className="mr-2" />
            Add Item
          </Button>
          
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

      {/* Add Item Dialog */}
      <AddItemDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddItem}
        aspectRatio="9:16"
        editItem={null}
      />
    </div>
  );
};

export default SimpleSidebar;
