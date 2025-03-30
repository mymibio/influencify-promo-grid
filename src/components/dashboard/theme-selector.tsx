import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

export type ThemeCategory = "All" | "Basic" | "Pebble" | "Cloud";
export type ThemeStyle = {
  id: string;
  name: string;
  category: ThemeCategory[];
  header: string;
  background: string;
  textColor: string;
  headerTextColor?: string;
  accentColor?: string;
  linkColor?: string;
  buttonStyle?: string;
};

const themes: ThemeStyle[] = [
  {
    id: "default",
    name: "Default",
    category: ["All", "Basic"],
    header: "bg-[#5271ff]",
    background: "bg-white",
    textColor: "text-gray-800",
    headerTextColor: "text-white",
  },
  {
    id: "minimal",
    name: "Minimal",
    category: ["All", "Basic"],
    header: "bg-black",
    background: "bg-white",
    textColor: "text-gray-800",
    headerTextColor: "text-white",
  },
  {
    id: "midnight",
    name: "Midnight",
    category: ["All", "Cloud"],
    header: "bg-indigo-500",
    background: "bg-slate-900",
    textColor: "text-gray-200",
    headerTextColor: "text-white",
  },
  {
    id: "sunset-gradient",
    name: "Sunset Gradient",
    category: ["All", "Cloud"],
    header: "bg-amber-500",
    background: "bg-gradient-to-br from-rose-400 to-purple-500",
    textColor: "text-white",
  },
  {
    id: "pastel",
    name: "Pastel",
    category: ["All", "Basic"],
    header: "bg-pink-400",
    background: "bg-pink-100",
    textColor: "text-gray-800",
  },
  {
    id: "pebble-blue",
    name: "Pebble Blue",
    category: ["All", "Pebble"],
    header: "bg-slate-600",
    background: "bg-sky-100",
    textColor: "text-gray-800",
  },
  {
    id: "pebble-yellow",
    name: "Pebble Yellow",
    category: ["All", "Pebble"],
    header: "bg-amber-500",
    background: "bg-amber-100",
    textColor: "text-gray-800",
  },
  {
    id: "pebble-pink",
    name: "Pebble Pink",
    category: ["All", "Pebble"],
    header: "bg-pink-500",
    background: "bg-pink-50",
    textColor: "text-gray-800",
  },
  {
    id: "coral",
    name: "Coral",
    category: ["All", "Basic"],
    header: "bg-red-500",
    background: "bg-white",
    textColor: "text-gray-800",
  },
  {
    id: "forest",
    name: "Forest",
    category: ["All", "Basic"],
    header: "bg-green-500",
    background: "bg-white",
    textColor: "text-gray-800",
  },
  {
    id: "ocean",
    name: "Ocean",
    category: ["All", "Basic"],
    header: "bg-blue-500",
    background: "bg-white",
    textColor: "text-gray-800",
  },
];

// Phone preview component
const PhonePreview: React.FC<{ theme: ThemeStyle }> = ({ theme }) => {
  return (
    <div className="w-full max-w-[220px] mx-auto">
      <div className="border-4 border-gray-300 rounded-3xl overflow-hidden shadow-lg">
        {/* Phone frame */}
        <div className={`h-[400px] flex flex-col ${theme.background}`}>
          {/* Header */}
          <div className={`${theme.header} p-4 flex items-center justify-center`}>
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
          </div>
          
          {/* Content */}
          <div className="p-4 flex-1 flex flex-col items-center">
            {/* Social Icons */}
            <div className="flex space-x-4 mb-6 mt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`w-6 h-6 rounded-full ${theme.textColor} flex items-center justify-center`}>
                  <div className={`w-4 h-4 ${theme.background === 'bg-white' ? 'bg-gray-800' : 'bg-gray-200'} rounded-sm`}></div>
                </div>
              ))}
            </div>
            
            {/* Links */}
            <div className="w-full space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-full h-8 bg-gray-200 bg-opacity-40 rounded-md"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="text-center mt-2 font-medium">{theme.name}</p>
    </div>
  );
};

interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeChange: (themeId: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedTheme, onThemeChange }) => {
  const handleThemeSelect = (themeId: string) => {
    onThemeChange(themeId);
    toast.success(`Theme updated to ${themes.find(t => t.id === themeId)?.name}`);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Profile Theme</h2>
      
      <Tabs defaultValue="All" className="w-full">
        <TabsList className="w-full grid grid-cols-4 mb-6">
          <TabsTrigger value="All">All</TabsTrigger>
          <TabsTrigger value="Basic">Basic</TabsTrigger>
          <TabsTrigger value="Pebble">Pebble</TabsTrigger>
          <TabsTrigger value="Cloud">Cloud</TabsTrigger>
        </TabsList>
        
        {["All", "Basic", "Pebble", "Cloud"].map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {themes
                .filter(theme => theme.category.includes(category as ThemeCategory))
                .map(theme => (
                  <Card 
                    key={theme.id}
                    className={`p-4 border-0 cursor-pointer transition-all hover:ring-2 hover:ring-[#5271ff] hover:ring-opacity-50 ${
                      selectedTheme === theme.id ? "ring-2 ring-[#5271ff]" : ""
                    }`}
                    onClick={() => handleThemeSelect(theme.id)}
                  >
                    <PhonePreview theme={theme} />
                  </Card>
                ))}
                
              {category === "All" && (
                <Card className="p-4 border-dashed border-0 cursor-pointer flex flex-col items-center justify-center h-full">
                  <div className="h-[400px] flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-lg font-medium text-gray-500 mb-2">CREATE YOUR OWN</p>
                      <p className="text-sm text-gray-400">Coming soon</p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ThemeSelector;
