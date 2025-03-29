
import { PromotionalItem } from "@/types/user";
import { PromotionalCard } from "@/components/cards/promotional-card";
import { useEffect, useState } from "react";

interface PromotionalGridProps {
  items: PromotionalItem[];
}

const PromotionalGrid = ({ items }: PromotionalGridProps) => {
  const [randomizedItems, setRandomizedItems] = useState<PromotionalItem[]>([]);

  // Randomize items when component mounts or when items change
  useEffect(() => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setRandomizedItems(shuffled);
  }, [items]);

  return (
    <div className="container px-0 sm:px-2 pb-8">
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
        {randomizedItems.map((item) => (
          <div key={item.id} className="w-full">
            <PromotionalCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromotionalGrid;
