
import { useState, useEffect } from "react";
import { User } from "@/types/user";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import SimpleSidebar from "@/components/dashboard/simple-sidebar";
import { Pencil, Check, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardSettings = () => {
  const [user, setUser] = useState<User | null>(null);
  const [settings, setSettings] = useState({
    notifications: true,
    publicProfile: true,
    darkMode: false
  });
  const [editingBio, setEditingBio] = useState(false);
  const [bioText, setBioText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const { profile } = useAuth();
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (!profile) return;
      
      try {
        setIsLoading(true);
        
        // Fetch user profile from Supabase
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', profile.id)
          .single();
        
        if (error) {
          console.error("Error fetching user data:", error);
          toast.error("Failed to load user data");
          return;
        }
        
        if (data) {
          const userData: User = {
            id: data.id,
            username: data.username,
            email: data.email,
            name: data.name,
            profilePicture: data.profile_picture,
            bio: data.bio || "",
            socialLinks: data.social_links as User['socialLinks'] || {}, // Fix the type cast here
            createdAt: data.created_at
          };
          
          setUser(userData);
          setBioText(userData.bio || "");
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
  
  const handleSettingChange = (setting: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));

    toast.success(`${setting.charAt(0).toUpperCase() + setting.slice(1)} ${value ? 'enabled' : 'disabled'}`);
  };
  
  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!");
  };

  const handleEditBio = () => {
    setEditingBio(true);
  };

  const handleSaveBio = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ bio: bioText })
        .eq('id', user.id);
      
      if (error) {
        console.error("Error updating bio:", error);
        toast.error("Failed to update bio");
        return;
      }
      
      setUser(prev => prev ? {
        ...prev,
        bio: bioText
      } : null);
      
      setEditingBio(false);
      toast.success("Bio updated successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    }
  };

  const handleCancelEditBio = () => {
    setBioText(user?.bio || "");
    setEditingBio(false);
  };
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full bg-gray-50">
        <SimpleSidebar />
        
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            
            {/* User Bio Section Skeleton */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Bio</CardTitle>
                <CardDescription>Your profile description seen by visitors</CardDescription>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
            
            {/* Settings Skeleton */}
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-10 w-32" />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <SimpleSidebar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
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
                  <p className="text-gray-600">{user?.bio || "No bio added yet."}</p>
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
    </div>
  );
};

export default DashboardSettings;
