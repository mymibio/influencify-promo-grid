
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PromotionalItem } from "@/types/user";
import { toast } from "sonner";
import { ImagePlus } from "lucide-react";

interface AddItemDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (item: PromotionalItem) => void;
  aspectRatio: "1:1" | "9:16";
}

const AddItemDialog = ({ open, onClose, onAdd, aspectRatio }: AddItemDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !url) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newItem: PromotionalItem = {
      id: crypto.randomUUID(),
      userId: "123", // This would come from auth in a real app
      title,
      description,
      image: imagePreview || undefined,
      url,
      type: "coupon", // Always set to coupon as per requirements
      aspectRatio,
      couponCode,
      discount,
      createdAt: new Date().toISOString(),
    };

    onAdd(newItem);
    toast.success("Coupon added successfully!");
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setUrl("");
    setImageFile(null);
    setImagePreview(null);
    setCouponCode("");
    setDiscount("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add new coupon</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {/* Image Upload Section */}
          <div className="mb-4">
            <Label htmlFor="image-upload" className="block mb-2">
              Upload Image
            </Label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 bg-gray-50">
              {imagePreview ? (
                <div className="relative w-full max-w-xs mx-auto">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-auto rounded-md object-contain max-h-40"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2 w-full"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                  <ImagePlus className="h-12 w-12 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500 mb-1">Click to upload an image</span>
                  <span className="text-xs text-gray-400">PNG, JPG up to 5MB</span>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title*
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="url" className="text-right">
              URL*
            </Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="couponCode" className="text-right">
              Coupon Code
            </Label>
            <Input
              id="couponCode"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="discount" className="text-right">
              Discount
            </Label>
            <Input
              id="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="col-span-3"
              placeholder="e.g. 20% OFF"
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Coupon</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
