
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddItemCardProps {
  aspectRatio: "1:1" | "9:16";
  onClick: () => void;
  label?: string;
}

const AddItemCard = ({ aspectRatio, onClick, label = "Add Item" }: AddItemCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors bg-white/50 hover:bg-white/80",
        aspectRatio === "1:1" ? "aspect-square" : "aspect-[9/16]"
      )}
    >
      <Plus className="h-8 w-8 text-gray-400 mb-2" />
      <span className="text-sm text-gray-500">{label}</span>
    </button>
  );
};

export default AddItemCard;
