
import { User } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Instagram, Youtube, Twitter, Facebook, Mail, MessageSquare, Plus, Pencil, X, ChevronLeft, Search, Linkedin, Pin, MessageCircle, FileText, ArrowRight, Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Available social platforms with their icons
const socialPlatforms = [
  { 
    name: "Instagram", 
    key: "instagram", 
    icon: Instagram,
    placeholder: "Enter Instagram Username",
    example: "Example: @username (without the @)"
  },
  { 
    name: "Twitter", 
    key: "twitter", 
    icon: Twitter,
    placeholder: "Enter Twitter Username",
    example: "Example: @username (without the @)"
  },
  { 
    name: "Facebook", 
    key: "facebook", 
    icon: Facebook,
    placeholder: "Enter Facebook Page Name",
    example: "Example: yourpagename"
  },
  { 
    name: "YouTube", 
    key: "youtube", 
    icon: Youtube,
    placeholder: "Enter YouTube Channel",
    example: "Example: @channelname"
  },
  { 
    name: "LinkedIn", 
    key: "linkedin", 
    icon: Linkedin,
    placeholder: "Enter LinkedIn Username",
    example: "Example: username or custom URL"
  },
  { 
    name: "Pinterest", 
    key: "pinterest", 
    icon: Pin,
    placeholder: "Enter Pinterest Username",
    example: "Example: username"
  },
  { 
    name: "WhatsApp", 
    key: "whatsapp", 
    icon: MessageCircle,
    placeholder: "Enter WhatsApp Number",
    example: "Example: +1234567890 (with country code)"
  },
  { 
    name: "Email", 
    key: "email", 
    icon: Mail,
    placeholder: "Enter Email Address",
    example: "Example: you@example.com"
  },
  { 
    name: "Telegram", 
    key: "telegram", 
    icon: MessageSquare,
    placeholder: "Enter Telegram Username",
    example: "Example: @username (without the @)"
  },
  { 
    name: "Discord", 
    key: "discord", 
    icon: MessageSquare,
    placeholder: "Enter Discord Username or Server",
    example: "Example: username#1234 or invite link"
  },
  { 
    name: "Reddit", 
    key: "reddit", 
    icon: FileText,
    placeholder: "Enter Reddit Username",
    example: "Example: u/username (without the u/)"
  },
  { 
    name: "Threads", 
    key: "threads", 
    icon: MessageSquare,
    placeholder: "Enter Threads Username",
    example: "Example: @username (without the @)"
  },
  { 
    name: "Snapchat", 
    key: "snapchat", 
    icon: Ghost, // Using Ghost icon for Snapchat
    placeholder: "Enter Snapchat Username",
    example: "Example: @snapchatusername"
  },
];

interface ProfileHeaderProps {
  user: User;
  editable?: boolean;
  onEditProfilePicture?: (file: File) => void;
  onAddSocialLink?: (platform: string) => void;
  onDeleteSocialLink?: (platform: string) => void;
  onEditSocialLink?: (platform: string, handle: string) => void;
  compact?: boolean;
}

const ProfileHeader = ({
  user,
  editable = false,
  onEditProfilePicture,
  onAddSocialLink,
  onDeleteSocialLink,
  onEditSocialLink,
  compact = false
}: ProfileHeaderProps) => {
  const [isAddSocialDialogOpen, setIsAddSocialDialogOpen] = useState(false);
  const [isEditSocialDialogOpen, setIsEditSocialDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<typeof socialPlatforms[0] | null>(null);
  const [socialHandle, setSocialHandle] = useState("");
  const [editingPlatform, setEditingPlatform] = useState<string>("");
  const [editingHandle, setEditingHandle] = useState<string>("");
  const [socialPlatformStep, setSocialPlatformStep] = useState<"select" | "input">("select");

  // Filter platforms based on search term
  const filteredPlatforms = searchTerm 
    ? socialPlatforms.filter(platform => 
        platform.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : socialPlatforms;
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onEditProfilePicture) {
      // Basic validation
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file");
        return;
      }
      
      // Size check (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }
      
      onEditProfilePicture(file);
    }
  };
  
  const handleSelectPlatform = (platform: typeof socialPlatforms[0]) => {
    setSelectedPlatform(platform);
    setSocialPlatformStep("input");
  };
  
  const handleAddSocial = () => {
    if (onAddSocialLink && selectedPlatform) {
      onAddSocialLink(selectedPlatform.key);
      
      // Reset state
      setSelectedPlatform(null);
      setSocialHandle("");
      setSocialPlatformStep("select");
      setIsAddSocialDialogOpen(false);
    }
  };
  
  const handleEditSocialLink = () => {
    if (onEditSocialLink && editingPlatform && editingHandle) {
      onEditSocialLink(editingPlatform, editingHandle);
      setIsEditSocialDialogOpen(false);
    }
  };
  
  const getSocialIcon = (platformKey: string) => {
    const platform = socialPlatforms.find(p => p.key === platformKey);
    if (platform) {
      const IconComponent = platform.icon;
      return <IconComponent size={20} />;
    }
    return null;
  };
  
  const getPlatformName = (platformKey: string) => {
    const platform = socialPlatforms.find(p => p.key === platformKey);
    return platform ? platform.name : platformKey;
  };

  return (
    <>
      <div className={`${compact ? 'py-4' : 'py-8'} px-4 bg-white rounded-lg shadow-sm border`}>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar and Edit Button */}
          <div className="relative">
            <Avatar className={`${compact ? 'h-24 w-24' : 'h-32 w-32'} border-2 border-white shadow-md`}>
              {user.profilePicture ? (
                <AvatarImage src={user.profilePicture} alt={user.name} />
              ) : (
                <AvatarFallback className="text-2xl font-bold">
                  {getInitials(user.name)}
                </AvatarFallback>
              )}
            </Avatar>
            
            {editable && onEditProfilePicture && (
              <label 
                htmlFor="profile-picture-upload" 
                className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1.5 cursor-pointer shadow-md hover:bg-primary/90"
              >
                <Pencil size={16} />
                <input 
                  id="profile-picture-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileInputChange}
                />
              </label>
            )}
          </div>
          
          {/* User Info */}
          <div className="flex-1 flex flex-col text-center md:text-left">
            <h1 className={`${compact ? 'text-2xl' : 'text-3xl'} font-bold`}>{user.name}</h1>
            
            <div className="text-muted-foreground text-sm mb-2">
              @{user.username}
            </div>
            
            {user.bio && (
              <p className={`${compact ? 'text-sm' : 'text-base'} text-gray-600 max-w-lg`}>
                {user.bio}
              </p>
            )}
            
            {/* Social Links */}
            <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
              {user.socialLinks && Object.entries(user.socialLinks).map(([platform, handle]) => (
                <div 
                  key={platform} 
                  className="relative group"
                >
                  {editable ? (
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-full"
                      onClick={() => {
                        setEditingPlatform(platform);
                        setEditingHandle(handle);
                        setIsEditSocialDialogOpen(true);
                      }}
                    >
                      {getSocialIcon(platform)}
                    </Button>
                  ) : (
                    <a 
                      href={`#${platform}/${handle}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      {getSocialIcon(platform)}
                    </a>
                  )}
                  
                  {editable && onDeleteSocialLink && (
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-5 w-5 rounded-full absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => onDeleteSocialLink(platform)}
                    >
                      <X size={10} />
                    </Button>
                  )}
                </div>
              ))}
              
              {editable && onAddSocialLink && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => setIsAddSocialDialogOpen(true)}
                >
                  <Plus size={16} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Social Platform Dialog */}
      <Sheet 
        open={isAddSocialDialogOpen} 
        onOpenChange={(open) => {
          setIsAddSocialDialogOpen(open);
          if (!open) {
            setSocialPlatformStep("select");
            setSelectedPlatform(null);
            setSearchTerm("");
          }
        }}
      >
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>
              {socialPlatformStep === "select" ? "Add Social Media" : (
                <Button 
                  variant="ghost" 
                  className="p-0 hover:bg-transparent flex items-center gap-1"
                  onClick={() => {
                    setSocialPlatformStep("select");
                    setSelectedPlatform(null);
                  }}
                >
                  <ChevronLeft size={16} />
                  <span>Back to platforms</span>
                </Button>
              )}
            </SheetTitle>
          </SheetHeader>
          
          {socialPlatformStep === "select" ? (
            <>
              <div className="relative my-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search social platforms..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-4">
                {filteredPlatforms.map(platform => (
                  <Button 
                    key={platform.key}
                    variant="outline"
                    className="flex flex-col items-center gap-2 h-auto py-4"
                    onClick={() => handleSelectPlatform(platform)}
                  >
                    <platform.icon size={24} />
                    <span className="text-xs">{platform.name}</span>
                  </Button>
                ))}
              </div>
            </>
          ) : selectedPlatform ? (
            <div className="py-6 space-y-6">
              <div className="flex flex-col items-center gap-2">
                <div className="p-4 bg-gray-100 rounded-full">
                  <selectedPlatform.icon size={32} />
                </div>
                <h3 className="font-medium text-lg">{selectedPlatform.name}</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Add your {selectedPlatform.name} profile link
                </p>
              </div>
              
              <div className="space-y-1">
                <Input
                  placeholder={selectedPlatform.placeholder}
                  value={socialHandle}
                  onChange={(e) => setSocialHandle(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  {selectedPlatform.example}
                </p>
              </div>
              
              <Button 
                className="w-full"
                onClick={handleAddSocial}
                disabled={!socialHandle.trim()}
              >
                <span>Add {selectedPlatform.name}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ) : null}
        </SheetContent>
      </Sheet>
      
      {/* Edit Social Dialog */}
      <Dialog open={isEditSocialDialogOpen} onOpenChange={setIsEditSocialDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {getPlatformName(editingPlatform)}</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-center gap-2">
              {getSocialIcon(editingPlatform)}
              <Input
                value={editingHandle}
                onChange={(e) => setEditingHandle(e.target.value)}
                placeholder={`Enter your ${getPlatformName(editingPlatform)} handle`}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline"
                onClick={() => setIsEditSocialDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleEditSocialLink}
                disabled={!editingHandle.trim()}
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileHeader;
