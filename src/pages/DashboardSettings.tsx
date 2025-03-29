
import { useState } from "react";
import { User } from "@/types/user";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import SimpleSidebar from "@/components/dashboard/simple-sidebar";

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

const DashboardSettings = () => {
  const [user, setUser] = useState(sampleUser);
  const [settings, setSettings] = useState({
    notifications: true,
    publicProfile: true,
    darkMode: false
  });
  
  const handleSettingChange = (setting: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };
  
  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!");
  };
  
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <SimpleSidebar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          
          <div className="grid grid-cols-1 gap-6">
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
        </div>
      </main>
    </div>
  );
};

export default DashboardSettings;
