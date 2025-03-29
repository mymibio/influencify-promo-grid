
import { Button } from "@/components/ui/button";
import { PromotionalItem } from "@/types/user";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
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
        "group overflow-hidden h-full w-full flex flex-col rounded-3xl shadow-sm border-0",
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
              item.aspectRatio === "1:1" ? "h-36 sm:h-40" : "h-44 sm:h-52"
            )}
          />
        </div>
      )}
      
      <CardContent className="p-3 sm:p-5 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="font-bold text-lg sm:text-xl mb-1 line-clamp-2">{item.title}</h3>
          
          {item.description && (
            <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 mb-2">
              {item.description}
            </p>
          )}
        </div>
        
        <div className="mt-2 sm:mt-4 space-y-2 sm:space-y-3">
          {item.couponCode && (
            <div className="relative">
              <div className="flex items-center justify-between bg-blue-100 p-2 sm:p-3 rounded-lg">
                <div className="flex-1 text-center">
                  <p className="text-sm sm:text-base font-medium tracking-wide">{item.couponCode}</p>
                  {item.discount && (
                    <p className="text-xs sm:text-sm text-blue-600 font-medium">
                      {item.discount}
                    </p>
                  )}
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={handleCopyCode}
                  className="h-6 w-6 sm:h-8 sm:w-8 p-0"
                  aria-label="Copy code"
                  title="Copy code"
                >
                  <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {item.url && (
            <div>
              <Button asChild className="w-full bg-green-500 hover:bg-green-600 rounded-full h-8 sm:h-10 text-xs sm:text-sm font-medium">
                <Link to={item.url} target="_blank" rel="noopener noreferrer">
                  Visit Website
                </Link>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
