
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PromotionalItem } from "@/types/user";
import { toast } from "sonner";

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
  const [image, setImage] = useState("");
  const [type, setType] = useState<"product" | "coupon">("product");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState("");

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
      image,
      url,
      type,
      aspectRatio,
      couponCode: type === "coupon" ? couponCode : undefined,
      discount: type === "coupon" ? discount : undefined,
      createdAt: new Date().toISOString(),
    };

    onAdd(newItem);
    toast.success("Item added successfully!");
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setUrl("");
    setImage("");
    setType("product");
    setCouponCode("");
    setDiscount("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add new promotional item</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
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
            <Label htmlFor="image" className="text-right">
              Image URL
            </Label>
            <Input
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="col-span-3"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <div className="col-span-3">
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value as "product" | "coupon")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              >
                <option value="product">Product</option>
                <option value="coupon">Coupon</option>
              </select>
            </div>
          </div>
          
          {type === "coupon" && (
            <>
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
            </>
          )}
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Item</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
