
import { useState } from "react";
import SimpleSidebar from "@/components/dashboard/simple-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ThemeSelector from "@/components/dashboard/theme-selector";
import { Smartphone, Check, Monitor } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { User, PromotionalItem } from "@/types/user";

// Sample user data for the preview
const sampleUser: User = {
  id: "123",
  username: "fashionista",
  email: "ashley@example.com",
  name: "Ashley Johnson",
  profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop",
  bio: "Fashion & lifestyle content creator. Sharing my favorite products and deals with you!",
  socialLinks: {
    instagram: "fashionista",
    twitter: "fashionista",
    youtube: "fashionistachannel"
  },
  createdAt: new Date().toISOString()
};

// Sample promotional items for the preview
const sampleItems: PromotionalItem[] = [
  {
    id: "1",
    userId: "123",
    title: "Summer Collection",
    description: "New arrivals for summer",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format",
    url: "https://example.com/product/1",
    type: "product",
    aspectRatio: "1:1",
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    userId: "123",
    title: "Beauty Products",
    description: "20% off this month",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format",
    url: "https://example.com/product/2",
    type: "product",
    aspectRatio: "1:1",
    createdAt: new Date().toISOString()
  }
];

const DashboardTheme = () => {
  const [selectedTheme, setSelectedTheme] = useState("default");
  const [selectedTab, setSelectedTab] = useState("themes");
  
  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    toast.success("Theme updated successfully!");
  };
  
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <SimpleSidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Theme Customization</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Preview Section - Takes 1/3 of screen on large displays */}
            <div className="order-2 lg:order-1">
              <Card className="sticky top-8">
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
                          {sampleUser.profilePicture ? (
                            <img 
                              src={sampleUser.profilePicture} 
                              alt={sampleUser.name} 
                              className="w-14 h-14 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center">
                              <span className="text-lg font-bold">{sampleUser.name.charAt(0)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Content with theme-specific background */}
                      <div className={`p-4 flex-1 ${getThemeStyles(selectedTheme).background} overflow-y-auto h-[426px]`}>
                        <div className="flex flex-col items-center mb-3">
                          <h3 className={`font-bold text-lg ${getThemeStyles(selectedTheme).textColor}`}>
                            {sampleUser.name}
                          </h3>
                          <p className={`text-sm text-center mt-1 ${getThemeStyles(selectedTheme).textColor} opacity-80`}>
                            @{sampleUser.username}
                          </p>
                          <p className={`text-xs text-center mt-1 ${getThemeStyles(selectedTheme).textColor} opacity-70 max-w-52`}>
                            {sampleUser.bio}
                          </p>
                        </div>
                        
                        {/* Social Media Icons */}
                        <div className="flex justify-center space-x-3 mb-4">
                          {Object.entries(sampleUser.socialLinks || {}).map(([platform, handle]) => (
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
                          {sampleItems.map((item) => (
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
            </div>
            
            {/* Theme Configuration - Takes 2/3 of screen on large displays */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <Tabs defaultValue="themes" onValueChange={setSelectedTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="themes">Themes</TabsTrigger>
                  <TabsTrigger value="colors">Colors</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                
                <TabsContent value="themes">
                  <Card>
                    <CardContent className="pt-6">
                      <ThemeSelector selectedTheme={selectedTheme} onThemeChange={handleThemeChange} />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="colors">
                  <Card>
                    <CardHeader>
                      <CardTitle>Color Schemes</CardTitle>
                      <CardDescription>Select a color palette for your profile</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {["Default", "Ocean", "Forest", "Sunset", "Monochrome", "Neon", "Pastel", "Dark"].map((colorScheme) => (
                          <div 
                            key={colorScheme} 
                            className={`border rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-all ${selectedTheme === colorScheme.toLowerCase() ? 'border-primary bg-primary/5' : ''}`}
                            onClick={() => handleThemeChange(colorScheme.toLowerCase())}
                          >
                            <div className="flex justify-center mb-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                            </div>
                            <p className="font-medium">{colorScheme}</p>
                            {selectedTheme === colorScheme.toLowerCase() && (
                              <div className="flex justify-center mt-2">
                                <Check size={16} className="text-green-500" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="preview">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mobile Preview</CardTitle>
                      <CardDescription>See how your profile will look on mobile devices</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center">
                        <div className="border-8 border-gray-800 rounded-3xl p-2 bg-gray-800 shadow-lg max-w-[300px]">
                          <div className={`rounded-2xl overflow-hidden h-[500px] ${getThemeStyles(selectedTheme).background} flex flex-col`}>
                            {/* Header */}
                            <div className={`${getThemeStyles(selectedTheme).header} p-4 flex items-center justify-center`}>
                              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                            </div>
                            
                            {/* Content */}
                            <div className="p-4 flex-1 flex flex-col items-center">
                              {/* Username */}
                              <p className={`text-center font-bold mt-2 ${getThemeStyles(selectedTheme).textColor}`}>@username</p>
                              
                              {/* Bio */}
                              <p className={`text-center text-sm mt-1 mb-4 ${getThemeStyles(selectedTheme).textColor}`}>
                                Digital creator & tech enthusiast
                              </p>
                              
                              {/* Social Icons */}
                              <div className="flex space-x-4 mb-6">
                                {[1, 2, 3].map((i) => (
                                  <div key={i} className={`w-6 h-6 rounded-full ${getThemeStyles(selectedTheme).textColor} flex items-center justify-center`}>
                                    <div className={`w-4 h-4 ${getThemeStyles(selectedTheme).background === 'bg-white' ? 'bg-gray-800' : 'bg-gray-200'} rounded-sm`}></div>
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
                      </div>
                      <div className="flex justify-center mt-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Smartphone size={16} className="mr-2" />
                          This is how your profile will appear on mobile devices
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper function to get theme styles based on theme ID
const getThemeStyles = (themeId: string) => {
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

export default DashboardTheme;
