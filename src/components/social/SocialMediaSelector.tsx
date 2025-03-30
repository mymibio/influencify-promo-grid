
import { useState, useEffect } from "react";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Search, X, Pencil, Check, Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import * as Icons from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { SocialLinks } from "@/types/user";

// Social platform definitions
export const socialPlatforms = [
  {
    name: "Instagram",
    key: "instagram",
    icon: Icons.Instagram,
    color: "text-pink-500",
    placeholder: "Your Instagram username",
    example: "Enter without the @ symbol",
    prefix: "instagram.com/"
  },
  {
    name: "TikTok",
    key: "tiktok",
    icon: Icons.Music,
    color: "text-black dark:text-white",
    placeholder: "Your TikTok username",
    example: "Enter without the @ symbol",
    prefix: "tiktok.com/@"
  },
  {
    name: "Facebook",
    key: "facebook",
    icon: Icons.Facebook,
    color: "text-blue-600",
    placeholder: "Your Facebook username or page name",
    example: "Enter your username or page name",
    prefix: "facebook.com/"
  },
  {
    name: "YouTube",
    key: "youtube",
    icon: Icons.Youtube,
    color: "text-red-500",
    placeholder: "Your YouTube channel name",
    example: "Enter channel name without @",
    prefix: "youtube.com/@"
  },
  {
    name: "Twitter",
    key: "twitter",
    icon: Icons.Twitter,
    color: "text-blue-400",
    placeholder: "Your Twitter username",
    example: "Enter without the @ symbol",
    prefix: "twitter.com/"
  },
  {
    name: "Threads",
    key: "threads",
    icon: Icons.AtSign,
    color: "text-black dark:text-white",
    placeholder: "Your Threads username",
    example: "Enter without the @ symbol",
    prefix: "threads.net/@"
  },
  {
    name: "LinkedIn",
    key: "linkedin",
    icon: Icons.Linkedin,
    color: "text-blue-700",
    placeholder: "Your LinkedIn username",
    example: "Your profile URL's last part",
    prefix: "linkedin.com/in/"
  },
  {
    name: "Pinterest",
    key: "pinterest",
    icon: Icons.Pin,
    color: "text-red-600",
    placeholder: "Your Pinterest username",
    example: "Enter without the @ symbol",
    prefix: "pinterest.com/"
  },
  {
    name: "WhatsApp",
    key: "whatsapp",
    icon: Icons.MessageCircle,
    color: "text-green-500",
    placeholder: "Your WhatsApp number",
    example: "Include country code (e.g., +1234567890)",
    prefix: "wa.me/"
  },
  {
    name: "Email",
    key: "email",
    icon: Icons.Mail,
    color: "text-blue-500",
    placeholder: "Your email address",
    example: "example@domain.com",
    prefix: "mailto:"
  },
  {
    name: "Telegram",
    key: "telegram",
    icon: Icons.Send,
    color: "text-blue-500",
    placeholder: "Your Telegram username",
    example: "Enter without the @ symbol",
    prefix: "t.me/"
  },
  {
    name: "Discord",
    key: "discord",
    icon: Icons.MessageSquare,
    color: "text-indigo-600",
    placeholder: "Your Discord username or server",
    example: "Username or server invite link",
    prefix: "discord.gg/"
  },
  {
    name: "Snapchat",
    key: "snapchat",
    icon: Icons.Ghost,
    color: "text-yellow-400",
    placeholder: "Your Snapchat username",
    example: "Enter without the @ symbol",
    prefix: "snapchat.com/add/"
  },
  {
    name: "Reddit",
    key: "reddit",
    icon: Icons.FileText,
    color: "text-orange-600",
    placeholder: "Your Reddit username",
    example: "Enter without u/",
    prefix: "reddit.com/user/"
  }
];

interface SocialMediaSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (platform: string, handle: string) => void;
  onDelete?: (platform: string) => void;
  initialPlatform?: string;
  initialHandle?: string;
  userSocialLinks?: SocialLinks;
}

const SocialMediaSelector = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialPlatform = "",
  initialHandle = "",
  userSocialLinks = {}
}: SocialMediaSelectorProps) => {
  const isMobile = useIsMobile();
  const [selectedPlatform, setSelectedPlatform] = useState<typeof socialPlatforms[0] | null>(
    initialPlatform ? socialPlatforms.find(p => p.key === initialPlatform) || null : null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [handle, setHandle] = useState(initialHandle);
  const [isEditingExisting, setIsEditingExisting] = useState(Boolean(initialPlatform && userSocialLinks && initialPlatform in userSocialLinks));
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [activeTab, setActiveTab] = useState<'existing' | 'add'>(
    Object.keys(userSocialLinks || {}).length > 0 ? 'existing' : 'add'
  );
  
  useEffect(() => {
    // Update the handle when the initialHandle changes
    if (initialHandle !== handle) {
      setHandle(initialHandle);
    }
    
    // Update the selected platform when initialPlatform changes
    if (initialPlatform && (!selectedPlatform || selectedPlatform.key !== initialPlatform)) {
      const platform = socialPlatforms.find(p => p.key === initialPlatform);
      if (platform) {
        setSelectedPlatform(platform);
        setIsEditingExisting(Boolean(userSocialLinks && initialPlatform in userSocialLinks));
      }
    }
    
    // Set the active tab based on whether the user has social links
    setActiveTab(Object.keys(userSocialLinks || {}).length > 0 ? 'existing' : 'add');
  }, [initialPlatform, initialHandle, userSocialLinks]);
  
  // Reset state when dialog closes
  useEffect(() => {
    if (!isOpen) {
      // Don't reset if we have initial values
      if (!initialPlatform && !initialHandle) {
        setSelectedPlatform(null);
        setHandle("");
      }
      setSearchQuery("");
      setIsAddingNew(false);
    }
  }, [isOpen]);

  const filteredPlatforms = searchQuery
    ? socialPlatforms.filter(platform => 
        platform.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : socialPlatforms;
  
  const userPlatforms = Object.entries(userSocialLinks || {}).map(([key, value]) => {
    const platform = socialPlatforms.find(p => p.key === key);
    return {
      key,
      handle: value,
      platform
    };
  });
  
  const handleSelect = (platform: typeof socialPlatforms[0]) => {
    setSelectedPlatform(platform);
    setSearchQuery("");
    // If editing an existing platform, pre-fill the handle
    if (userSocialLinks && userSocialLinks[platform.key]) {
      setHandle(userSocialLinks[platform.key] || "");
      setIsEditingExisting(true);
    } else {
      setHandle("");
      setIsEditingExisting(false);
    }
  };
  
  const handleSave = () => {
    if (selectedPlatform && handle.trim()) {
      onSave(selectedPlatform.key, handle.trim());
      setIsAddingNew(false);
      setSelectedPlatform(null);
      setHandle("");
    }
  };
  
  const handleBack = () => {
    if (isAddingNew) {
      setIsAddingNew(false);
      setSelectedPlatform(null);
    } else {
      setSelectedPlatform(null);
    }
  };

  const handleAddNewClick = () => {
    setIsAddingNew(true);
    setSelectedPlatform(null);
    setHandle("");
  };
  
  const handleEditExisting = (platformKey: string) => {
    const platform = socialPlatforms.find(p => p.key === platformKey);
    if (platform) {
      setSelectedPlatform(platform);
      setHandle(userSocialLinks?.[platformKey] || "");
      setIsEditingExisting(true);
    }
  };

  const handleDeletePlatform = (platformKey: string) => {
    if (onDelete) {
      onDelete(platformKey);
    }
  };
  
  const renderExistingSocials = () => {
    if (userPlatforms.length === 0) {
      return (
        <div className="text-center py-6 text-muted-foreground">
          <p>No social links added yet</p>
          <Button onClick={() => setActiveTab('add')} variant="outline" className="mt-4">
            Add your first link
          </Button>
        </div>
      );
    }
    
    return (
      <div className="space-y-2">
        {userPlatforms.map(({ key, handle, platform }) => (
          <div 
            key={key}
            className="flex items-center justify-between p-3 rounded-lg border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center p-2 rounded-full bg-gray-100 ${platform?.color || ''}`}>
                {platform ? <platform.icon className="h-5 w-5" /> : <Icons.Link className="h-5 w-5" />}
              </div>
              <div>
                <div className="font-medium">{platform?.name || key}</div>
                <div className="text-sm text-muted-foreground">{handle}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Button 
                size="icon" 
                variant="ghost"
                onClick={() => handleEditExisting(key)}
              >
                <Pencil size={16} />
              </Button>
              
              {onDelete && (
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => handleDeletePlatform(key)}
                >
                  <X size={16} />
                </Button>
              )}
            </div>
          </div>
        ))}
        
        <Button 
          onClick={handleAddNewClick} 
          variant="outline" 
          className="w-full mt-4 gap-2"
        >
          <Plus size={16} />
          Add new social link
        </Button>
      </div>
    );
  };
  
  const renderAddSocial = () => {
    if (selectedPlatform) {
      return (
        <div className="space-y-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to platforms</span>
          </button>
          
          <div className="flex flex-col items-center gap-2 py-4">
            <div className={`p-3 rounded-full bg-gray-100 ${selectedPlatform.color}`}>
              <selectedPlatform.icon className="h-8 w-8" />
            </div>
            <h3 className="font-medium text-lg">{selectedPlatform.name}</h3>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="handle" className="text-sm font-medium block">
              {selectedPlatform.name === "Email" ? "Email Address" : "Username/Handle"}
            </label>
            <div className="flex items-center gap-2">
              {selectedPlatform.key !== "email" && (
                <div className="text-sm text-muted-foreground whitespace-nowrap">
                  {selectedPlatform.prefix}
                </div>
              )}
              <Input
                id="handle"
                value={handle}
                onChange={e => setHandle(e.target.value)}
                placeholder={selectedPlatform.placeholder}
                className="flex-1"
                autoFocus
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {selectedPlatform.example}
            </p>
          </div>
          
          <Button 
            className="w-full"
            onClick={handleSave}
            disabled={!handle.trim()}
          >
            Save
          </Button>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search platforms..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-9"
            autoFocus={!isMobile}
          />
        </div>
        
        <div className="overflow-auto max-h-[60vh]">
          <Command>
            <CommandGroup>
              {filteredPlatforms.length === 0 && (
                <CommandEmpty className="py-6 text-center">No results found</CommandEmpty>
              )}
              {filteredPlatforms.map(platform => (
                <CommandItem
                  key={platform.key}
                  onSelect={() => handleSelect(platform)}
                  className="flex items-center gap-3 p-3 cursor-pointer rounded-lg hover:bg-accent"
                >
                  <div className={`flex items-center justify-center p-2 rounded-full bg-gray-100 ${platform.color}`}>
                    <platform.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{platform.name}</span>
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </div>
      </div>
    );
  };
  
  const content = (
    <>
      {/* Tabs for existing vs add new (only shown when there are existing links) */}
      {Object.keys(userSocialLinks || {}).length > 0 && !selectedPlatform && !isAddingNew && (
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab('existing')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'existing' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-muted-foreground'
            }`}
          >
            Your links
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'add' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-muted-foreground'
            }`}
          >
            Add new
          </button>
        </div>
      )}
      
      {/* Main content based on state */}
      {selectedPlatform ? (
        renderAddSocial()
      ) : isAddingNew ? (
        renderAddSocial()
      ) : (
        activeTab === 'existing' ? renderExistingSocials() : renderAddSocial()
      )}
    </>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              {selectedPlatform 
                ? `${isEditingExisting ? 'Edit' : 'Add'} ${selectedPlatform.name}` 
                : 'Social links'}
            </DrawerTitle>
            <DrawerClose />
          </DrawerHeader>
          <div className="p-4">
            {content}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {selectedPlatform 
              ? `${isEditingExisting ? 'Edit' : 'Add'} ${selectedPlatform.name}` 
              : 'Social links'}
          </DialogTitle>
          <Button 
            size="icon" 
            variant="ghost" 
            className="absolute right-2 top-2" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default SocialMediaSelector;
