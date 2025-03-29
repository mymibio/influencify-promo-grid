
import { Button } from "@/components/ui/button";
import { PromotionalItem } from "@/types/user";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
    <Card 
      className={cn(
        "group overflow-hidden h-full flex flex-col",
        item.aspectRatio === "1:1" ? "card-1-1" : "card-9-16"
      )}
    >
      {item.image && (
        <div className="relative w-full overflow-hidden">
          <img 
            src={item.image} 
            alt={item.title} 
            className={cn(
              "w-full object-cover transition-transform group-hover:scale-105",
              item.aspectRatio === "1:1" ? "h-32" : "h-60"
            )}
          />
        </div>
      )}
      
      <CardContent className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-medium text-lg line-clamp-2">{item.title}</h3>
          
          {item.description && (
            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
              {item.description}
            </p>
          )}
        </div>
        
        <div className="mt-3 space-y-3">
          {item.couponCode && (
            <div>
              <div className="flex items-center gap-2 bg-gray-100 p-2 rounded border">
                <code className="text-sm font-mono flex-1 text-center overflow-hidden text-ellipsis whitespace-nowrap">
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
                <p className="text-center text-green-600 font-medium mt-1 text-sm">
                  {item.discount}
                </p>
              )}
            </div>
          )}
          
          {item.url && (
            <div className={item.couponCode ? "mt-2" : ""}>
              <Button asChild className="w-full bg-brand-purple hover:bg-brand-dark-purple flex items-center justify-center gap-2">
                <Link to={item.url} target="_blank" rel="noopener noreferrer">
                  Visit Website <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
