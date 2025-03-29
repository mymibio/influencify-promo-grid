
import { useState, useEffect } from "react";
import { User, PromotionalItem, SocialLinks } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, MessageCircle, Mail, Youtube, Twitter, Plus, Copy, Link, Pencil, LayoutGrid, BarChart, Palette, Settings } from "lucide-react";
import SimpleSidebar from "@/components/dashboard/simple-sidebar";
import AddItemCard from "@/components/dashboard/add-item-card";
import AddItemDialog from "@/components/dashboard/add-item-dialog";
import PromotionalGrid from "@/components/profile/promotional-grid";
import ProfilePreview from "@/components/dashboard/profile-preview";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import MobileNavigation from "@/components/dashboard/mobile-navigation";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [items, setItems] = useState<PromotionalItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isSocialDialogOpen, setIsSocialDialogOpen] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editedBio, setEditedBio] = useState("");
  const [currentDraggedItem, setCurrentDraggedItem] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<PromotionalItem | null>(null);
  const [selectedTheme, setSelectedTheme] = useState("default");
  const [currentSocialPlatform, setCurrentSocialPlatform] = useState<string>("");
  const [socialHandle, setSocialHandle] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  
  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          // Convert social_links from JSON to SocialLinks type
          const socialLinks: SocialLinks = data.social_links ? 
            (data.social_links as Record<string, string>) : 
            {};
          
          setUserProfile({
            id: data.id,
            username: data.username,
            email: data.email,
            name: data.name,
            profilePicture: data.profile_picture,
            bio: data.bio || "",
            socialLinks: socialLinks,
            categories: data.categories || [],
            createdAt: data.created_at
          });
          setEditedBio(data.bio || "");
        }
        
        // Fetch promotional items
        const { data: itemsData, error: itemsError } = await supabase
          .from('promotional_items')
          .select('*')
          .eq('user_id', user.id)
          .order('position');
          
        if (itemsError) throw itemsError;
        
        if (itemsData) {
          const typedItems: PromotionalItem[] = itemsData.map(item => ({
            id: item.id,
            userId: item.user_id,
            title: item.title,
            description: item.description,
            image: item.image,
            url: item.url,
            // Ensure type is always one of the allowed values
            type: (item.type === 'product' || item.type === 'coupon') ? item.type : 'product',
            // Ensure aspectRatio is always one of the allowed values
            aspectRatio: (item.aspect_ratio === '1:1' || item.aspect_ratio === '9:16') ? item.aspect_ratio : '9:16',
            couponCode: item.coupon_code,
            discount: item.discount,
            category: item.category,
            createdAt: item.created_at
          }));
          
          setItems(typedItems);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load your profile data");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [user]);
  
  const getInitials = (name: string) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "";
  };
  
  const handleAddItem = () => {
    setIsDialogOpen(true);
  };
  
  const handleCopyLink = () => {
    if (!userProfile) return;
    
    const shareableLink = `linkpromo.io/${userProfile.username}`;
    navigator.clipboard.writeText(shareableLink)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy link");
      });
  };

  const handleEditBio = () => {
    setIsEditingBio(true);
  };

  const handleSaveBio = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ bio: editedBio })
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Update local state
      setUserProfile(prev => prev ? {
        ...prev,
        bio: editedBio
      } : null);
      
      setIsEditingBio(false);
      toast.success("Bio updated successfully!");
    } catch (error) {
      console.error("Error updating bio:", error);
      toast.error("Failed to update bio");
    }
  };
  
  const handleEditCard = (id: string) => {
    const itemToEdit = items.find(item => item.id === id);
    if (itemToEdit) {
      setEditingItem(itemToEdit);
      setIsDialogOpen(true);
      toast.info("Editing your promotional item");
    }
  };

  const handleDeleteCard = async (id: string) => {
    try {
      const { error } = await supabase
        .from('promotional_items')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setItems(prevItems => prevItems.filter(item => item.id !== id));
      toast.success("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete item");
    }
  };

  const handleDragCard = (id: string) => {
    setCurrentDraggedItem(id);
    toast.info("Drag the card to reorder your items");
  };
  
  const handleReorderCards = async (reorderedItems: PromotionalItem[]) => {
    try {
      // Update positions in database
      for (let i = 0; i < reorderedItems.length; i++) {
        await supabase
          .from('promotional_items')
          .update({ position: i })
          .eq('id', reorderedItems[i].id);
      }
      
      setItems(reorderedItems);
    } catch (error) {
      console.error("Error reordering items:", error);
      toast.error("Failed to save the new order");
    }
  };
  
  const handleSaveItem = async (updatedItem: PromotionalItem) => {
    if (!user) return;
    
    try {
      if (editingItem) {
        // Update existing item
        const { error } = await supabase
          .from('promotional_items')
          .update({
            title: updatedItem.title,
            description: updatedItem.description,
            image: updatedItem.image,
            url: updatedItem.url,
            type: updatedItem.type,
            aspect_ratio: updatedItem.aspectRatio,
            coupon_code: updatedItem.couponCode,
            discount: updatedItem.discount,
            category: updatedItem.category
          })
          .eq('id', updatedItem.id);
          
        if (error) throw error;
        
        setItems(prevItems => 
          prevItems.map(item => 
            item.id === updatedItem.id ? updatedItem : item
          )
        );
        toast.success("Item updated successfully");
      } else {
        // Create new item
        const { data, error } = await supabase
          .from('promotional_items')
          .insert({
            user_id: user.id,
            title: updatedItem.title,
            description: updatedItem.description,
            image: updatedItem.image,
            url: updatedItem.url,
            type: updatedItem.type,
            aspect_ratio: updatedItem.aspectRatio,
            coupon_code: updatedItem.couponCode,
            discount: updatedItem.discount,
            category: updatedItem.category,
            position: items.length
          })
          .select()
          .single();
          
        if (error) throw error;
        
        if (data) {
          const newItem: PromotionalItem = {
            id: data.id,
            userId: data.user_id,
            title: data.title,
            description: data.description,
            image: data.image,
            url: data.url,
            // Ensure type is always one of the allowed values
            type: (data.type === 'product' || data.type === 'coupon') ? data.type : 'product',
            // Ensure aspectRatio is always one of the allowed values
            aspectRatio: (data.aspect_ratio === '1:1' || data.aspect_ratio === '9:16') ? data.aspect_ratio : '9:16',
            couponCode: data.coupon_code,
            discount: data.discount,
            category: data.category,
            createdAt: data.created_at
          };
          
          setItems(prevItems => [...prevItems, newItem]);
          toast.success("New item added successfully");
        }
      }
    } catch (error) {
      console.error("Error saving item:", error);
      toast.error("Failed to save item");
    } finally {
      setEditingItem(null);
      setIsDialogOpen(false);
    }
  };

  const handleEditProfilePicture = async (file: File) => {
    if (!user) return;
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-profile-${Date.now()}.${fileExt}`;
      
      // Upload to storage
      const { data, error } = await supabase.storage
        .from('profile_pictures')
        .upload(fileName, file);
        
      if (error) throw error;
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile_pictures')
        .getPublicUrl(fileName);
      
      // Update profile
      await supabase
        .from('user_profiles')
        .update({ profile_picture: publicUrl })
        .eq('id', user.id);
      
      setUserProfile(prev => prev ? {
        ...prev,
        profilePicture: publicUrl
      } : null);
      
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast.error("Failed to update profile picture");
    }
  };
  
  const handleAddSocialMedia = () => {
    setIsSocialDialogOpen(true);
  };

  const handleSaveSocialMedia = async () => {
    if (!user || !userProfile) return;
    
    if (currentSocialPlatform && socialHandle) {
      try {
        const updatedSocialLinks = {
          ...(userProfile.socialLinks || {}),
          [currentSocialPlatform.toLowerCase()]: socialHandle
        };
        
        const { error } = await supabase
          .from('user_profiles')
          .update({ social_links: updatedSocialLinks })
          .eq('id', user.id);
          
        if (error) throw error;
        
        setUserProfile(prev => prev ? {
          ...prev,
          socialLinks: updatedSocialLinks
        } : null);
        
        setIsSocialDialogOpen(false);
        setSocialHandle("");
        setCurrentSocialPlatform("");
        toast.success(`${currentSocialPlatform} link added successfully!`);
      } catch (error) {
        console.error("Error saving social media:", error);
        toast.error("Failed to save social media link");
      }
    }
  };

  const handleDeleteSocialLink = async (platform: string) => {
    if (!user || !userProfile || !userProfile.socialLinks) return;
    
    try {
      const updatedSocialLinks = { ...userProfile.socialLinks };
      delete updatedSocialLinks[platform as keyof typeof userProfile.socialLinks];
      
      const { error } = await supabase
        .from('user_profiles')
        .update({ social_links: updatedSocialLinks })
        .eq('id', user.id);
        
      if (error) throw error;
      
      setUserProfile(prev => prev ? {
        ...prev,
        socialLinks: updatedSocialLinks
      } : null);
      
      toast.success(`${platform} link removed successfully!`);
    } catch (error) {
      console.error("Error removing social link:", error);
      toast.error("Failed to remove social media link");
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram size={20} className="text-pink-500" />;
      case 'facebook':
        return <Facebook size={20} className="text-blue-600" />;
      case 'whatsapp':
        return <MessageCircle size={20} className="text-green-500" />;
      case 'twitter':
        return <Twitter size={20} className="text-blue-400" />;
      case 'youtube':
        return <Youtube size={20} className="text-red-500" />;
      case 'email':
        return <Mail size={20} />;
      default:
        return <Link size={20} />;
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // If no user profile found, show placeholder
  if (!userProfile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h2>
        <p className="text-center text-gray-600 mb-6">
          We're setting up your profile. Please refresh the page in a moment.
        </p>
        <Button onClick={() => window.location.reload()}>Refresh Page</Button>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen w-full bg-gray-50 pb-16 md:pb-0">
      <SimpleSidebar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {isMobile && (
            <div className="flex items-center justify-center mb-4">
              <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {!isMobile && (
              <div className="hidden lg:block">
                <ProfilePreview 
                  user={userProfile}
                  items={items}
                  selectedTheme={selectedTheme}
                  className="w-full"
                />
              </div>
            )}
            
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-4 sm:p-6">
                  <div className="relative">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-md">
                      {userProfile.profilePicture ? (
                        <img 
                          src={userProfile.profilePicture} 
                          alt={userProfile.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xl font-semibold">{getInitials(userProfile.name)}</span>
                        </div>
                      )}
                    </div>
                    <Button 
                      size="icon" 
                      className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1.5 cursor-pointer shadow-md hover:bg-primary/90 h-8 w-8"
                      onClick={() => setIsProfileDialogOpen(true)}
                    >
                      <Pencil size={16} />
                    </Button>
                  </div>
                  
                  <div className="flex-1 flex flex-col text-center md:text-left">
                    <h1 className="text-2xl sm:text-3xl font-bold">{userProfile.name}</h1>
                    
                    <div className="text-muted-foreground text-sm mb-2">
                      @{userProfile.username}
                    </div>
                    
                    {isEditingBio ? (
                      <div className="flex flex-col gap-2">
                        <Input
                          value={editedBio}
                          onChange={(e) => setEditedBio(e.target.value)}
                          className="text-sm"
                        />
                        <div className="flex gap-2 justify-end">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setIsEditingBio(false)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={handleSaveBio}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="relative group">
                        <p className="text-sm sm:text-base text-gray-600 max-w-lg">
                          {userProfile.bio || "Add a bio to tell people about yourself..."}
                        </p>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 h-6 w-6"
                          onClick={handleEditBio}
                        >
                          <Pencil size={12} />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center pb-6">
                  {userProfile.socialLinks && Object.entries(userProfile.socialLinks).map(([platform, handle]) => (
                    <div 
                      key={platform} 
                      className="relative group"
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-full"
                        onClick={() => {
                          setCurrentSocialPlatform(platform);
                          setSocialHandle(handle as string);
                          setIsSocialDialogOpen(true);
                        }}
                      >
                        {getSocialIcon(platform)}
                      </Button>
                    </div>
                  ))}
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full"
                    onClick={() => {
                      setCurrentSocialPlatform("");
                      setSocialHandle("");
                      setIsSocialDialogOpen(true);
                    }}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 bg-white rounded-lg border p-3 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Link size={18} className="text-blue-500" />
                    <span className="text-sm">
                      Your LinkPromo is live: <span className="text-blue-500 font-medium">linkpromo.io/{userProfile.username}</span>
                    </span>
                  </div>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={handleCopyLink}
                  >
                    <Copy size={16} className="mr-1" />
                    Copy URL
                  </Button>
                </div>
              </div>
              
              <div className="mb-6 mt-8">
                <h2 className="text-xl font-bold">Your Coupons</h2>
                <p className="text-muted-foreground">
                  This is how your coupons will appear to visitors. Add more coupons or edit existing ones.
                </p>
              </div>

              <PromotionalGrid 
                items={items} 
                onEdit={handleEditCard}
                onDelete={handleDeleteCard}
                onDrag={handleDragCard}
                onReorder={handleReorderCards}
                editable={true}
              />
              
              <div className="mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <AddItemCard 
                    aspectRatio="9:16" 
                    onClick={() => {
                      setEditingItem(null);
                      setIsDialogOpen(true);
                    }} 
                    label="Add Coupon" 
                  />
                  <AddItemCard 
                    aspectRatio="9:16" 
                    onClick={() => {
                      setEditingItem(null);
                      setIsDialogOpen(true);
                    }}
                    label="Add Coupon" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {isMobile && <MobileNavigation />}
      
      <AddItemDialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingItem(null);
        }}
        onAdd={handleSaveItem}
        aspectRatio="9:16"
        editItem={editingItem}
      />

      <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-center mb-4">
              <div className="relative">
                
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                value={userProfile.username} 
                onChange={(e) => setUserProfile(prev => prev ? ({ ...prev, username: e.target.value }) : null)} 
                placeholder="Enter your username"
              />
            </div>
            <div className="pt-4 flex justify-end">
              <Button onClick={() => setIsProfileDialogOpen(false)}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isSocialDialogOpen} onOpenChange={setIsSocialDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Social Media</DialogTitle>
            <DialogDescription>
              Connect your social media accounts to your profile
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <div className="grid grid-cols-3 gap-2">
                {['Instagram', 'Youtube', 'Twitter', 'Facebook', 'Email', 'WhatsApp'].map(platform => (
                  <Button 
                    key={platform}
                    variant={currentSocialPlatform === platform.toLowerCase() ? "default" : "outline"}
                    className="flex flex-col gap-1 h-auto py-2"
                    onClick={() => setCurrentSocialPlatform(platform.toLowerCase())}
                  >
                    {getSocialIcon(platform)}
                    <span className="text-xs">{platform}</span>
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="handle">Username/Handle</Label>
              <Input 
                id="handle" 
                value={socialHandle} 
                onChange={(e) => setSocialHandle(e.target.value)}
                placeholder={`Enter your ${currentSocialPlatform} handle`}
                disabled={!currentSocialPlatform}
              />
            </div>
            <div className="pt-4 flex justify-end">
              <Button 
                onClick={handleSaveSocialMedia}
                disabled={!currentSocialPlatform || !socialHandle}
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
