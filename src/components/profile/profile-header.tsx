
import { User } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Instagram, Youtube, Twitter, Facebook, Mail, MessageSquare, Plus, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface ProfileHeaderProps {
  user: User;
  editable?: boolean;
  onEditProfilePicture?: (file: File) => void;
  onAddSocialLink?: (platform: string) => void;
  onDeleteSocialLink?: (platform: string) => void;
  onEditSocialLink?: (platform: string, handle: string) => void;
}

const ProfileHeader = ({ 
  user, 
  editable = false, 
  onEditProfilePicture, 
  onAddSocialLink,
  onDeleteSocialLink,
  onEditSocialLink
}: ProfileHeaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingSocial, setEditingSocial] = useState<{platform: string, handle: string} | null>(null);
  const [socialHandle, setSocialHandle] = useState("");
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onEditProfilePicture) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file");
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      onEditProfilePicture(file);
    }
  };

  const handleEditButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSaveSocialEdit = () => {
    if (editingSocial && socialHandle && onEditSocialLink) {
      onEditSocialLink(editingSocial.platform, socialHandle);
      setEditingSocial(null);
      setSocialHandle("");
      toast.success(`${editingSocial.platform} handle updated`);
    }
  };

  const availableSocialPlatforms = [
    { name: "Instagram", icon: Instagram },
    { name: "YouTube", icon: Youtube },
    { name: "Twitter", icon: Twitter },
    { name: "Facebook", icon: Facebook },
    { name: "Email", icon: Mail },
    { name: "WhatsApp", icon: MessageSquare }
  ];

  return (
    <div className="py-8">
      {/* New layout with horizontal alignment */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Profile picture */}
        <div className="relative flex-shrink-0">
          <Avatar className="h-24 w-24">
            {user.profilePicture ? (
              <AvatarImage src={user.profilePicture} alt={user.name} />
            ) : (
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            )}
          </Avatar>
          
          {editable && onEditProfilePicture && (
            <>
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <Button 
                size="icon" 
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-primary"
                onClick={handleEditButtonClick}
              >
                <Pencil size={16} className="text-white" />
              </Button>
            </>
          )}
        </div>
        
        {/* User info */}
        <div className="flex-1 flex flex-col items-center md:items-start">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          
          {user.bio && (
            <p className="text-center md:text-left mt-1 max-w-md">{user.bio}</p>
          )}
        </div>
      </div>
      
      {/* Social links */}
      <div className="flex justify-center md:justify-start gap-4 mt-6">
        {user.socialLinks && Object.entries(user.socialLinks).map(([platform, handle]) => {
          if (!handle) return null;
          
          let Icon;
          switch (platform.toLowerCase()) {
            case 'instagram':
              Icon = Instagram;
              break;
            case 'youtube':
              Icon = Youtube;
              break;
            case 'twitter':
              Icon = Twitter;
              break;
            case 'facebook':
              Icon = Facebook;
              break;
            case 'email':
              Icon = Mail;
              break;
            case 'whatsapp':
              Icon = MessageSquare;
              break;
            default:
              return null;
          }
          
          return (
            <div key={platform} className="relative group">
              {editable ? (
                <Button 
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all border border-gray-100"
                  onClick={() => {
                    setEditingSocial({platform, handle});
                    setSocialHandle(handle);
                  }}
                >
                  <Icon className="h-5 w-5 text-gray-600" />
                </Button>
              ) : (
                <a 
                  href={getSocialMediaUrl(platform, handle)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all border border-gray-100"
                >
                  <Icon className="h-5 w-5 text-gray-600" />
                </a>
              )}
              
              {editable && onDeleteSocialLink && (
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onDeleteSocialLink(platform)}
                >
                  <X size={10} />
                </Button>
              )}
            </div>
          );
        })}
        
        {editable && onAddSocialLink && (
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                size="icon"
                variant="outline"
                className="w-10 h-10 rounded-full border border-dashed"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="space-y-1">
                <h4 className="font-medium text-sm">Add social platform</h4>
                <p className="text-xs text-muted-foreground">Select a platform to add to your profile</p>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {availableSocialPlatforms.map((platform) => {
                  const exists = user.socialLinks && user.socialLinks[platform.name.toLowerCase() as keyof typeof user.socialLinks];
                  return (
                    <Button
                      key={platform.name}
                      variant="outline"
                      disabled={Boolean(exists)}
                      size="sm"
                      className="h-auto py-2 flex flex-col gap-1"
                      onClick={() => onAddSocialLink(platform.name.toLowerCase())}
                    >
                      <platform.icon className="h-4 w-4" />
                      <span className="text-xs">{platform.name}</span>
                    </Button>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

      {/* Social edit dialog */}
      <Dialog open={editingSocial !== null} onOpenChange={(open) => !open && setEditingSocial(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {editingSocial?.platform}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="socialHandle">Username/Handle</Label>
              <Input 
                id="socialHandle"
                value={socialHandle}
                onChange={(e) => setSocialHandle(e.target.value)}
                placeholder={`Enter your ${editingSocial?.platform} handle`}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setEditingSocial(null)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveSocialEdit}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Helper function to get social media URL
function getSocialMediaUrl(platform: string, handle: string): string {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return `https://instagram.com/${handle}`;
    case 'youtube':
      return `https://youtube.com/${handle}`;
    case 'twitter':
      return `https://twitter.com/${handle}`;
    case 'facebook':
      return `https://facebook.com/${handle}`;
    case 'email':
      return `mailto:${handle}`;
    case 'whatsapp':
      return `https://wa.me/${handle}`;
    default:
      return '#';
  }
}

export default ProfileHeader;
