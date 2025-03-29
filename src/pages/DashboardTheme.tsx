
import { useState } from "react";
import SimpleSidebar from "@/components/dashboard/simple-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ThemeSelector from "@/components/dashboard/theme-selector";
import { Smartphone, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

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
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Theme Customization</h1>
          
          <Tabs defaultValue="themes" onValueChange={setSelectedTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="themes">Themes</TabsTrigger>
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            
            <TabsContent value="themes">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Theme</CardTitle>
                  <CardDescription>Choose how your profile page looks to visitors</CardDescription>
                </CardHeader>
                <CardContent>
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
                      <div className="rounded-2xl overflow-hidden h-[500px] bg-white flex flex-col">
                        <div className="h-16 bg-blue-600 flex items-center justify-center">
                          <h3 className="text-white font-bold">@fashionista</h3>
                        </div>
                        <div className="p-4 flex-1 overflow-auto">
                          <div className="flex flex-col items-center mb-4">
                            <div className="w-20 h-20 rounded-full bg-gray-300 mb-2"></div>
                            <h3 className="font-bold">Ashley Johnson</h3>
                            <p className="text-sm text-gray-600 text-center mt-1">Fashion & lifestyle content creator. Sharing my favorite products and deals with you!</p>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {[1, 2, 3, 4].map((item) => (
                              <div key={item} className="aspect-[9/16] bg-gray-100 rounded-lg flex items-center justify-center">
                                <p className="text-xs text-gray-500">Promo {item}</p>
                              </div>
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
      </main>
    </div>
  );
};

export default DashboardTheme;
