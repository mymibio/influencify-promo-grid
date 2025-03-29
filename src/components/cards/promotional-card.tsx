
import { Button } from "@/components/ui/button";
import { PromotionalItem } from "@/types/user";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface PromotionalCardProps {
  item: PromotionalItem;
}

export const PromotionalCard = ({ item }: PromotionalCardProps) => {
  const handleCopyCode = () => {
    if (item.couponCode) {
      navigator.clipboard.writeText(item.couponCode);
      toast.success("Coupon code copied to clipboard!");
    }
  };

  return (
    <div 
      className={cn(
        "group rounded-lg overflow-hidden border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md",
        item.aspectRatio === "1:1" ? "card-1-1" : "card-9-16"
      )}
    >
      {item.image && (
        <div className="relative w-full overflow-hidden">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-auto object-cover transition-transform group-hover:scale-105" 
          />
        </div>
      )}
      
      <div className="p-4">
        <h3 className="font-medium text-lg">{item.title}</h3>
        
        {item.description && (
          <p className="text-muted-foreground text-sm mt-2 line-clamp-3">
            {item.description}
          </p>
        )}
        
        {item.couponCode && (
          <div className="mt-4">
            <div className="flex items-center gap-2 bg-gray-100 p-2 rounded border">
              <code className="text-sm font-mono flex-1 text-center">
                {item.couponCode}
              </code>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={handleCopyCode}
                className="text-xs"
              >
                Copy
              </Button>
            </div>
            {item.discount && (
              <p className="text-center text-green-600 font-medium mt-2">
                {item.discount}
              </p>
            )}
          </div>
        )}
        
        {item.url && (
          <div className="mt-4">
            <Button asChild className="w-full bg-brand-purple hover:bg-brand-dark-purple flex items-center justify-center gap-2">
              <Link to={item.url} target="_blank" rel="noopener noreferrer">
                Visit Website <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
