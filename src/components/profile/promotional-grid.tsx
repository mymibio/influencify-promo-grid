
import { PromotionalItem } from "@/types/user";
import { PromotionalCard } from "@/components/cards/promotional-card";
import { useIsMobile } from "@/hooks/use-mobile";

interface PromotionalGridProps {
  items: PromotionalItem[];
}

const PromotionalGrid = ({ items }: PromotionalGridProps) => {
  return (
    <div className="container px-4 pb-16">
      <div className="masonry-grid">
        {items.map((item) => (
          <div key={item.id} className="masonry-item">
            <PromotionalCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromotionalGrid;
