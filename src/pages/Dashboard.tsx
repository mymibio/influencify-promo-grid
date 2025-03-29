
import { useState } from "react";
import { User, PromotionalItem } from "@/types/user";
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const sampleUser: User = {
  id: "123",
  username: "fashionista",
  email: "ashley@example.com",
  name: "Ashley Johnson",
  profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop",
  bio: "Fashion & lifestyle content creator. Sharing my favorite coupons and deals with you!",
  socialLinks: {
    instagram: "fashionista",
    facebook: "fashionista.style",
    whatsapp: "+1234567890",
    twitter: "fashionista",
    email: "contact@fashionista.com"
  },
  createdAt: new Date().toISOString()
};

const sampleItems: PromotionalItem[] = [
  {
    id: "1",
    userId: "123",
    title: "Amazon Summer Sale",
    description: "Get 20% off on all summer essentials",
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2340&h=1000&auto=format&fit=crop",
    url: "https://amazon.com",
    type: "coupon",
    aspectRatio: "9:16",
    couponCode: "SUMMER20",
    discount: "20% OFF",
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    userId: "123",
    title: "Sephora Beauty Insider",
    description: "Exclusive discount for beauty products",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2340&h=1000&auto=format&fit=crop",
    url: "https://sephora.com",
    type: "coupon",
    aspectRatio: "9:16",
    couponCode: "BEAUTY15",
    discount: "15% OFF",
    createdAt: new Date().toISOString()
  }
];

const Dashboard = () => {
  const [user, setUser] = useState(sampleUser);
  const [items, setItems] = useState(sampleItems);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isSocialDialogOpen, setIsSocialDialogOpen] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editedBio, setEditedBio] = useState(user.bio || "");
  const [currentDraggedItem, setCurrentDraggedItem] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<PromotionalItem | null>(null);
  const [selectedTheme, setSelectedTheme] = useState("default");
  const [currentSocialPlatform, setCurrentSocialPlatform] = useState<string>("");
  const [socialHandle, setSocialHandle] = useState<string>("");
  const isMobile = useIsMobile();
  
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
    const shareableLink = `linkpromo.io/${user.username}`;
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

  const handleSaveBio = () => {
    setUser(prev => ({
      ...prev,
      bio: editedBio
    }));
    setIsEditingBio(false);
    toast.success("Bio updated successfully!");
  };
  
  const handleEditCard = (id: string) => {
    const itemToEdit = items.find(item => item.id === id);
    if (itemToEdit) {
      setEditingItem(itemToEdit);
      setIsDialogOpen(true);
      toast.info("Editing your promotional item");
    }
  };

  const handleDeleteCard = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    toast.success("Item deleted successfully");
  };

  const handleDragCard = (id: string) => {
    setCurrentDraggedItem(id);
    toast.info("Drag the card to reorder your items");
  };
  
  const handleReorderCards = (reorderedItems: PromotionalItem[]) => {
    setItems(reorderedItems);
  };
  
  const handleSaveItem = (updatedItem: PromotionalItem) => {
    if (editingItem) {
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === updatedItem.id ? updatedItem : item
        )
      );
      toast.success("Item updated successfully");
    } else {
      setItems(prevItems => [...prevItems, updatedItem]);
      toast.success("New item added successfully");
    }
    
    setEditingItem(null);
    setIsDialogOpen(false);
  };

  const handleEditProfilePicture = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    
    setUser(prev => ({
      ...prev,
      profilePicture: imageUrl
    }));
    
    toast.success("Profile picture updated successfully!");
  };
  
  const handleAddSocialMedia = () => {
    setIsSocialDialogOpen(true);
  };

  const handleSaveSocialMedia = () => {
    if (currentSocialPlatform && socialHandle) {
      setUser(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [currentSocialPlatform.toLowerCase()]: socialHandle
        }
      }));
      setIsSocialDialogOpen(false);
      setSocialHandle("");
      setCurrentSocialPlatform("");
      toast.success(`${currentSocialPlatform} link added successfully!`);
    }
  };

  const handleDeleteSocialLink = (platform: string) => {
    if (user.socialLinks) {
      const updatedSocialLinks = { ...user.socialLinks };
      delete updatedSocialLinks[platform as keyof typeof user.socialLinks];
      
      setUser(prev => ({
        ...prev,
        socialLinks: updatedSocialLinks
      }));
      
      toast.success(`${platform} link removed successfully!`);
    }
  };

  const handleEditSocialLink = (platform: string, handle: string) => {
    if (user.socialLinks) {
      setUser(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [platform]: handle
        }
      }));
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
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <Card className="col-span-12 lg:col-span-4 lg:row-span-2 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm rounded-3xl overflow-hidden animate-fade-in">
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md">
                      {user.profilePicture ? (
                        <img 
                          src={user.profilePicture} 
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xl font-semibold">{getInitials(user.name)}</span>
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
                  
                  <div className="flex flex-col items-center text-center">
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-muted-foreground text-sm">@{user.username}</p>
                    
                    {isEditingBio ? (
                      <div className="flex flex-col gap-2 w-full mt-2">
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
                      <div className="relative group mt-2">
                        <p className="text-sm text-gray-600">
                          {user.bio}
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
                  
                  <div className="flex flex-wrap gap-2 justify-center mt-2">
                    {user.socialLinks && Object.entries(user.socialLinks).map(([platform, handle]) => (
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
                            setSocialHandle(handle);
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
              </CardContent>
            </Card>
            
            <Card className="col-span-12 lg:col-span-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-100 shadow-sm rounded-3xl overflow-hidden animate-fade-in">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-500 rounded-full p-2 text-white">
                      <Link size={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Your LinkPromo URL</h3>
                      <p className="text-sm text-muted-foreground">Share your profile with the world</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border shadow-sm">
                    <span className="text-blue-600 font-medium">linkpromo.io/{user.username}</span>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-blue-50"
                      onClick={handleCopyLink}
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {!isMobile && (
              <Card className="hidden lg:block lg:col-span-4 border-none shadow-none rounded-3xl overflow-hidden">
                <CardContent className="p-0">
                  <ProfilePreview 
                    user={user}
                    items={items}
                    selectedTheme={selectedTheme}
                    className="w-full h-[600px]"
                  />
                </CardContent>
              </Card>
            )}
            
            <Card className="col-span-12 lg:col-span-8 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm rounded-3xl overflow-hidden animate-fade-in">
              <CardHeader className="pb-0">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-bold">Your Coupons</CardTitle>
                    <CardDescription>
                      Add and manage your promotional coupons
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => {
                      setEditingItem(null);
                      setIsDialogOpen(true);
                    }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Coupon
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <PromotionalGrid 
                  items={items} 
                  onEdit={handleEditCard}
                  onDelete={handleDeleteCard}
                  onDrag={handleDragCard}
                  onReorder={handleReorderCards}
                  editable={true}
                />
                
                <div className="mt-6 grid grid-cols-2 gap-4">
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
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
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
                value={user.username} 
                onChange={(e) => setUser(prev => ({ ...prev, username: e.target.value }))} 
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
