
import { User, PromotionalItem } from "@/types/user";
import ProfileHeader from "@/components/profile/profile-header";
import PromotionalGrid from "@/components/profile/promotional-grid";
import { useParams } from "react-router-dom";

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
    createdAt: new Date().toISOString()
  }
];

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  
  // In a real app, we would fetch the user and items based on the username
  // For demo purposes, we're using our sample data
  
  return (
    <div className="min-h-screen">
      <ProfileHeader user={sampleUser} />
      <PromotionalGrid items={sampleItems} />
      
      <footer className="py-4 text-center text-sm text-muted-foreground border-t">
        <p>
          Powered by <span className="font-medium text-brand-purple">Influencify</span>
        </p>
      </footer>
    </div>
  );
};

export default UserProfile;
