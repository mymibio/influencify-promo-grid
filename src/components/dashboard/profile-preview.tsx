
import React from "react";
import { Copy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { User, PromotionalItem } from "@/types/user";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProfilePreviewProps {
  user: User;
  items: PromotionalItem[];
  selectedTheme: string;
  className?: string;
  hideOnMobile?: boolean;
}

// Helper function to get theme styles based on theme ID
export const getThemeStyles = (themeId: string) => {
  const themes = {
    default: {
      header: "bg-blue-500",
      background: "bg-white",
      textColor: "text-gray-800"
    },
    minimal: {
      header: "bg-black",
      background: "bg-white",
      textColor: "text-gray-800"
    },
    midnight: {
      header: "bg-indigo-500",
      background: "bg-slate-900",
      textColor: "text-gray-200"
    },
    "sunset-gradient": {
      header: "bg-amber-500",
      background: "bg-gradient-to-br from-rose-400 to-purple-500",
      textColor: "text-white"
    },
    pastel: {
      header: "bg-pink-400",
      background: "bg-pink-100",
      textColor: "text-gray-800"
    },
    "pebble-blue": {
      header: "bg-slate-600",
      background: "bg-sky-100",
      textColor: "text-gray-800"
    },
    "pebble-yellow": {
      header: "bg-amber-500",
      background: "bg-amber-100", 
      textColor: "text-gray-800"
    },
    "pebble-pink": {
      header: "bg-pink-500",
      background: "bg-pink-50",
      textColor: "text-gray-800"
    },
    coral: {
      header: "bg-red-500",
      background: "bg-white",
      textColor: "text-gray-800"
    },
    forest: {
      header: "bg-green-500",
      background: "bg-white",
      textColor: "text-gray-800"
    },
    ocean: {
      header: "bg-blue-500",
      background: "bg-white",
      textColor: "text-gray-800"
    },
    sunset: {
      header: "bg-orange-500",
      background: "bg-gradient-to-b from-orange-100 to-red-100",
      textColor: "text-gray-800"
    },
    monochrome: {
      header: "bg-gray-800",
      background: "bg-gray-100",
      textColor: "text-gray-800"
    },
    neon: {
      header: "bg-purple-600",
      background: "bg-black",
      textColor: "text-green-400"
    },
    dark: {
      header: "bg-gray-900",
      background: "bg-gray-800",
      textColor: "text-gray-100"
    }
  };
  
  return themes[themeId as keyof typeof themes] || themes.default;
};

const ProfilePreview: React.FC<ProfilePreviewProps> = ({ user, items, selectedTheme, className, hideOnMobile = false }) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://yourdomain.com/${user.username}`)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy link");
      });
  };

  return (
    <Card className={`sticky top-8 ${hideOnMobile ? 'hidden md:block' : ''} ${className || ''}`}>
      <CardContent className="p-4">
        {/* Link Copy UI */}
        <div className="flex items-center gap-1 bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-100 p-1.5 rounded-full mb-4">
          <div className="flex items-center gap-2 pl-2 flex-1">
            <span className="text-sm font-medium text-gray-700 truncate">yourdomain.com/{user.username}</span>
          </div>
          <Button 
            size="sm"
            variant="secondary" 
            className="h-8 rounded-full bg-white hover:bg-gray-100 transition-colors flex-shrink-0"
            onClick={handleCopyLink}
          >
            <Copy size={14} className="mr-1" />
            <span className="text-xs">Copy</span>
          </Button>
        </div>
        
        <div className="border-8 border-gray-800 rounded-3xl p-2 bg-gray-800 shadow-xl mx-auto max-w-[280px]">
          <div className="rounded-2xl overflow-hidden h-[500px] bg-white">
            {/* Header with theme-specific background */}
            <div className={`p-4 ${getThemeStyles(selectedTheme).header}`}>
              <div className="flex items-center gap-4">
                {/* Profile Picture */}
                <div className="w-16 h-16 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  {user.profilePicture ? (
                    <img 
                      src={user.profilePicture} 
                      alt={user.name} 
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-lg font-bold">{user.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Content with theme-specific background */}
            <div className={`p-4 flex-1 ${getThemeStyles(selectedTheme).background} overflow-y-auto h-[426px]`}>
              {/* Social Media Icons */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {Object.entries(user.socialLinks || {}).map(([platform, handle]) => (
                  <div 
                    key={platform} 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${getThemeStyles(selectedTheme).textColor} border border-current`}
                  >
                    <span className="text-xs">{platform.charAt(0).toUpperCase()}</span>
                  </div>
                ))}
              </div>
              
              {/* Promotional Cards */}
              <div className="grid grid-cols-2 gap-2">
                {items.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-xl overflow-hidden shadow-sm"
                  >
                    {item.image && (
                      <div className="w-full aspect-square">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-2">
                      <p className="text-xs font-medium line-clamp-1">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePreview;
