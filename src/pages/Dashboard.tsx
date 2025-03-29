
import { useState } from "react";
import { User, PromotionalItem, SocialLinks } from "@/types/user";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, MessageCircle, Mail, Plus, Copy, Link, Edit, Save, Pencil, Youtube, Twitter } from "lucide-react";
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
  const [newUsername, setNewUsername] = useState(user.username);
  const [newProfilePicture, setNewProfilePicture] = useState<string | undefined>(user.profilePicture);
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

  const handleEditProfile = () => {
    setNewUsername(user.username);
    setNewProfilePicture(user.profilePicture);
    setIsProfileDialogOpen(true);
  };
  
  const handleSaveProfile = () => {
    setUser(prev => ({
      ...prev,
      username: newUsername,
      profilePicture: newProfilePicture
    }));
    setIsProfileDialogOpen(false);
    toast.success("Profile updated successfully!");
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
    <div className="flex min-h-screen w-full bg-gray-50">
      <SimpleSidebar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {!isMobile && (
              <div className="hidden lg:block">
                <ProfilePreview 
                  user={user}
                  items={items}
                  selectedTheme={selectedTheme}
                  className="w-full"
                />
              </div>
            )}
            
            <div className="lg:col-span-2">
              <div className="flex flex-col items-center mb-10 md:flex-row md:justify-start md:gap-8">
                <div className="relative">
                  <Avatar className="h-24 w-24 mb-4 md:mb-0">
                    {user.profilePicture ? (
                      <AvatarImage src={user.profilePicture} alt={user.name} />
                    ) : (
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    )}
                  </Avatar>
                  <Button 
                    size="icon" 
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-primary"
                    onClick={handleEditProfile}
                  >
                    <Pencil size={16} className="text-white" />
                  </Button>
                </div>
                
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold">@{user.username}</h1>
                  
                  <div className="mt-1 relative">
                    {isEditingBio ? (
                      <div className="flex items-center gap-2">
                        <Input 
                          value={editedBio} 
                          onChange={(e) => setEditedBio(e.target.value)}
                          className="pr-10"
                          maxLength={160}
                          placeholder="Add bio"
                        />
                        <Button size="sm" variant="ghost" onClick={handleSaveBio} className="absolute right-2">
                          <Save size={16} />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <p className="text-gray-600">{user.bio || "Add bio..."}</p>
                        <Button size="sm" variant="ghost" onClick={handleEditBio} className="p-1 h-auto">
                          <Edit size={16} className="text-gray-500" />
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 mt-4 justify-center md:justify-start flex-wrap">
                    {user.socialLinks && Object.entries(user.socialLinks).map(([platform, handle]) => (
                      <Button key={platform} variant="outline" size="icon" className="rounded-full bg-white">
                        {getSocialIcon(platform)}
                      </Button>
                    ))}
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full bg-gray-100 border-dashed"
                      onClick={handleAddSocialMedia}
                    >
                      <Plus size={20} />
                    </Button>
                  </div>
                  
                  <div className="mt-4 bg-white rounded-lg border p-3 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Link size={18} className="text-blue-500" />
                        <span className="text-sm">
                          Your LinkPromo is live: <span className="text-blue-500 font-medium">linkpromo.io/{user.username}</span>
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
                </div>
              </div>
              
              <div className="mb-6">
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

      {/* Profile Edit Dialog */}
      <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Change your profile picture and username
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                value={newUsername} 
                onChange={(e) => setNewUsername(e.target.value)} 
                placeholder="Enter your username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profilePicture">Profile Picture URL</Label>
              <Input 
                id="profilePicture" 
                value={newProfilePicture || ''} 
                onChange={(e) => setNewProfilePicture(e.target.value)} 
                placeholder="Enter profile picture URL"
              />
            </div>
            <div className="pt-4 flex justify-end">
              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Social Media Dialog */}
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
