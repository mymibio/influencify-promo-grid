
import { Plus } from "lucide-react";

interface AddItemCardProps {
  aspectRatio: "9:16";
  onClick: () => void;
  label?: string;
}

const AddItemCard = ({ onClick }: AddItemCardProps) => {
  return (
    <button
      onClick={onClick}
      className="border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center hover:border-[#FF7F50] hover:bg-[#FFF5EE] transition-all duration-300 bg-white/50 hover:bg-white/80 aspect-[9/16]"
      aria-label="Add new item"
    >
      <Plus className="h-8 w-8 text-gray-400 group-hover:text-[#FF7F50]" />
    </button>
  );
};

export default AddItemCard;
