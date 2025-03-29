
import { useState } from "react";
import { User, PromotionalItem } from "@/types/user";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Edit2, Trash2, ExternalLink, Smartphone } from "lucide-react";
import { toast } from "sonner";
import ProfilePreview from "@/components/dashboard/profile-preview";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddItemDialog from "@/components/dashboard/add-item-dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { PromotionalCard } from "@/components/cards/promotional-card";
import PromotionalGrid from "@/components/profile/promotional-grid";

// Mock user data for demonstration
const sampleUser: User = {
  id: "123",
  username: "fashionista",
  email: "ashley@example.com",
  name: "Ashley Johnson",
  profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop",
  bio: "Fashion & lifestyle content creator. Sharing my favorite products and deals with you!",
  socialLinks: {
    instagram: "fashionista",
    twitter: "fashionista",
    youtube: "fashionistachannel"
  },
  createdAt: new Date().toISOString()
};

// Mock promotional items
const sampleItems: PromotionalItem[] = [
  {
    id: "1",
    userId: "123",
    title: "Summer Collection Dress",
    description: "Perfect for beach days and summer outings. Light and comfortable fabric.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format",
    url: "https://example.com/product/1",
    type: "product",
    aspectRatio: "9:16",
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    userId: "123",
    title: "Exclusive Beauty Box",
    description: "My favorite skincare products in one box!",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format",
    url: "https://example.com/product/2",
    type: "product",
    aspectRatio: "1:1",
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    userId: "123",
    title: "Summer Sale - 20% OFF",
    description: "Use my code for 20% off your entire purchase!",
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=500&auto=format",
    url: "https://example.com/coupon/3",
    type: "coupon",
    aspectRatio: "1:1",
    couponCode: "ASHLEY20",
    discount: "20% OFF",
    createdAt: new Date().toISOString()
  }
];

const DashboardLinks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<PromotionalItem[]>(sampleItems);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("default");
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const isMobile = useIsMobile();
  
  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const handleAddItem = (newItem: PromotionalItem) => {
    setItems([newItem, ...items]);
    toast.success("Item added successfully");
  };
  
  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast.success("Item deleted successfully");
  };
  
  const handleEditItem = (id: string) => {
    // In a real app, this would navigate to the edit page or open a modal
    toast.info("Edit functionality would open here");
  };

  const handleDragItem = (id: string) => {
    toast.info("Drag functionality would be implemented here");
  };
  
  const handleReorderItems = (reorderedItems: PromotionalItem[]) => {
    setItems(reorderedItems);
    toast.success("Items reordered successfully");
  };
  
  return (
    <DashboardLayout user={sampleUser}>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Side - Live Profile Preview (only visible on desktop) */}
        <div className="hidden xl:block">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="mr-2 h-5 w-5" />
                Phone Preview
              </CardTitle>
              <CardDescription>How your profile appears on mobile devices</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="mx-auto max-w-[360px] overflow-hidden rounded-3xl border-8 border-gray-800 bg-gray-800">
                <div className="h-[600px] overflow-y-auto bg-white">
                  {/* Profile Header */}
                  <div className="flex flex-col items-center p-6 border-b">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                      {sampleUser.profilePicture ? (
                        <img 
                          src={sampleUser.profilePicture} 
                          alt={sampleUser.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <span className="text-2xl font-bold">{sampleUser.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <h2 className="text-xl font-bold">{sampleUser.name}</h2>
                    <p className="text-gray-500 text-sm mt-1">@{sampleUser.username}</p>
                    <p className="text-center text-sm mt-2">{sampleUser.bio}</p>
                    
                    {/* Social Links */}
                    <div className="flex justify-center space-x-4 mt-4">
                      {Object.entries(sampleUser.socialLinks || {}).map(([platform]) => (
                        <div 
                          key={platform} 
                          className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100"
                        >
                          <span className="font-medium">{platform.charAt(0).toUpperCase()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Profile Content */}
                  <div className="p-4">
                    <PromotionalGrid 
                      items={filteredItems} 
                      editable={false}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Center Section - Links Management */}
        <div className="xl:col-span-1">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h1 className="text-3xl font-bold">Promotional Links</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-muted rounded-lg p-1">
                  <Button 
                    variant={viewMode === 'table' ? 'default' : 'ghost'} 
                    size="sm" 
                    onClick={() => setViewMode('table')}
                    className="rounded-md"
                  >
                    Table
                  </Button>
                  <Button 
                    variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                    size="sm" 
                    onClick={() => setViewMode('grid')}
                    className="rounded-md"
                  >
                    Grid
                  </Button>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add New Link
                    </Button>
                  </DialogTrigger>
                  <AddItemDialog 
                    open={isAddDialogOpen}
                    onClose={() => setIsAddDialogOpen(false)}
                    onAdd={handleAddItem}
                    aspectRatio="9:16"
                  />
                </Dialog>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Manage Your Links</CardTitle>
                <CardDescription>Add, edit or remove your promotional links and coupons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-6">
                  <Input
                    placeholder="Search links..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                
                {viewMode === 'table' ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Format</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredItems.length > 0 ? (
                          filteredItems.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>
                                <div className="font-medium truncate max-w-[200px]">{item.title}</div>
                              </TableCell>
                              <TableCell>
                                <span className="capitalize">{item.type}</span>
                              </TableCell>
                              <TableCell>{item.aspectRatio}</TableCell>
                              <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => handleEditItem(item.id)}
                                  >
                                    <Edit2 className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Button>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => handleDeleteItem(item.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    asChild
                                  >
                                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="h-4 w-4" />
                                      <span className="sr-only">Visit</span>
                                    </a>
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                              No items found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {filteredItems.length > 0 ? (
                      <PromotionalGrid
                        items={filteredItems}
                        onEdit={handleEditItem}
                        onDelete={handleDeleteItem}
                        onDrag={handleDragItem}
                        onReorder={handleReorderItems}
                        editable={true}
                      />
                    ) : (
                      <div className="col-span-full text-center py-10 text-muted-foreground">
                        No items found.
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Right Side - Live Preview Section */}
        <div className="hidden lg:block xl:col-span-1">
          <ProfilePreview
            user={sampleUser}
            items={filteredItems.length > 0 ? filteredItems.slice(0, 4) : []}
            selectedTheme={selectedTheme}
            hideOnMobile={true}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardLinks;
