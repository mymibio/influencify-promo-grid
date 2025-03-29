
import { useState } from "react";
import { User, PromotionalItem } from "@/types/user";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, MessageCircle, Mail, Plus } from "lucide-react";
import SimpleSidebar from "@/components/dashboard/simple-sidebar";
import AddItemCard from "@/components/dashboard/add-item-card";

// Mock user data
const sampleUser: User = {
  id: "123",
  username: "fashionista",
  email: "ashley@example.com",
  name: "Ashley Johnson",
  profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop",
  bio: "Fashion & lifestyle content creator. Sharing my favorite products and deals with you!",
  socialLinks: {
    instagram: "fashionista",
    facebook: "fashionista.style",
    whatsapp: "+1234567890",
    twitter: "fashionista",
    email: "contact@fashionista.com"
  },
  createdAt: new Date().toISOString()
};

// Mock promotional items
const sampleItems: PromotionalItem[] = [];

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
  
  const handleAddItem = () => {
    // This would open a modal to add a new item in a real app
    console.log("Add new promotional item");
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
            </div>
          </div>
          
          {/* Promotional Items Grid - Modified to 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <AddItemCard aspectRatio="1:1" onClick={handleAddItem} />
            <AddItemCard aspectRatio="1:1" onClick={handleAddItem} />
            <AddItemCard aspectRatio="9:16" onClick={handleAddItem} />
            <AddItemCard aspectRatio="9:16" onClick={handleAddItem} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
