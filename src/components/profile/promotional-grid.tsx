import { PromotionalItem } from "@/types/user";
import { PromotionalCard } from "@/components/cards/promotional-card";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface PromotionalGridProps {
  items: PromotionalItem[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDrag?: (id: string) => void;
  onReorder?: (items: PromotionalItem[]) => void;
  editable?: boolean;
}

const PromotionalGrid = ({ 
  items, 
  onEdit, 
  onDelete, 
  onDrag, 
  onReorder,
  editable = false 
}: PromotionalGridProps) => {
  const [displayItems, setDisplayItems] = useState<PromotionalItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dragOverItemId, setDragOverItemId] = useState<string | null>(null);

  // Update display items when props items change
  useEffect(() => {
    setDisplayItems([...items]);
  }, [items]);

  const handleCardSelect = (id: string) => {
    // Toggle selection if clicking the same card, otherwise select the new card
    setSelectedItemId(prev => prev === id ? null : id);
  };

  const handleEditItem = (id: string) => {
    if (onEdit) {
      onEdit(id);
    }
    // Keep item selected for visual feedback
  };

  const handleDeleteItem = (id: string) => {
    if (onDelete) {
      onDelete(id);
    }
    // Reset selection since the item is being removed
    setSelectedItemId(null);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    setDraggedItemId(id);
    setIsDragging(true);
    
    // Store the dragged item's ID in the drag data transfer object
    e.dataTransfer.setData("text/plain", id);
    
    // Set the drag image to be the element itself
    const element = e.currentTarget;
    e.dataTransfer.setDragImage(element, 50, 50);
    
    if (onDrag) {
      onDrag(id);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
    if (draggedItemId !== id) {
      setDragOverItemId(id);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedItemId(null);
    setDragOverItemId(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    
    if (!draggedItemId || draggedItemId === targetId) {
      return;
    }

    // Create a new array with reordered items
    const sourceIndex = displayItems.findIndex(item => item.id === draggedItemId);
    const targetIndex = displayItems.findIndex(item => item.id === targetId);
    
    if (sourceIndex < 0 || targetIndex < 0) return;
    
    const newItems = [...displayItems];
    const [draggedItem] = newItems.splice(sourceIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);
    
    // Update the local state
    setDisplayItems(newItems);
    
    // Notify parent component about the reorder
    if (onReorder) {
      onReorder(newItems);
      toast.success("Card order updated");
    }
    
    handleDragEnd();
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {displayItems.map((item) => (
          <div 
            key={item.id} 
            className={`w-full ${isDragging && dragOverItemId === item.id ? 'opacity-50 border-2 border-dashed border-primary rounded-3xl' : ''}`}
            draggable={selectedItemId === item.id}
            onDragStart={(e) => handleDragStart(e, item.id)}
            onDragOver={(e) => handleDragOver(e, item.id)}
            onDragEnd={handleDragEnd}
            onDrop={(e) => handleDrop(e, item.id)}
          >
            <PromotionalCard 
              item={item} 
              onEdit={() => handleEditItem(item.id)}
              onDelete={() => handleDeleteItem(item.id)}
              editable={editable}
              isSelected={selectedItemId === item.id}
              onSelect={() => handleCardSelect(item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromotionalGrid;
