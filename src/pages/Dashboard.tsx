
import { useState } from "react";
import { User } from "@/types/user";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, MessageCircle, Mail, Plus, Copy, Link as LinkIcon, Edit } from "lucide-react";
import { toast } from "sonner";
import PromotionalGrid from "@/components/profile/promotional-grid";

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
const sampleItems = [
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
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  const handleCopyLink = () => {
    const shareableLink = `linkpromo.io/fashionista`;
    navigator.clipboard.writeText(shareableLink)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy link");
      });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-[250px] bg-white border-r border-gray-200 min-h-screen p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M3 9h18"></path><path d="M9 21V9"></path></svg>
            <span className="font-medium text-gray-700">Dashboard</span>
          </div>
          
          <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>
            <span className="font-medium text-gray-700">Analytics</span>
          </div>
          
          <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
            <span className="font-medium text-gray-700">Theme</span>
          </div>
          
          <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            <span className="font-medium text-gray-700">Settings</span>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1">
        <div className="container mx-auto p-6">
          {/* User Profile Section */}
          <div className="mb-8">
            <div className="flex items-start gap-6">
              {/* Profile Avatar */}
              <Avatar className="h-24 w-24 border-2 border-white shadow-md">
                {user.profilePicture ? (
                  <AvatarImage src={user.profilePicture} alt={user.name} />
                ) : (
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                )}
              </Avatar>
              
              {/* Profile Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-gray-600 mt-1">{user.bio}</p>
                
                {/* Social Links */}
                <div className="flex gap-2 mt-4">
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
              </div>
            </div>
            
            {/* Link Promo URL */}
            <div className="mt-6 bg-white rounded-lg border p-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <LinkIcon size={18} className="text-blue-500" />
                  <span>Your LinkPromo is live: <span className="text-blue-500 font-medium">
                    <a href="https://linkpromo.io/fashionista" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      linkpromo.io/fashionista
                    </a>
                  </span></span>
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
          
          {/* Coupons Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Your Coupons</h2>
            <p className="text-gray-600 mb-4">
              This is how your coupons will appear to visitors. Add more coupons or edit existing ones.
            </p>
            
            {/* Promotional Grid */}
            <PromotionalGrid items={items} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
