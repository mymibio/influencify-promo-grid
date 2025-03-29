
import { User } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Instagram, Youtube, Twitter, Facebook, Mail, MessageSquare, Plus, Pencil, X, ChevronLeft, Search, Linkedin, Pin, MessageCircle, FileText, ArrowRight, Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";
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

interface SocialPlatform {
  name: string;
  key: string;
  icon: React.ElementType;
  placeholder: string;
  example: string;
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
  const [isAddSocialDialogOpen, setIsAddSocialDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | null>(null);
  const [step, setStep] = useState<'selection' | 'handle'>('selection');
  
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
  
  const handleAddSocialClick = () => {
    setIsAddSocialDialogOpen(true);
    setStep('selection');
    setSelectedPlatform(null);
    setSearchQuery("");
    setSocialHandle("");
  };
  
  const handleSelectPlatform = (platform: SocialPlatform) => {
    setSelectedPlatform(platform);
    setStep('handle');
  };
  
  const handleGoBack = () => {
    if (step === 'handle') {
      setStep('selection');
      setSelectedPlatform(null);
    } else {
      setIsAddSocialDialogOpen(false);
    }
  };
  
  const handleSaveNewSocial = () => {
    if (selectedPlatform && socialHandle && onAddSocialLink) {
      onAddSocialLink(selectedPlatform.key);
      onEditSocialLink?.(selectedPlatform.key, socialHandle);
      setIsAddSocialDialogOpen(false);
      setSocialHandle("");
      setSelectedPlatform(null);
      setStep('selection');
      toast.success(`${selectedPlatform.name} added successfully`);
    }
  };

  const socialPlatforms: SocialPlatform[] = [
    { 
      name: "Instagram", 
      key: "instagram", 
      icon: Instagram,
      placeholder: "Enter Instagram Username",
      example: "Example: @instagramusername"
    },
    { 
      name: "YouTube", 
      key: "youtube", 
      icon: Youtube,
      placeholder: "Enter YouTube Username",
      example: "Example: @youtubeusername or channel name"
    },
    { 
      name: "X (formerly Twitter)", 
      key: "twitter", 
      icon: Twitter,
      placeholder: "Enter X Username",
      example: "Example: @username"
    },
    { 
      name: "Facebook", 
      key: "facebook", 
      icon: Facebook,
      placeholder: "Enter Facebook Username or Page",
      example: "Example: username or page name"
    },
    { 
      name: "Email", 
      key: "email", 
      icon: Mail,
      placeholder: "Enter Email Address",
      example: "Example: your@email.com"
    },
    { 
      name: "WhatsApp", 
      key: "whatsapp", 
      icon: MessageSquare,
      placeholder: "Enter WhatsApp Number",
      example: "Example: +1234567890 (include country code)"
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
      example: "Example: @pinterestusername"
    },
    { 
      name: "Snapchat", 
      key: "snapchat", 
      icon: Ghost, // Changed from Snapchat to Ghost icon
      placeholder: "Enter Snapchat Username",
      example: "Example: @snapchatusername"
    },
    { 
      name: "Telegram", 
      key: "telegram", 
      icon: MessageCircle,
      placeholder: "Enter Telegram Username",
      example: "Example: @telegramusername"
    },
    { 
      name: "Threads", 
      key: "threads", 
      icon: FileText,
      placeholder: "Enter Threads Username",
      example: "Example: @threadsusername"
    }
  ];

  const filteredPlatforms = searchQuery 
    ? socialPlatforms.filter(platform => 
        platform.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : socialPlatforms;

  return (
    <div className="py-8">
      {/* Compact layout with horizontal alignment */}
      <div className="flex flex-row items-start gap-4">
        {/* Profile picture */}
        <div className="relative flex-shrink-0">
          <Avatar className="h-20 w-20">
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
        <div className="flex-1">
          <h1 className="text-xl font-bold">{user.name}</h1>
          
          {user.bio && (
            <p className="text-sm text-gray-600 mt-1">{user.bio}</p>
          )}
          
          {/* Social links */}
          <div className="flex flex-wrap gap-2 mt-3">
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
                case 'linkedin':
                  Icon = Linkedin;
                  break;
                case 'pinterest':
                  Icon = Pin;
                  break;
                case 'snapchat':
                  Icon = Snapchat;
                  break;
                case 'telegram':
                  Icon = MessageCircle;
                  break;
                case 'threads':
                  Icon = FileText;
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
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all border border-gray-100"
                      onClick={() => {
                        setEditingSocial({platform, handle});
                        setSocialHandle(handle);
                      }}
                    >
                      <Icon className="h-4 w-4 text-gray-600" />
                    </Button>
                  ) : (
                    <a 
                      href={getSocialMediaUrl(platform, handle)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all border border-gray-100"
                    >
                      <Icon className="h-4 w-4 text-gray-600" />
                    </a>
                  )}
                  
                  {editable && onDeleteSocialLink && (
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-4 w-4 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => onDeleteSocialLink(platform)}
                    >
                      <X size={8} />
                    </Button>
                  )}
                </div>
              );
            })}
            
            {editable && onAddSocialLink && (
              <Button 
                size="icon"
                variant="outline"
                className="w-8 h-8 rounded-full border border-dashed"
                onClick={handleAddSocialClick}
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
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
      
      {/* Add Social Dialog */}
      <Dialog open={isAddSocialDialogOpen} onOpenChange={setIsAddSocialDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-2"
                onClick={handleGoBack}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <DialogTitle>
                {step === 'selection' ? 'Add social icon' : `Add ${selectedPlatform?.name} icon`}
              </DialogTitle>
            </div>
          </DialogHeader>
          
          {step === 'selection' ? (
            <div className="space-y-4 py-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search" 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} 
                />
              </div>
              
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {filteredPlatforms.map(platform => {
                  const exists = user.socialLinks && user.socialLinks[platform.key as keyof typeof user.socialLinks];
                  
                  return (
                    <Button
                      key={platform.key}
                      variant="ghost"
                      disabled={Boolean(exists)}
                      className="w-full justify-between h-12 px-4"
                      onClick={() => handleSelectPlatform(platform)}
                    >
                      <div className="flex items-center gap-3">
                        <platform.icon className="h-5 w-5" />
                        <span>{platform.name}</span>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </Button>
                  );
                })}
                
                {filteredPlatforms.length === 0 && (
                  <p className="text-center text-gray-500 py-4">No social platforms found</p>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              {selectedPlatform && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="handle">{selectedPlatform.placeholder}</Label>
                    <Input 
                      id="handle" 
                      value={socialHandle} 
                      onChange={(e) => setSocialHandle(e.target.value)}
                      placeholder={selectedPlatform.placeholder}
                    />
                    <p className="text-xs text-gray-500">{selectedPlatform.example}</p>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      className="w-full"
                      disabled={!socialHandle}
                      onClick={handleSaveNewSocial}
                    >
                      Add
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
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
      return handle.startsWith('http') ? handle : `https://youtube.com/${handle}`;
    case 'twitter':
      return `https://twitter.com/${handle}`;
    case 'facebook':
      return `https://facebook.com/${handle}`;
    case 'email':
      return `mailto:${handle}`;
    case 'whatsapp':
      return `https://wa.me/${handle}`;
    case 'linkedin':
      return `https://linkedin.com/in/${handle}`;
    case 'pinterest':
      return `https://pinterest.com/${handle}`;
    case 'snapchat':
      return `https://snapchat.com/add/${handle}`;
    case 'telegram':
      return `https://t.me/${handle}`;
    case 'threads':
      return `https://threads.net/${handle}`;
    default:
      return '#';
  }
}

export default ProfileHeader;
