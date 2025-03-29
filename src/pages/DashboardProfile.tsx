
import { useState } from "react";
import { User, SocialLinks } from "@/types/user";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Instagram, Twitter, Youtube, Video, Upload } from "lucide-react";
import { toast } from "sonner";

// Mock user data for demonstration
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

const DashboardProfile = () => {
  const [formData, setFormData] = useState({
    name: sampleUser.name,
    username: sampleUser.username,
    bio: sampleUser.bio || "",
    instagram: sampleUser.socialLinks?.instagram || "",
    tiktok: sampleUser.socialLinks?.tiktok || "",
    youtube: sampleUser.socialLinks?.youtube || "",
    twitter: sampleUser.socialLinks?.twitter || "",
  });
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the profile to an API
    toast.success("Profile updated successfully!");
  };
  
  return (
    <DashboardLayout user={sampleUser}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and social links</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 mb-6">
                  <Avatar className="h-24 w-24">
                    {sampleUser.profilePicture ? (
                      <AvatarImage src={sampleUser.profilePicture} alt={sampleUser.name} />
                    ) : (
                      <AvatarFallback>{getInitials(sampleUser.name)}</AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex flex-col gap-2 items-center sm:items-start">
                    <h3 className="text-lg font-medium">Profile Picture</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload a new profile picture. JPG, PNG or GIF. 1:1 aspect ratio recommended.
                    </p>
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    <FormDescription>
                      Your full name as displayed on your profile.
                    </FormDescription>
                  </div>
                  
                  <div className="space-y-2">
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                    <FormDescription>
                      Your unique username for your profile URL.
                    </FormDescription>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <FormLabel htmlFor="bio">Bio</FormLabel>
                  <Input
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                  />
                  <FormDescription>
                    A short description about you that will appear on your profile.
                  </FormDescription>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-4">Social Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FormLabel className="flex items-center gap-2" htmlFor="instagram">
                        <Instagram size={18} />
                        Instagram
                      </FormLabel>
                      <Input
                        id="instagram"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleInputChange}
                        placeholder="username"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <FormLabel className="flex items-center gap-2" htmlFor="tiktok">
                        <Video size={18} />
                        TikTok
                      </FormLabel>
                      <Input
                        id="tiktok"
                        name="tiktok"
                        value={formData.tiktok}
                        onChange={handleInputChange}
                        placeholder="username"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <FormLabel className="flex items-center gap-2" htmlFor="youtube">
                        <Youtube size={18} />
                        YouTube
                      </FormLabel>
                      <Input
                        id="youtube"
                        name="youtube"
                        value={formData.youtube}
                        onChange={handleInputChange}
                        placeholder="channel"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <FormLabel className="flex items-center gap-2" htmlFor="twitter">
                        <Twitter size={18} />
                        Twitter
                      </FormLabel>
                      <Input
                        id="twitter"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleInputChange}
                        placeholder="username"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardProfile;
