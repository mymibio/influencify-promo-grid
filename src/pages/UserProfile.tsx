
import { User, PromotionalItem } from "@/types/user";
import PromotionalGrid from "@/components/profile/promotional-grid";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Instagram, Twitter, Youtube, Facebook, MessageCircle, Mail } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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

const getSocialIcon = (platform: string) => {
  switch (platform) {
    case "instagram": return <Instagram size={20} />;
    case "twitter": return <Twitter size={20} />;
    case "youtube": return <Youtube size={20} />;
    case "facebook": return <Facebook size={20} />;
    case "whatsapp": return <MessageCircle size={20} />;
    case "email": return <Mail size={20} />;
    default: return null;
  }
};

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const isMobile = useIsMobile();
  
  const filteredItems = selectedCategory === "All" 
    ? sampleItems 
    : sampleItems.filter(item => item.category === selectedCategory);
    
  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-12">
      <div className="flex gap-4 sm:gap-6 mb-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden flex-shrink-0">
          <img 
            src={sampleUser.profilePicture} 
            alt={sampleUser.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold">{sampleUser.name}</h1>
          <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
            {sampleUser.bio}
          </p>
        </div>
      </div>
      
      {/* Centered social links */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {sampleUser.socialLinks && Object.entries(sampleUser.socialLinks).slice(0, 6).map(([platform]) => (
          <a 
            key={platform}
            href={`#${platform}`}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label={platform}
          >
            {getSocialIcon(platform)}
          </a>
        ))}
      </div>
      
      <div className="flex overflow-x-auto gap-2 pb-2 mb-4 scrollbar-hide">
        {availableCategories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={`rounded-full px-3 py-1 cursor-pointer whitespace-nowrap ${
              selectedCategory === category ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
      
      <div className="bg-white rounded-2xl overflow-hidden shadow-md">
        <PromotionalGrid items={filteredItems} />
      </div>
      
      <div className="text-center text-xs text-gray-400 mt-6">
        Powered by <span className="font-medium">Influencify</span>
      </div>
    </div>
  );
};

export default UserProfile;
