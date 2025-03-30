
import { User, PromotionalItem } from "@/types/user";
import PromotionalGrid from "@/components/profile/promotional-grid";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Instagram, Twitter, Youtube, Facebook, MessageCircle, Mail } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

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
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<PromotionalItem[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!username) return;
      
      setIsLoading(true);
      
      try {
        // Fetch user profile
        const { data: userData, error: userError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('username', username)
          .maybeSingle();
        
        if (userError) {
          console.error("Error fetching user profile:", userError);
          toast.error("Failed to load user profile");
          navigate('/404');
          return;
        }
        
        if (!userData) {
          console.error("User not found");
          navigate('/404');
          return;
        }
        
        // Map from snake_case DB fields to camelCase User type
        const profileData: User = {
          id: userData.id,
          username: userData.username,
          email: userData.email,
          name: userData.name,
          profilePicture: userData.profile_picture,
          bio: userData.bio,
          socialLinks: userData.social_links as User['socialLinks'] || {},
          categories: userData.categories,
          createdAt: userData.created_at,
        };
        
        setUser(profileData);
        
        // Fetch promotional items
        const { data: itemsData, error: itemsError } = await supabase
          .from('promotional_items')
          .select('*')
          .eq('user_id', userData.id)
          .order('position');
        
        if (itemsError) {
          console.error("Error fetching promotional items:", itemsError);
          toast.error("Failed to load promotional items");
          return;
        }
        
        // Map from snake_case DB fields to camelCase PromotionalItem type
        const promotionalItems = itemsData.map((item: any): PromotionalItem => ({
          id: item.id,
          userId: item.user_id,
          title: item.title,
          description: item.description,
          image: item.image,
          url: item.url,
          type: item.type,
          aspectRatio: item.aspect_ratio,
          couponCode: item.coupon_code,
          discount: item.discount,
          category: item.category,
          createdAt: item.created_at,
        }));
        
        setItems(promotionalItems);
        
        // Build categories list
        const allCategories = ["All"];
        const uniqueCategories = [...new Set(promotionalItems.map(item => item.category).filter(Boolean))];
        setCategories([...allCategories, ...uniqueCategories]);
      } catch (error) {
        console.error("Error in fetchUserProfile:", error);
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [username, navigate]);
  
  const filteredItems = selectedCategory === "All" 
    ? items 
    : items.filter(item => item.category === selectedCategory);
    
  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-12">
        <div className="flex gap-4 sm:gap-6 mb-6">
          <Skeleton className="w-20 h-20 sm:w-24 sm:h-24 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="w-10 h-10 rounded-full" />
          ))}
        </div>
        
        <div className="flex overflow-x-auto gap-2 pb-2 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-full" />
          ))}
        </div>
        
        <div className="bg-white rounded-2xl overflow-hidden shadow-md">
          <div className="container px-0 sm:px-2 pb-8">
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-1 sm:gap-3 md:gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="w-full h-48" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return null;
  }
    
  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-12">
      <div className="flex gap-4 sm:gap-6 mb-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden flex-shrink-0">
          <img 
            src={user.profilePicture} 
            alt={user.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;
            }}
          />
        </div>
        
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold">{user.name}</h1>
          <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
            {user.bio || "No bio provided"}
          </p>
        </div>
      </div>
      
      {/* Centered social links */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {user.socialLinks && Object.entries(user.socialLinks).map(([platform, handle]) => (
          handle && (
            <a 
              key={platform}
              href={platform === "email" ? `mailto:${handle}` : `https://${platform}.com/${handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label={platform}
            >
              {getSocialIcon(platform)}
            </a>
          )
        ))}
      </div>
      
      <div className="flex overflow-x-auto gap-2 pb-2 mb-4 scrollbar-hide">
        {categories.map((category) => (
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
        {filteredItems.length > 0 ? (
          <PromotionalGrid items={filteredItems} />
        ) : (
          <div className="p-12 text-center text-gray-500">
            {selectedCategory === "All" 
              ? "No promotional items found" 
              : `No ${selectedCategory} items found`
            }
          </div>
        )}
      </div>
      
      <div className="text-center text-xs text-gray-400 mt-6">
        Powered by <span className="font-medium">Influencify</span>
      </div>
    </div>
  );
};

export default UserProfile;
