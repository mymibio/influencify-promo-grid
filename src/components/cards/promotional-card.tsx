
import { Button } from "@/components/ui/button";
import { PromotionalItem } from "@/types/user";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Copy, Trash2, Edit2, MoveHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PromotionalCardProps {
  item: PromotionalItem;
  onEdit?: () => void;
  onDelete?: () => void;
  editable?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const PromotionalCard = ({ 
  item, 
  onEdit, 
  onDelete, 
  editable = false,
  isSelected = false,
  onSelect
}: PromotionalCardProps) => {
  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card selection
    if (item.couponCode) {
      navigator.clipboard.writeText(item.couponCode);
      toast.success("Coupon code copied to clipboard!");
    }
  };

  const handleCardClick = () => {
    if (editable && onSelect) {
      onSelect();
    }
  };

  // These handlers prevent event bubbling to avoid triggering card selection
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) onEdit();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) onDelete();
  };

  return (
    <div className="relative group">
      {/* Action buttons - only show when selected */}
      {editable && isSelected && (
        <div className="absolute -top-3 right-0 left-0 flex justify-between z-10">
          {/* Edit Button */}
          <Button
            size="icon"
            variant="destructive"
            onClick={handleDeleteClick}
            className="rounded-full w-10 h-10 shadow-lg"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
          
          {/* Delete Button */}
          <Button
            size="icon"
            variant="default"
            onClick={handleEditClick}
            className="rounded-full w-10 h-10 bg-black text-white shadow-lg"
          >
            <Edit2 className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
        </div>
      )}

      {/* Drag Handle - Bottom Center - Only when selected */}
      {editable && isSelected && (
        <div className="absolute -bottom-3 left-0 w-full flex justify-center z-10">
          <Button
            size="icon"
            variant="default"
            className="rounded-full w-10 h-10 bg-black text-white shadow-lg cursor-grab active:cursor-grabbing"
          >
            <MoveHorizontal className="h-4 w-4" />
            <span className="sr-only">Drag</span>
          </Button>
        </div>
      )}
      
      {/* Main Card */}
      <Card 
        className={cn(
          "group overflow-hidden h-full w-full flex flex-col rounded-3xl shadow-sm border-0 transition-all duration-200",
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
              className="w-full object-cover transition-transform group-hover:scale-105 h-36 sm:h-52 md:h-64"
            />
          </div>
        )}
        
        <CardContent className="p-2 sm:p-4 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="font-bold text-sm sm:text-lg mb-0.5 sm:mb-1 line-clamp-2">{item.title}</h3>
            
            {item.description && (
              <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 mb-0.5 sm:mb-1">
                {item.description}
              </p>
            )}
          </div>
          
          <div className="mt-0.5 sm:mt-2 space-y-1">
            {item.couponCode && (
              <div className="relative">
                <div className="flex items-center justify-between bg-blue-100 p-1 sm:p-2 rounded-lg">
                  <div className="flex-1 text-center">
                    <p className="text-xs font-medium tracking-wide">{item.couponCode}</p>
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
                    className="h-5 w-5 p-0"
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
                  className="w-full bg-green-500 hover:bg-green-600 rounded-full h-6 text-xs font-medium"
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
