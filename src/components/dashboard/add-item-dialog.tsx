
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PromotionalItem } from "@/types/user";
import { toast } from "sonner";
import { ImagePlus, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { compressImage } from "@/lib/imageCompression";

interface AddItemDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (item: PromotionalItem) => void;
  aspectRatio: "9:16";
  editItem?: PromotionalItem | null;
}

const AddItemDialog = ({ open, onClose, onAdd, editItem }: AddItemDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const isMobile = useIsMobile();
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // Populate form when editing an existing item
  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title || "");
      setDescription(editItem.description || "");
      setUrl(editItem.url || "");
      setImagePreview(editItem.image || null);
      setCouponCode(editItem.couponCode || "");
      setDiscount(editItem.discount || "");
    }
  }, [editItem]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsProcessingImage(true);
        
        // Compress the image before storing it
        const compressedFile = await compressImage(file);
        setImageFile(compressedFile);
        
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
          setIsProcessingImage(false);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error compressing image:", error);
        toast.error("Failed to process image");
        setIsProcessingImage(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !url) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newItem: PromotionalItem = {
      id: editItem ? editItem.id : crypto.randomUUID(),
      userId: "123", // This would come from auth in a real app
      title,
      description,
      image: imagePreview || undefined,
      url,
      type: "coupon", // Always set to coupon as per requirements
      aspectRatio: "9:16",
      couponCode,
      discount,
      createdAt: editItem ? editItem.createdAt : new Date().toISOString(),
    };

    onAdd(newItem);
    toast.success(editItem ? "Coupon updated successfully!" : "Coupon added successfully!");
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

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);

  // Handle scroll indicator
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom = Math.floor(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) <= 
      Math.ceil(e.currentTarget.clientHeight) + 20;
    
    if (bottom) {
      setShowScrollIndicator(false);
    } else {
      setShowScrollIndicator(true);
    }
  };

  const renderFormContent = () => (
    <form onSubmit={handleSubmit} className="grid gap-4 py-2">
      {/* Image Upload Section */}
      <div className="mb-3">
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
                disabled={isProcessingImage}
              />
              {isProcessingImage && <span className="text-xs text-gray-500 mt-2">Compressing image...</span>}
            </label>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="md:text-right">
          Title*
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="md:text-right">
          Description
        </Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="md:col-span-3"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="url" className="md:text-right">
          URL*
        </Label>
        <Input
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="couponCode" className="md:text-right">
          Coupon Code
        </Label>
        <Input
          id="couponCode"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="md:col-span-3"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="discount" className="md:text-right">
          Discount
        </Label>
        <Input
          id="discount"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="md:col-span-3"
          placeholder="e.g. 20% OFF"
        />
      </div>
    </form>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onClose}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader className="py-3 px-4 border-b">
            <DrawerTitle className="text-center">{editItem ? "Edit coupon" : "New coupon"}</DrawerTitle>
            <DrawerClose />
          </DrawerHeader>
          
          <div className="relative">
            <ScrollArea className="px-4 pb-24 max-h-[65vh]" onScroll={handleScroll}>
              {renderFormContent()}
            </ScrollArea>
            
            {/* Scroll indicator */}
            {showScrollIndicator && (
              <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2 pt-4 bg-gradient-to-t from-white via-white">
                <div className="flex flex-col items-center text-xs text-gray-500">
                  <span>Scroll for more</span>
                  <ChevronDown className="h-4 w-4 animate-bounce" />
                </div>
              </div>
            )}
          </div>
          
          <DrawerFooter className="pt-2 border-t mt-0 bg-white">
            <Button onClick={handleSubmit} className="w-full">
              {editItem ? "Update" : "Save"}
            </Button>
            <Button variant="outline" onClick={onClose} className="w-full">
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] flex flex-col">
        <DialogHeader className="pb-2 border-b">
          <DialogTitle>{editItem ? "Edit coupon" : "New coupon"}</DialogTitle>
        </DialogHeader>
        
        <div className="relative flex-grow overflow-hidden">
          <ScrollArea className="h-full max-h-[50vh] py-3" onScroll={handleScroll}>
            {renderFormContent()}
          </ScrollArea>
          
          {/* Scroll indicator */}
          {showScrollIndicator && (
            <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2 pt-4 bg-gradient-to-t from-white via-white">
              <div className="flex flex-col items-center text-xs text-gray-500">
                <span>Scroll for more</span>
                <ChevronDown className="h-4 w-4 animate-bounce" />
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="pt-2 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>{editItem ? "Update" : "Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
