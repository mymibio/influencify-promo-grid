
import { useState, useEffect } from "react";
import { User } from "@/types/user";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import SimpleSidebar from "@/components/dashboard/simple-sidebar";
import { BarChart2, BarChart, ArrowUp, ArrowDown, Users, Clock, Pencil, Check, Copy, X } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ThemeSelector from "@/components/dashboard/theme-selector";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock user data
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

// Mock analytics data
const analyticsData = {
  totalVisits: 1482,
  totalClicks: 643,
  clickRate: 43.4,
  visitGrowth: 12.5,
  clickGrowth: 8.2,
  topSource: "Instagram",
  avgTimeOnPage: "1m 45s",
  newUsers: 324,
  lastUpdated: new Date().toISOString()
};

const DashboardSettings = () => {
  const [user, setUser] = useState(sampleUser);
  const [settings, setSettings] = useState({
    notifications: true,
    publicProfile: true,
    darkMode: false
  });
  const [selectedTheme, setSelectedTheme] = useState("default");
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState("7d");
  const [editingBio, setEditingBio] = useState(false);
  const [bioText, setBioText] = useState(sampleUser.bio);
  const isMobile = useIsMobile();
  
  const handleSettingChange = (setting: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));

    // Show success toast immediately
    toast.success(`${setting.charAt(0).toUpperCase() + setting.slice(1)} ${value ? 'enabled' : 'disabled'}`);
  };
  
  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!");
  };

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
  };

  const handleEditBio = () => {
    setEditingBio(true);
  };

  const handleSaveBio = () => {
    setUser(prev => ({
      ...prev,
      bio: bioText
    }));
    setEditingBio(false);
    toast.success("Bio updated successfully!");
  };

  const handleCancelEditBio = () => {
    setBioText(user.bio);
    setEditingBio(false);
  };
  
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <SimpleSidebar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          
          {/* User Bio Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Bio</CardTitle>
              <CardDescription>Your profile description seen by visitors</CardDescription>
            </CardHeader>
            <CardContent>
              {editingBio ? (
                <div className="space-y-4">
                  <Input 
                    value={bioText} 
                    onChange={(e) => setBioText(e.target.value)} 
                    placeholder="Enter your bio" 
                    className="min-h-[80px]"
                  />
                  <div className="flex space-x-2">
                    <Button onClick={handleSaveBio} size="sm">
                      <Check className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button onClick={handleCancelEditBio} variant="outline" size="sm">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <p className="text-gray-600">{user.bio}</p>
                  <Button variant="ghost" size="sm" onClick={handleEditBio}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Analytics Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Analytics</h2>
              <ToggleGroup type="single" value={analyticsTimeframe} onValueChange={(value) => value && setAnalyticsTimeframe(value)}>
                <ToggleGroupItem value="7d">7d</ToggleGroupItem>
                <ToggleGroupItem value="30d">30d</ToggleGroupItem>
                <ToggleGroupItem value="90d">90d</ToggleGroupItem>
              </ToggleGroup>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Page Views</p>
                      <h3 className="text-2xl font-bold mt-1">{analyticsData.totalVisits.toLocaleString()}</h3>
                    </div>
                    <div className={`flex items-center ${analyticsData.visitGrowth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {analyticsData.visitGrowth > 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                      <span className="text-sm font-medium">{Math.abs(analyticsData.visitGrowth)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Link Clicks</p>
                      <h3 className="text-2xl font-bold mt-1">{analyticsData.totalClicks.toLocaleString()}</h3>
                    </div>
                    <div className={`flex items-center ${analyticsData.clickGrowth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {analyticsData.clickGrowth > 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                      <span className="text-sm font-medium">{Math.abs(analyticsData.clickGrowth)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Conversion Rate</p>
                      <h3 className="text-2xl font-bold mt-1">{analyticsData.clickRate}%</h3>
                    </div>
                    <BarChart2 size={24} className="text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">New Visitors</p>
                      <h3 className="text-2xl font-bold mt-1">{analyticsData.newUsers}</h3>
                    </div>
                    <Users size={24} className="text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Traffic Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-md">
                    <div className="text-center text-muted-foreground">
                      <BarChart size={48} className="mx-auto mb-2" />
                      <p>Traffic visualization would appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Instagram</span>
                      <span className="font-medium">54%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "54%" }}></div>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Direct</span>
                      <span className="font-medium">28%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "28%" }}></div>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Twitter</span>
                      <span className="font-medium">18%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "18%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Theme Selection */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Profile Theme</CardTitle>
              <CardDescription>Choose how your profile page looks to visitors</CardDescription>
            </CardHeader>
            <CardContent>
              <ThemeSelector selectedTheme={selectedTheme} onThemeChange={handleThemeChange} />
            </CardContent>
          </Card>
          
          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <FormLabel htmlFor="notifications">Email Notifications</FormLabel>
                  <p className="text-sm text-muted-foreground">Receive email updates about your account</p>
                </div>
                <Switch 
                  id="notifications" 
                  checked={settings.notifications} 
                  onCheckedChange={(checked) => handleSettingChange('notifications', checked)} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <FormLabel htmlFor="publicProfile">Public Profile</FormLabel>
                  <p className="text-sm text-muted-foreground">Allow others to see your profile</p>
                </div>
                <Switch 
                  id="publicProfile" 
                  checked={settings.publicProfile} 
                  onCheckedChange={(checked) => handleSettingChange('publicProfile', checked)} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <FormLabel htmlFor="darkMode">Dark Mode</FormLabel>
                  <p className="text-sm text-muted-foreground">Switch between light and dark mode</p>
                </div>
                <Switch 
                  id="darkMode" 
                  checked={settings.darkMode} 
                  onCheckedChange={(checked) => handleSettingChange('darkMode', checked)} 
                />
              </div>
              
              <div className="pt-4">
                <Button onClick={handleSaveSettings}>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DashboardSettings;
