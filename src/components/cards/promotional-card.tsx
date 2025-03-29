
import { Button } from "@/components/ui/button";
import { PromotionalItem } from "@/types/user";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ExternalLink, Copy } from "lucide-react";
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
        "group overflow-hidden h-full flex flex-col rounded-3xl shadow-sm border-0",
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
              item.aspectRatio === "1:1" ? "h-40" : "h-52"
            )}
          />
        </div>
      )}
      
      <CardContent className="p-5 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="font-bold text-2xl mb-1">{item.title}</h3>
          
          {item.description && (
            <p className="text-muted-foreground text-sm">
              {item.description}
            </p>
          )}
        </div>
        
        <div className="mt-4 space-y-3">
          {item.couponCode && (
            <div className="relative">
              <div className="flex items-center bg-blue-100 p-3 rounded-lg">
                <div className="flex-1 text-center">
                  <p className="text-lg font-medium">{item.couponCode}</p>
                  {item.discount && (
                    <p className="text-sm text-blue-600 font-medium">
                      {item.discount}
                    </p>
                  )}
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={handleCopyCode}
                  className="absolute right-2 top-2 h-8 w-8 p-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {item.url && (
            <div className="mt-3">
              <Button asChild className="w-full bg-green-500 hover:bg-green-600 rounded-full h-12 text-base">
                <Link to={item.url} target="_blank" rel="noopener noreferrer">
                  visit webste
                </Link>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
