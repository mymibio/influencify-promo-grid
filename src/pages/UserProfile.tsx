import { User, PromotionalItem } from "@/types/user";
import ProfileHeader from "@/components/profile/profile-header";
import PromotionalGrid from "@/components/profile/promotional-grid";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";

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
    youtube: "fashionistachannel",
    facebook: "fashionista.page",
    whatsapp: "12345678900",
    email: "ashley@example.com"
  },
  categories: ["Fashion", "Beauty", "Lifestyle", "Travel"],
  createdAt: new Date().toISOString()
};

// Mock promotional items
const sampleItems: PromotionalItem[] = [
  {
    id: "1",
    userId: "123",
    title: "Summer Collection Dress",
    description: "Perfect for beach days and summer outings. Light and comfortable fabric.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format",
    url: "https://example.com/product/1",
    type: "product",
    aspectRatio: "9:16",
    category: "Fashion",
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    userId: "123",
    title: "Exclusive Beauty Box",
    description: "My favorite skincare products in one box!",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format",
    url: "https://example.com/product/2",
    type: "product",
    aspectRatio: "1:1",
    category: "Beauty",
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    userId: "123",
    title: "Summer Sale - 20% OFF",
    description: "Use my code for 20% off your entire purchase!",
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=500&auto=format",
    url: "https://example.com/coupon/3",
    type: "coupon",
    aspectRatio: "1:1",
    couponCode: "ASHLEY20",
    discount: "20% OFF",
    category: "Fashion",
    createdAt: new Date().toISOString()
  },
  {
    id: "4",
    userId: "123",
    title: "Designer Handbag",
    description: "The perfect accessory for any outfit. Limited stock available!",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format",
    url: "https://example.com/product/4",
    type: "product",
    aspectRatio: "9:16",
    category: "Fashion",
    createdAt: new Date().toISOString()
  },
  {
    id: "5",
    userId: "123",
    title: "My Favorite Jewelry Brand",
    description: "Ethically sourced and handmade jewelry that completes every look.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&auto=format",
    url: "https://example.com/product/5",
    type: "product",
    aspectRatio: "1:1",
    category: "Accessories",
    createdAt: new Date().toISOString()
  },
  {
    id: "6",
    userId: "123",
    title: "Free Shipping Code",
    description: "Get free shipping on any order over $25",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=500&auto=format",
    url: "https://example.com/coupon/6",
    type: "coupon",
    aspectRatio: "1:1",
    couponCode: "FREESHIP",
    discount: "Free Shipping",
    category: "Lifestyle",
    createdAt: new Date().toISOString()
  }
];

const availableCategories = [
  "All", "Fashion", "Beauty", "Lifestyle", "Travel", "Technology", "Food", "Fitness", "Home", "Accessories"
];

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const filteredItems = selectedCategory === "All" 
    ? sampleItems 
    : sampleItems.filter(item => item.category === selectedCategory);
    
  return (
    <div className="min-h-screen py-4">
      {/* Header Section - Bento Style */}
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl overflow-hidden shadow-lg bg-white/70 backdrop-blur-sm border border-gray-100 transition-transform hover:shadow-xl mb-6">
          <ProfileHeader 
            user={sampleUser} 
            compact={true} 
          />
        </div>
        
        {/* Category Selection Section */}
        <div className="mb-6 rounded-2xl bg-white/80 shadow-md backdrop-blur-sm border border-gray-100 p-4 overflow-hidden">
          <div className="flex items-center gap-2 mb-3">
            <Filter size={16} className="text-gray-500" />
            <h3 className="text-sm font-medium text-gray-700">Categories</h3>
          </div>
          
          <div className="flex flex-wrap gap-2 pb-1">
            {availableCategories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`rounded-full px-3 py-1 cursor-pointer hover:bg-accent transition-colors ${
                  selectedCategory === category ? "bg-primary text-primary-foreground" : "hover:text-accent-foreground"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Promotional Content */}
        <div className="rounded-3xl overflow-hidden bg-white/80 shadow-lg backdrop-blur-sm border border-gray-100 transition-all hover:shadow-xl mb-6">
          <div className="p-4 pb-0">
            <h2 className="text-xl font-medium">Promotions & Products</h2>
            <p className="text-sm text-muted-foreground">Check out my latest recommendations</p>
          </div>
          <PromotionalGrid items={filteredItems} />
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-4 text-center text-sm text-muted-foreground mt-8 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md py-3 border border-gray-100">
            Powered by <span className="font-medium text-brand-purple">Influencify</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default UserProfile;
