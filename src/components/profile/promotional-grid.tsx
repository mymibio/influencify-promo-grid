import { PromotionalItem } from "@/types/user";
import { PromotionalCard } from "@/components/cards/promotional-card";
import { useEffect, useState } from "react";

interface PromotionalGridProps {
  items: PromotionalItem[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDrag?: (id: string) => void;
  editable?: boolean;
}

const PromotionalGrid = ({ 
  items, 
  onEdit, 
  onDelete, 
  onDrag, 
  editable = false 
}: PromotionalGridProps) => {
  const [randomizedItems, setRandomizedItems] = useState<PromotionalItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Randomize items when component mounts or when items change
  useEffect(() => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setRandomizedItems(shuffled);
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

  const handleDragStart = (id: string) => {
    if (onDrag) {
      onDrag(id);
    }
    setIsDragging(true);
    // Item remains selected during drag
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Can keep selection after drag
  };

  return (
    <div className="container px-0 sm:px-2 pb-8">
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
        {randomizedItems.map((item) => (
          <div 
            key={item.id} 
            className="w-full"
            draggable={selectedItemId === item.id}
            onDragStart={() => handleDragStart(item.id)}
            onDragEnd={handleDragEnd}
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
