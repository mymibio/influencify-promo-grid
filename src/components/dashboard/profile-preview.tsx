
import React from "react";
import { Monitor } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, PromotionalItem } from "@/types/user";

interface ProfilePreviewProps {
  user: User;
  items: PromotionalItem[];
  selectedTheme: string;
  className?: string;
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

const ProfilePreview: React.FC<ProfilePreviewProps> = ({ user, items, selectedTheme, className }) => {
  return (
    <Card className={`sticky top-8 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Monitor className="mr-2 h-5 w-5" />
          Live Preview
        </CardTitle>
        <CardDescription>See how your profile looks with selected theme</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="border-8 border-gray-800 rounded-3xl p-2 bg-gray-800 shadow-xl mx-auto max-w-[280px]">
          <div className="rounded-2xl overflow-hidden h-[500px] bg-white">
            {/* Header with theme-specific background */}
            <div className={`h-24 ${getThemeStyles(selectedTheme).header} flex items-center justify-center`}>
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
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
            
            {/* Content with theme-specific background */}
            <div className={`p-4 flex-1 ${getThemeStyles(selectedTheme).background} overflow-y-auto h-[426px]`}>
              <div className="flex flex-col items-center mb-3">
                <h3 className={`font-bold text-lg ${getThemeStyles(selectedTheme).textColor}`}>
                  {user.name}
                </h3>
                <p className={`text-sm text-center mt-1 ${getThemeStyles(selectedTheme).textColor} opacity-80`}>
                  @{user.username}
                </p>
                <p className={`text-xs text-center mt-1 ${getThemeStyles(selectedTheme).textColor} opacity-70 max-w-52`}>
                  {user.bio}
                </p>
              </div>
              
              {/* Social Media Icons */}
              <div className="flex justify-center space-x-3 mb-4">
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
