
import { Button } from "@/components/ui/button";
import { PromotionalItem } from "@/types/user";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PromotionalCardProps {
  item: PromotionalItem;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDrag?: (id: string) => void;
  editable?: boolean;
}

export const PromotionalCard = ({ 
  item, 
  onEdit, 
  onDelete, 
  onDrag, 
  editable = false 
}: PromotionalCardProps) => {
  const handleCopyCode = () => {
    if (item.couponCode) {
      navigator.clipboard.writeText(item.couponCode);
      toast.success("Coupon code copied to clipboard!");
    }
  };

  return (
    <Card className="overflow-hidden border rounded-lg shadow-sm">
      <div className="flex flex-row">
        {item.image && (
          <div className="w-1/3">
            <img 
              src={item.image} 
              alt={item.title} 
              className="h-full w-full object-cover"
            />
          </div>
        )}
        
        <CardContent className="p-4 flex-1">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{item.title}</h3>
            
            {item.description && (
              <p className="text-muted-foreground text-sm mb-2">
                {item.description}
              </p>
            )}
          </div>
          
          <div className="mt-2 space-y-2">
            {item.couponCode && (
              <div className="relative">
                <div className="flex items-center justify-between bg-blue-100 p-2 rounded-lg">
                  <div className="flex-1 text-center">
                    <p className="text-sm font-medium tracking-wide">{item.couponCode}</p>
                    {item.discount && (
                      <p className="text-xs text-blue-600 font-medium">
                        {item.discount}
                      </p>
                    )}
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={handleCopyCode}
                    className="h-6 w-6 p-0"
                    aria-label="Copy code"
                    title="Copy code"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
            
            {item.url && (
              <div>
                <Button 
                  asChild 
                  className="w-full bg-green-500 hover:bg-green-600 rounded-full h-8 text-xs font-medium"
                >
                  <Link to={item.url} target="_blank" rel="noopener noreferrer">
                    Visit Website
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
