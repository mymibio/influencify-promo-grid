import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LayoutGrid, BarChart, Palette, Settings, Plus, Link2, Instagram, YoutubeIcon, Mail } from "lucide-react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import AddItemDialog from "@/components/dashboard/add-item-dialog";
import { PromotionalItem } from "@/types/user";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

const MobileNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSocialSheetOpen, setIsSocialSheetOpen] = useState(false);
  const [currentSocialPlatform, setCurrentSocialPlatform] = useState<string>("");
  const [socialHandle, setSocialHandle] = useState<string>("");
  const { profile, refreshProfile } = useAuth();
  
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
  
  const handleSaveSocialMedia = async () => {
    if (!profile || !currentSocialPlatform || !socialHandle) return;
    
    try {
      const updatedSocialLinks = {
        ...(profile.socialLinks || {}),
        [currentSocialPlatform.toLowerCase()]: socialHandle
      };
      
      const { error } = await supabase
        .from('user_profiles')
        .update({ social_links: updatedSocialLinks })
        .eq('id', profile.id);
      
      if (error) {
        throw error;
      }
      
      await refreshProfile();
      setIsSocialSheetOpen(false);
      setSocialHandle("");
      setCurrentSocialPlatform("");
      toast.success(`${currentSocialPlatform} link added successfully!`);
    } catch (error) {
      console.error("Error updating social links:", error);
      toast.error("Failed to update social media");
    }
  };

  const socialPlatforms = [
    { name: "Instagram", icon: Instagram, key: "instagram" },
    { name: "TikTok", icon: TikTok, key: "tiktok" },
    { name: "YouTube", icon: YoutubeIcon, key: "youtube" },
    { name: "Email", icon: Mail, key: "email" },
  ];
  
  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center md:hidden">
      <div className="fixed bottom-20 left-0 right-0 flex justify-center mb-4">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-4 py-2 border border-gray-100 shadow-sm">
          {socialPlatforms.map((platform) => (
            <Button
              key={platform.key}
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-dashed"
              onClick={() => {
                setCurrentSocialPlatform(platform.key);
                setIsSocialSheetOpen(true);
              }}
            >
              <platform.icon size={18} className="text-muted-foreground" />
              <Plus size={12} className="absolute top-1 right-1 text-primary" />
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full bg-gray-50"
            onClick={() => {
              setCurrentSocialPlatform("");
              setIsSocialSheetOpen(true);
            }}
          >
            <Plus size={16} />
          </Button>
        </div>
      </div>
      
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

        <AddItemDialog
          open={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onAdd={handleAddItem}
          aspectRatio="9:16"
          editItem={null}
        />
      </nav>
      
      <Sheet open={isSocialSheetOpen} onOpenChange={setIsSocialSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Add Social Media</SheetTitle>
          </SheetHeader>
          <div className="py-6">
            {currentSocialPlatform ? (
              <div className="space-y-4">
                <div className="flex flex-col items-center gap-2">
                  {(() => {
                    const platform = socialPlatforms.find(p => p.key === currentSocialPlatform);
                    if (platform) {
                      const Icon = platform.icon;
                      return (
                        <>
                          <div className="p-4 bg-gray-100 rounded-full">
                            <Icon size={32} />
                          </div>
                          <h3 className="font-medium text-lg">{platform.name}</h3>
                        </>
                      );
                    }
                    return null;
                  })()}
                </div>
                <div className="space-y-2">
                  <Input 
                    value={socialHandle}
                    onChange={(e) => setSocialHandle(e.target.value)}
                    placeholder={`Enter your ${currentSocialPlatform} handle`}
                  />
                </div>
                <Button 
                  className="w-full" 
                  onClick={handleSaveSocialMedia}
                  disabled={!socialHandle.trim()}
                >
                  Save
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {socialPlatforms.map((platform) => (
                  <Button
                    key={platform.key}
                    variant="outline"
                    className="flex flex-col items-center gap-2 h-auto py-4"
                    onClick={() => setCurrentSocialPlatform(platform.key)}
                  >
                    <platform.icon size={24} />
                    <span className="text-xs">{platform.name}</span>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
