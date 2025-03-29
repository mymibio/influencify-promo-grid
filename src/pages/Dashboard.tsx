
import { useState } from "react";
import { User, PromotionalItem } from "@/types/user";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, MessageCircle, Mail, Plus, Copy, Link } from "lucide-react";
import SimpleSidebar from "@/components/dashboard/simple-sidebar";
import AddItemCard from "@/components/dashboard/add-item-card";
import AddItemDialog from "@/components/dashboard/add-item-dialog";
import PromotionalGrid from "@/components/profile/promotional-grid";
import { toast } from "sonner";

// Mock user data
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

// Sample promotional items
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
    createdAt: new Date().toISOString()
  }
];

const Dashboard = () => {
  const [user, setUser] = useState(sampleUser);
  const [items, setItems] = useState(sampleItems);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
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
  
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <SimpleSidebar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* User Profile Header */}
          <div className="flex flex-col items-center mb-10 md:flex-row md:justify-start md:gap-8">
            <Avatar className="h-24 w-24 mb-4 md:mb-0">
              {user.profilePicture ? (
                <AvatarImage src={user.profilePicture} alt={user.name} />
              ) : (
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              )}
            </Avatar>
            
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-gray-600 mt-1">{user.bio || "Bio..."}</p>
              
              <div className="flex gap-2 mt-4 justify-center md:justify-start">
                {user.socialLinks?.instagram && (
                  <Button variant="outline" size="icon" className="rounded-full bg-white">
                    <Instagram size={20} className="text-pink-500" />
                  </Button>
                )}
                {user.socialLinks?.facebook && (
                  <Button variant="outline" size="icon" className="rounded-full bg-white">
                    <Facebook size={20} className="text-blue-600" />
                  </Button>
                )}
                {user.socialLinks?.whatsapp && (
                  <Button variant="outline" size="icon" className="rounded-full bg-white">
                    <MessageCircle size={20} className="text-green-500" />
                  </Button>
                )}
                {user.socialLinks?.email && (
                  <Button variant="outline" size="icon" className="rounded-full bg-white">
                    <Mail size={20} />
                  </Button>
                )}
                <Button variant="outline" size="icon" className="rounded-full bg-white">
                  <Plus size={20} />
                </Button>
              </div>
              
              {/* Shareable Link */}
              <div className="mt-4 bg-white rounded-lg border p-3 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Link size={18} className="text-blue-500" />
                    <span className="text-sm">
                      Your LinkPromo is live: <span className="text-blue-500 font-medium">linkpromo.io/{user.username}</span>
                    </span>
                  </div>
                  <Button 
                    variant="primary" 
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
          
          {/* Preview Text */}
          <div className="mb-6">
            <h2 className="text-xl font-bold">Your Coupons</h2>
            <p className="text-muted-foreground">
              This is how your coupons will appear to visitors. Add more coupons or edit existing ones.
            </p>
          </div>

          {/* Promotional Items Grid */}
          <PromotionalGrid items={items} />
          
          {/* Add Coupon Card */}
          <div className="mt-6">
            <div className="grid grid-cols-2 gap-4">
              <AddItemCard 
                aspectRatio="9:16" 
                onClick={handleAddItem} 
                label="Add Coupon" 
              />
              <AddItemCard 
                aspectRatio="9:16" 
                onClick={handleAddItem} 
                label="Add Coupon" 
              />
            </div>
          </div>
        </div>
      </main>
      
      <AddItemDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAdd={handleAddNewItem}
        aspectRatio="9:16"
      />
    </div>
  );
};

export default Dashboard;
