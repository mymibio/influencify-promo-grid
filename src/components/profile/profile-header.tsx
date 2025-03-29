
import { User } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Instagram, Youtube, Twitter, Facebook, Mail, MessageSquare, Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ProfileHeaderProps {
  user: User;
  editable?: boolean;
  onEditProfilePicture?: () => void;
  onAddSocialLink?: (platform: string) => void;
}

const ProfileHeader = ({ user, editable = false, onEditProfilePicture, onAddSocialLink }: ProfileHeaderProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
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
    <div className="flex flex-col items-center py-8">
      <div className="relative">
        <Avatar className="h-24 w-24 mb-4">
          {user.profilePicture ? (
            <AvatarImage src={user.profilePicture} alt={user.name} />
          ) : (
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          )}
        </Avatar>
        
        {editable && onEditProfilePicture && (
          <Button 
            size="icon" 
            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-primary"
            onClick={onEditProfilePicture}
          >
            <Pencil size={16} />
          </Button>
        )}
      </div>
      
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p className="text-muted-foreground mt-1">@{user.username}</p>
      
      {user.bio && (
        <p className="text-center max-w-md mt-4">{user.bio}</p>
      )}
      
      <div className="flex gap-4 mt-6">
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
          
          let url = "";
          switch (platform.toLowerCase()) {
            case 'instagram':
              url = `https://instagram.com/${handle}`;
              break;
            case 'youtube':
              url = `https://youtube.com/${handle}`;
              break;
            case 'twitter':
              url = `https://twitter.com/${handle}`;
              break;
            case 'facebook':
              url = `https://facebook.com/${handle}`;
              break;
            case 'email':
              url = `mailto:${handle}`;
              break;
            case 'whatsapp':
              url = `https://wa.me/${handle}`;
              break;
          }
          
          return (
            <Link 
              key={platform}
              to={url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all border border-gray-100"
            >
              <Icon className="h-5 w-5 text-gray-600" />
            </Link>
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
    </div>
  );
};

export default ProfileHeader;
