
import { useState, useEffect } from "react";
import SimpleSidebar from "@/components/dashboard/simple-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ThemeSelector from "@/components/dashboard/theme-selector";
import { Monitor } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { User, PromotionalItem } from "@/types/user";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardTheme = () => {
  const [selectedTheme, setSelectedTheme] = useState("default");
  const [selectedTab, setSelectedTab] = useState("themes");
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<PromotionalItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { profile } = useAuth();
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (!profile) return;
      
      setIsLoading(true);
      
      try {
        // Fetch user profile from Supabase
        const { data: userData, error: userError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', profile.id)
          .single();
        
        if (userError) {
          console.error("Error fetching user data:", userError);
          toast.error("Failed to load user data");
          return;
        }
        
        if (userData) {
          const userProfile: User = {
            id: userData.id,
            username: userData.username,
            email: userData.email,
            name: userData.name,
            profilePicture: userData.profile_picture,
            bio: userData.bio || "",
            socialLinks: userData.social_links || {},
            createdAt: userData.created_at
          };
          
          setUser(userProfile);
          
          // Fetch promotional items
          const { data: itemsData, error: itemsError } = await supabase
            .from('promotional_items')
            .select('*')
            .eq('user_id', profile.id)
            .order('position');
          
          if (itemsError) {
            console.error("Error fetching promotional items:", itemsError);
            toast.error("Failed to load promotional items");
            return;
          }
          
          if (itemsData) {
            const promotionalItems = itemsData.map((item: any): PromotionalItem => ({
              id: item.id,
              userId: item.user_id,
              title: item.title,
              description: item.description,
              image: item.image,
              url: item.url,
              type: item.type,
              aspectRatio: item.aspect_ratio,
              couponCode: item.coupon_code,
              discount: item.discount,
              category: item.category,
              createdAt: item.created_at,
            }));
            
            setItems(promotionalItems);
          }
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [profile]);
  
  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    toast.success("Theme updated successfully!");
  };
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full bg-gray-50">
        <SimpleSidebar />
        
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Live Preview Section */}
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
                    <Skeleton className="h-[500px] w-full rounded-lg" />
                  </CardContent>
                </Card>
              </div>
              
              {/* Theme Configuration */}
              <div className="lg:col-span-2 order-1 lg:order-2">
                <Skeleton className="h-12 w-full mb-6" />
                <Skeleton className="h-[400px] w-full" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  // Sample items to show if user has no items
  const sampleItems: PromotionalItem[] = items.length > 0 ? items.slice(0, 2) : [
    {
      id: "1",
      userId: user?.id || "",
      title: user?.name ? `${user.name}'s Product` : "Sample Product",
      description: "Product description",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format",
      url: "https://example.com/product/1",
      type: "product",
      aspectRatio: "1:1",
      createdAt: new Date().toISOString()
    },
    {
      id: "2",
      userId: user?.id || "",
      title: "Sample Product 2",
      description: "Product description",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format",
      url: "https://example.com/product/2",
      type: "product",
      aspectRatio: "1:1",
      createdAt: new Date().toISOString()
    }
  ];
  
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <SimpleSidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-8">
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
                          {user?.profilePicture ? (
                            <img 
                              src={user.profilePicture} 
                              alt={user.name} 
                              className="w-14 h-14 rounded-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;
                              }}
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center">
                              <span className="text-lg font-bold">{user?.name?.charAt(0) || '?'}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Content with theme-specific background */}
                      <div className={`p-4 flex-1 ${getThemeStyles(selectedTheme).background} overflow-y-auto h-[426px]`}>
                        {/* Social Media Icons */}
                        <div className="flex justify-center space-x-3 mb-4">
                          {user?.socialLinks && Object.entries(user.socialLinks).filter(([_, handle]) => handle).map(([platform, handle]) => (
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
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = 'https://placehold.co/300x300/e2e8f0/1e293b?text=No+Image';
                                    }}
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
                            <span className="text-sm font-medium">{colorScheme}</span>
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
                              <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                                {user?.profilePicture ? (
                                  <img 
                                    src={user.profilePicture} 
                                    alt={user.name} 
                                    className="w-14 h-14 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center">
                                    <span className="text-lg font-bold">{user?.name?.charAt(0) || '?'}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Content */}
                            <div className="p-4 flex-1 flex flex-col items-center">
                              <h3 className={`text-lg font-bold mb-2 ${getThemeStyles(selectedTheme).textColor}`}>{user?.name || 'Your Name'}</h3>
                              {/* Social Icons */}
                              <div className="flex space-x-4 mb-6">
                                {user?.socialLinks && Object.entries(user.socialLinks).slice(0, 3).filter(([_, handle]) => handle).map(([platform]) => (
                                  <div 
                                    key={platform} 
                                    className={`w-8 h-8 rounded-full ${getThemeStyles(selectedTheme).textColor} flex items-center justify-center border border-current`}
                                  >
                                    <span className="text-xs">{platform.charAt(0).toUpperCase()}</span>
                                  </div>
                                ))}
                                
                                {/* Fallback icons if no social links */}
                                {(!user?.socialLinks || Object.values(user?.socialLinks || {}).filter(Boolean).length === 0) && (
                                  <>
                                    <div className={`w-8 h-8 rounded-full ${getThemeStyles(selectedTheme).textColor} flex items-center justify-center border border-current`}>
                                      <span className="text-xs">I</span>
                                    </div>
                                    <div className={`w-8 h-8 rounded-full ${getThemeStyles(selectedTheme).textColor} flex items-center justify-center border border-current`}>
                                      <span className="text-xs">T</span>
                                    </div>
                                    <div className={`w-8 h-8 rounded-full ${getThemeStyles(selectedTheme).textColor} flex items-center justify-center border border-current`}>
                                      <span className="text-xs">Y</span>
                                    </div>
                                  </>
                                )}
                              </div>
                              
                              {/* Links */}
                              <div className="w-full space-y-2">
                                {[1, 2, 3].map((i) => (
                                  <div key={i} className="w-full h-10 bg-white bg-opacity-80 rounded-md flex items-center justify-center">
                                    <span className="text-xs text-gray-500">Sample Link {i}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
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
