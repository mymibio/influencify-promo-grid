
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import SimpleSidebar from "@/components/dashboard/simple-sidebar";
import { Pencil, Check, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import MobileNavigation from "@/components/dashboard/mobile-navigation";

const DashboardSettings = () => {
  const { profile, refreshProfile } = useAuth();
  const [settings, setSettings] = useState({
    notifications: true,
    publicProfile: true,
    darkMode: false
  });
  const [editingBio, setEditingBio] = useState(false);
  const [bioText, setBioText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (profile) {
      setBioText(profile.bio || "");
    }
  }, [profile]);

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

  const handleEditBio = () => {
    setEditingBio(true);
  };

  const handleSaveBio = async () => {
    if (!profile) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ bio: bioText })
        .eq('id', profile.id);
      
      if (error) {
        throw error;
      }
      
      await refreshProfile();
      setEditingBio(false);
      toast.success("Bio updated successfully!");
    } catch (error) {
      console.error("Error updating bio:", error);
      toast.error("Failed to update bio");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEditBio = () => {
    setBioText(profile?.bio || "");
    setEditingBio(false);
  };
  
  if (!profile) {
    return (
      <div className="flex min-h-screen w-full bg-gray-50 items-center justify-center">
        <div className="text-center p-8">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary mx-auto mb-4"></div>
          <p>Loading your profile settings...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <SimpleSidebar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          
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
                    <Button onClick={handleSaveBio} size="sm" disabled={isLoading}>
                      {isLoading ? (
                        <span className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin mr-2" />
                      ) : (
                        <Check className="h-4 w-4 mr-2" />
                      )}
                      Save
                    </Button>
                    <Button onClick={handleCancelEditBio} variant="outline" size="sm" disabled={isLoading}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <p className="text-gray-600">{profile.bio || "No bio added yet. Click edit to add one."}</p>
                  <Button variant="ghost" size="sm" onClick={handleEditBio}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              )}
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
      <MobileNavigation />
    </div>
  );
};

export default DashboardSettings;
