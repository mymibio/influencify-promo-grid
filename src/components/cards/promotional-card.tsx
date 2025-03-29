
import { Button } from "@/components/ui/button";
import { PromotionalItem } from "@/types/user";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Copy, Trash2, Edit2, MoveIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

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
  const [isSelected, setIsSelected] = useState(false);

  const handleCopyCode = () => {
    if (item.couponCode) {
      navigator.clipboard.writeText(item.couponCode);
      toast.success("Coupon code copied to clipboard!");
    }
  };

  const handleCardClick = () => {
    if (editable) {
      setIsSelected(!isSelected);
    }
  };

  return (
    <div className="relative group">
      {/* Edit Button - Top Right */}
      {editable && isSelected && (
        <Button
          size="icon"
          variant="default"
          onClick={() => onEdit?.(item.id)}
          className="absolute -top-3 -right-3 z-10 rounded-full w-10 h-10 bg-black text-white shadow-lg"
        >
          <Edit2 className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
      )}

      {/* Delete Button - Top Left */}
      {editable && isSelected && (
        <Button
          size="icon"
          variant="destructive"
          onClick={() => onDelete?.(item.id)}
          className="absolute -top-3 -left-3 z-10 rounded-full w-10 h-10 shadow-lg"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      )}

      {/* Drag Handle - Bottom Center */}
      {editable && isSelected && (
        <Button
          size="icon"
          variant="default"
          onClick={() => onDrag?.(item.id)}
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10 rounded-full w-10 h-10 bg-black text-white shadow-lg"
        >
          <MoveIcon className="h-4 w-4" />
          <span className="sr-only">Move</span>
        </Button>
      )}
      
      {/* Main Card */}
      <Card 
        className={cn(
          "group overflow-hidden h-full w-full flex flex-col rounded-3xl shadow-sm border-0 card-9-16 transition-all duration-200",
          isSelected && editable ? "ring-2 ring-primary ring-offset-2" : "",
          editable ? "cursor-pointer" : ""
        )}
        onClick={handleCardClick}
      >
        {item.image && (
          <div className="relative w-full overflow-hidden">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full object-cover transition-transform group-hover:scale-105 h-52 sm:h-64 md:h-72"
            />
          </div>
        )}
        
        <CardContent className="p-2 sm:p-4 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="font-bold text-base sm:text-lg mb-1 line-clamp-2">{item.title}</h3>
            
            {item.description && (
              <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 mb-1 sm:mb-2">
                {item.description}
              </p>
            )}
          </div>
          
          <div className="mt-1 sm:mt-2 space-y-1 sm:space-y-2">
            {item.couponCode && (
              <div className="relative">
                <div className="flex items-center justify-between bg-blue-100 p-1.5 sm:p-2 rounded-lg">
                  <div className="flex-1 text-center">
                    <p className="text-xs sm:text-sm font-medium tracking-wide">{item.couponCode}</p>
                    {item.discount && (
                      <p className="text-xs text-blue-600 font-medium">
                        {item.discount}
                      </p>
                    )}
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyCode();
                    }}
                    className="h-5 w-5 sm:h-6 sm:w-6 p-0"
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
                  className="w-full bg-green-500 hover:bg-green-600 rounded-full h-6 sm:h-8 text-xs font-medium"
                  onClick={(e) => e.stopPropagation()} // Prevent card selection when clicking link
                >
                  <Link to={item.url} target="_blank" rel="noopener noreferrer">
                    Visit Website
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
