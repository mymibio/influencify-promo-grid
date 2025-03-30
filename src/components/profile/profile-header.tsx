
import { User } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Instagram, Youtube, Twitter, Facebook, Mail, MessageSquare, Plus, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import SocialMediaSelector, { socialPlatforms } from "@/components/social/SocialMediaSelector";

interface ProfileHeaderProps {
  user: User;
  editable?: boolean;
  onEditProfilePicture?: (file: File) => void;
  onAddSocialLink?: (platform: string, handle: string) => void;
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
  const [isSocialSelectorOpen, setIsSocialSelectorOpen] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<string>("");
  const [editingHandle, setEditingHandle] = useState<string>("");
  
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
  
  const handleSocialLinkAction = (platform: string, handle: string) => {
    if (editingPlatform && onEditSocialLink) {
      onEditSocialLink(editingPlatform, handle);
    } else if (onAddSocialLink) {
      onAddSocialLink(platform, handle);
    }
    
    setEditingPlatform("");
    setEditingHandle("");
    setIsSocialSelectorOpen(false);
  };
  
  const getSocialIcon = (platformKey: string) => {
    const platform = socialPlatforms.find(p => p.key === platformKey);
    if (platform) {
      const IconComponent = platform.icon;
      return <IconComponent size={20} className={platform.color} />;
    }
    return null;
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
                        setIsSocialSelectorOpen(true);
                      }}
                    >
                      {getSocialIcon(platform)}
                    </Button>
                  ) : (
                    <a 
                      href={platform === "email" ? `mailto:${handle}` : `https://${platform}.com/${handle}`}
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
                  onClick={() => {
                    setEditingPlatform("");
                    setEditingHandle("");
                    setIsSocialSelectorOpen(true);
                  }}
                >
                  <Plus size={16} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Social Media Selector */}
      <SocialMediaSelector
        isOpen={isSocialSelectorOpen}
        onClose={() => setIsSocialSelectorOpen(false)}
        onSave={handleSocialLinkAction}
        initialPlatform={editingPlatform}
        initialHandle={editingHandle}
      />
    </>
  );
};

export default ProfileHeader;
