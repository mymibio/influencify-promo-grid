
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddItemCardProps {
  aspectRatio: "1:1" | "9:16";
  onClick: () => void;
}

const AddItemCard = ({ aspectRatio, onClick }: AddItemCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors bg-white/50 hover:bg-white/80",
        aspectRatio === "1:1" ? "aspect-square" : "aspect-[9/16]"
      )}
    >
      <Plus className="h-8 w-8 text-gray-400" />
    </button>
  );
};

export default AddItemCard;
