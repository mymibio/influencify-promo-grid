import { useState, useEffect } from "react";
import { PromotionalItem } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, MessageCircle, Mail, Youtube, Twitter, Plus, Copy, Link, Pencil } from "lucide-react";
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
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import SocialMediaSelector from "@/components/social/SocialMediaSelector";
import ProfileHeader from "@/components/profile/profile-header";

const Dashboard = () => {
  const { profile, refreshProfile } = useAuth();
  const [items, setItems] = useState<PromotionalItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isSocialSelectorOpen, setIsSocialSelectorOpen] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editedBio, setEditedBio] = useState(profile?.bio || "");
  const [currentDraggedItem, setCurrentDraggedItem] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<PromotionalItem | null>(null);
  const [selectedTheme, setSelectedTheme] = useState("default");
  const [currentSocialPlatform, setCurrentSocialPlatform] = useState<string>("");
  const [socialHandle, setSocialHandle] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (profile) {
      setEditedBio(profile.bio || "");
      fetchUserItems();
    }
  }, [profile]);

  const fetchUserItems = async () => {
    if (!profile) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('promotional_items')
        .select('*')
        .eq('user_id', profile.id)
        .order('position', { ascending: true });
      
      if (error) {
        throw error;
      }
      
      const typedItems: PromotionalItem[] = data.map(item => ({
        id: item.id,
        userId: item.user_id,
        title: item.title,
        description: item.description || undefined,
        image: item.image || undefined,
        url: item.url || "",
        type: item.type as "product" | "coupon",
        aspectRatio: item.aspect_ratio as "1:1" | "9:16",
        couponCode: item.coupon_code || undefined,
        discount: item.discount || undefined,
        category: item.category || undefined,
        createdAt: item.created_at,
      }));
      
      setItems(typedItems);
    } catch (error) {
      console.error("Error fetching promotional items:", error);
      toast.error("Failed to load your promotional items");
    } finally {
      setIsLoading(false);
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  const handleAddItem = () => {
    setIsDialogOpen(true);
  };
  
  const handleAddNewItem = (newItem: PromotionalItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };
  
  const handleCopyLink = () => {
    if (!profile) return;
    
    const shareableLink = `${window.location.origin}/${profile.username}`;
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
    if (!profile) return;
    
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ bio: editedBio })
        .eq('id', profile.id);
      
      if (error) {
        throw error;
      }
      
      await refreshProfile();
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
    }
  };

  const handleDeleteCard = async (id: string) => {
    if (!profile) return;
    
    try {
      const { error } = await supabase
        .from('promotional_items')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      setItems(prevItems => prevItems.filter(item => item.id !== id));
      toast.success("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete item");
    }
  };

  const handleDragCard = (id: string) => {
    setCurrentDraggedItem(id);
  };
  
  const handleReorderCards = async (reorderedItems: PromotionalItem[]) => {
    if (!profile) return;
    
    setItems(reorderedItems);
    
    try {
      const updates = reorderedItems.map((item, index) => ({
        id: item.id,
        position: index,
      }));
      
      for (const update of updates) {
        await supabase
          .from('promotional_items')
          .update({ position: update.position })
          .eq('id', update.id);
      }
    } catch (error) {
      console.error("Error updating item positions:", error);
      toast.error("Failed to save item order");
    }
  };
  
  const handleSaveItem = async (updatedItem: PromotionalItem) => {
    if (!profile) return;
    
    try {
      if (editingItem) {
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
            category: updatedItem.category,
          })
          .eq('id', updatedItem.id);
          
        if (error) {
          throw error;
        }
        
        setItems(prevItems => 
          prevItems.map(item => 
            item.id === updatedItem.id ? updatedItem : item
          )
        );
        toast.success("Item updated successfully");
      } else {
        const newItem = {
          ...updatedItem,
          id: uuidv4(),
          userId: profile.id,
          createdAt: new Date().toISOString(),
        };
        
        const { error } = await supabase
          .from('promotional_items')
          .insert({
            id: newItem.id,
            user_id: newItem.userId,
            title: newItem.title,
            description: newItem.description,
            image: newItem.image,
            url: newItem.url,
            type: newItem.type,
            aspect_ratio: newItem.aspectRatio,
            coupon_code: newItem.couponCode,
            discount: newItem.discount,
            category: newItem.category,
            position: items.length,
          });
          
        if (error) {
          throw error;
        }
        
        setItems(prevItems => [...prevItems, newItem]);
        toast.success("New item added successfully");
      }
    } catch (error) {
      console.error("Error saving item:", error);
      toast.error("Failed to save item");
    }
    
    setEditingItem(null);
    setIsDialogOpen(false);
  };

  const handleEditProfilePicture = async (file: File) => {
    if (!profile) return;
    
    try {
      const imageUrl = URL.createObjectURL(file);
      
      const { error } = await supabase
        .from('user_profiles')
        .update({ profile_picture: imageUrl })
        .eq('id', profile.id);
      
      if (error) {
        throw error;
      }
      
      await refreshProfile();
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast.error("Failed to update profile picture");
    }
  };
  
  const handleAddSocialMedia = async (platform: string, handle: string) => {
    if (!profile) return;
    
    try {
      const updatedSocialLinks = {
        ...(profile.socialLinks || {}),
        [platform]: handle
      };
      
      const { error } = await supabase
        .from('user_profiles')
        .update({ social_links: updatedSocialLinks })
        .eq('id', profile.id);
      
      if (error) {
        throw error;
      }
      
      await refreshProfile();
      setIsSocialSelectorOpen(false);
      setCurrentSocialPlatform("");
      setSocialHandle("");
      toast.success(`${platform} link added successfully!`);
    } catch (error) {
      console.error("Error updating social links:", error);
      toast.error("Failed to update social media");
    }
  };

  const handleDeleteSocialLink = async (platform: string) => {
    if (!profile || !profile.socialLinks) return;
    
    try {
      const updatedSocialLinks = { ...profile.socialLinks };
      delete updatedSocialLinks[platform];
      
      const { error } = await supabase
        .from('user_profiles')
        .update({ social_links: updatedSocialLinks })
        .eq('id', profile.id);
      
      if (error) {
        throw error;
      }
      
      await refreshProfile();
      toast.success(`${platform} link removed successfully!`);
    } catch (error) {
      console.error("Error deleting social link:", error);
      toast.error("Failed to remove social media");
    }
  };

  const openSocialSelector = () => {
    setIsSocialSelectorOpen(true);
  };

  if (!profile) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center p-8">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-brand-purple mx-auto mb-4"></div>
          <p>Loading your profile...</p>
        </div>
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
                  user={profile}
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
                      {profile.profilePicture ? (
                        <img 
                          src={profile.profilePicture} 
                          alt={profile.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xl font-semibold">{profile.name.charAt(0)}</span>
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
                    <h1 className="text-2xl sm:text-3xl font-bold">{profile?.name}</h1>
                    
                    <div className="text-muted-foreground text-sm mb-2">
                      @{profile?.username}
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
                          {profile.bio || "Add a bio to tell people about yourself"}
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
                    
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-4">
                      <Button
                        onClick={openSocialSelector}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Plus size={16} />
                        Manage social links
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 bg-white rounded-lg border p-3 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Link size={18} className="text-blue-500" />
                    <span className="text-sm">
                      Your LinkPromo is live: <a href={`/${profile.username}`} className="text-blue-500 font-medium hover:underline">{window.location.origin}/{profile.username}</a>
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

              {isLoading ? (
                <div className="text-center py-12">
                  <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-brand-purple mx-auto mb-4"></div>
                  <p>Loading your promotional items...</p>
                </div>
              ) : (
                <>
                  {items.length > 0 ? (
                    <PromotionalGrid 
                      items={items} 
                      onEdit={handleEditCard}
                      onDelete={handleDeleteCard}
                      onDrag={handleDragCard}
                      onReorder={handleReorderCards}
                      editable={true}
                    />
                  ) : (
                    <div className="text-center py-8 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
                      <p className="text-gray-500 mb-4">You don't have any promotional items yet.</p>
                      <Button 
                        onClick={() => {
                          setEditingItem(null);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Plus size={16} className="mr-1" />
                        Add Your First Item
                      </Button>
                    </div>
                  )}
                </>
              )}
              
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
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 flex items-center justify-center bg-gray-100">
                  {profile.profilePicture ? (
                    <img 
                      src={profile.profilePicture} 
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-semibold">{getInitials(profile.name)}</span>
                  )}
                </div>
                <Button 
                  size="icon" 
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-primary"
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = (e) => {
                      const files = (e.target as HTMLInputElement).files;
                      if (files && files[0]) {
                        handleEditProfilePicture(files[0]);
                      }
                    };
                    input.click();
                  }}
                >
                  <Pencil size={16} className="text-white" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                value={profile.username} 
                disabled
                className="bg-gray-50"
              />
              <p className="text-xs text-muted-foreground">Username cannot be changed</p>
            </div>
            <div className="pt-4 flex justify-end">
              <Button onClick={() => setIsProfileDialogOpen(false)}>Close</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <SocialMediaSelector
        isOpen={isSocialSelectorOpen}
        onClose={() => setIsSocialSelectorOpen(false)}
        onSave={handleAddSocialMedia}
        onDelete={handleDeleteSocialLink}
        userSocialLinks={profile.socialLinks}
      />
    </div>
  );
};

export default Dashboard;
