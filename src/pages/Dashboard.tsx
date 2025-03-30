import { useState, useEffect, useRef } from "react";
import { PromotionalItem } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Plus, Copy, Link, Pencil, X, Check } from "lucide-react";
import SimpleSidebar from "@/components/dashboard/simple-sidebar";
import AddItemCard from "@/components/dashboard/add-item-card";
import AddItemDialog from "@/components/dashboard/add-item-dialog";
import PromotionalGrid from "@/components/profile/promotional-grid";
import ProfilePreview from "@/components/dashboard/profile-preview";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import SocialMediaSelector from "@/components/social/SocialMediaSelector";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

const Dashboard = () => {
  const { profile, refreshProfile } = useAuth();
  const [items, setItems] = useState<PromotionalItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isSocialSelectorOpen, setIsSocialSelectorOpen] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editedBio, setEditedBio] = useState(profile?.bio || "");
  const bioInputRef = useRef<HTMLTextAreaElement>(null);
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

  useEffect(() => {
    // Focus on the bio input when editing starts
    if (isEditingBio && bioInputRef.current) {
      bioInputRef.current.focus();
    }
  }, [isEditingBio]);

  // Handle clicks outside the bio edit area to save
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isEditingBio && 
          bioInputRef.current && 
          !bioInputRef.current.contains(e.target as Node) &&
          !(e.target as HTMLElement).closest('.edit-bio-controls')) {
        handleSaveBio();
      }
    };

    if (isEditingBio) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditingBio, editedBio]);

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

  const handleBioInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSaveBio();
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
    <div className="flex min-h-screen w-full bg-[#6B81F3] pb-16 md:pb-0">
      {/* Sidebar with yellow top background */}
      <div className="flex-shrink-0 w-[250px] hidden lg:block">
        <div className="h-20 bg-[#FFE26B] flex items-center px-4">
          <h1 className="text-2xl font-bold text-blue-600">MYMI.BIO</h1>
        </div>
        <SimpleSidebar />
      </div>
      
      <main className="flex-1">
        {/* Yellow header on mobile */}
        <div className="h-16 bg-[#FFE26B] lg:hidden flex items-center px-4">
          <h1 className="text-2xl font-bold text-blue-600">MYMI.BIO</h1>
          <div className="ml-auto px-4 py-1 border-2 border-blue-800 rounded-lg font-bold text-blue-800">
            FREE
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content area */}
            <div className="lg:col-span-2">
              {/* User profile card */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-[#5E9BF7] border-4 border-white shadow-md">
                      {profile.profilePicture ? (
                        <img 
                          src={profile.profilePicture} 
                          alt={profile.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-2xl font-semibold text-white">{profile.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <Button 
                      size="icon" 
                      className="absolute bottom-0 right-0 bg-black text-white rounded-full p-1.5 cursor-pointer shadow-md hover:bg-gray-800 h-8 w-8"
                      onClick={() => setIsProfileDialogOpen(true)}
                    >
                      <Pencil size={16} />
                    </Button>
                  </div>
                  
                  <div className="flex-1 flex flex-col text-center md:text-left">
                    <h1 className="text-2xl font-bold">{profile?.name}</h1>
                    
                    <div className="relative mb-3">
                      {!isEditingBio ? (
                        <div className="group flex items-start">
                          <p className="text-gray-600 pr-6">
                            {profile.bio || "Add bio"}
                          </p>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-6 w-6 absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={handleEditBio}
                          >
                            <Pencil size={14} />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <Textarea
                            ref={bioInputRef}
                            value={editedBio}
                            onChange={(e) => setEditedBio(e.target.value)}
                            onKeyDown={handleBioInputKeyDown}
                            placeholder="Write your bio..."
                            className="text-sm resize-none min-h-[60px]"
                            rows={3}
                          />
                          <div className="flex gap-2 justify-end edit-bio-controls">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setIsEditingBio(false);
                                setEditedBio(profile.bio || "");
                              }}
                            >
                              <X size={14} className="mr-1" /> Cancel
                            </Button>
                            <Button 
                              size="sm"
                              onClick={handleSaveBio}
                            >
                              <Check size={14} className="mr-1" /> Save
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <Button
                      onClick={openSocialSelector}
                      variant="outline"
                      className="bg-[#E6E6FA] text-blue-600 hover:bg-blue-100 rounded-full px-4 py-1 h-auto w-fit self-center md:self-start font-medium"
                    >
                      + add socials
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* URL/link card */}
              <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="bg-green-500 text-white px-2 py-1 rounded-md text-sm font-bold">
                    LIVE
                  </div>
                  <span className="flex-1 text-lg">
                    Mymi.bio/{profile.username}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-gray-600"
                    onClick={handleCopyLink}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H16C17.1046 21 18 20.1046 18 19V18M8 5C8 6.10457 8.89543 7 10 7H12C13.1046 7 14 6.10457 14 5M8 5C8 3.89543 8.89543 3 10 3H12C13.1046 3 14 3.89543 14 5M14 5H16C17.1046 5 18 5.89543 18 7V10M20 14H10M10 14L13 11M10 14L13 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Button>
                </div>
              </div>
              
              {/* Coupon grid */}
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-brand-purple mx-auto mb-4"></div>
                  <p className="text-white">Loading your promotional items...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  <PromotionalGrid 
                    items={items} 
                    onEdit={handleEditCard}
                    onDelete={handleDeleteCard}
                    onDrag={handleDragCard}
                    onReorder={handleReorderCards}
                    editable={true}
                  />
                  
                  {/* Add new coupon card */}
                  <div 
                    className="flex items-center justify-center bg-white/20 rounded-xl border-2 border-white/30 border-dashed p-8 cursor-pointer hover:bg-white/30 transition-colors h-[200px]"
                    onClick={() => {
                      setEditingItem(null);
                      setIsDialogOpen(true);
                    }}
                  >
                    <div className="text-center">
                      <div className="text-white text-4xl mb-2">+</div>
                      <p className="text-white">Add coupon</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Phone preview */}
            <div className="hidden lg:block">
              <div className="bg-black rounded-3xl overflow-hidden shadow-xl p-3 mx-auto max-w-xs">
                <div className="bg-white rounded-2xl overflow-hidden h-[600px]">
                  <div className="bg-[#5E9BF7] h-[180px] relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-2xl font-bold">
                        {profile?.name?.charAt(0).toLowerCase() || "u"}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <div className="h-4 w-12 bg-gray-200 rounded-full mx-auto mb-8"></div>
                    
                    {/* Coupon preview */}
                    {items.length > 0 ? (
                      <div>
                        {items.slice(0, 1).map(item => (
                          <div key={item.id} className="mb-4">
                            <img 
                              src={item.image || "/placeholder.svg"} 
                              alt={item.title} 
                              className="w-full h-48 object-cover rounded-xl mb-2"
                            />
                            <p className="font-medium">{item.title}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-gray-400 text-sm">
                        No coupons yet
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Dialogs and popovers */}
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
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4 py-4">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 flex items-center justify-center bg-[#5E9BF7]">
                    {profile.profilePicture ? (
                      <img 
                        src={profile.profilePicture} 
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-semibold text-white">{getInitials(profile.name)}</span>
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
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  value={editedBio}
                  onChange={(e) => setEditedBio(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="pt-4 flex justify-end">
                <Button onClick={() => {
                  handleSaveBio();
                  setIsProfileDialogOpen(false);
                }}>Save</Button>
              </div>
            </div>
          </ScrollArea>
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
