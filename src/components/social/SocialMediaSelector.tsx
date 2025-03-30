
import { useState, useEffect } from "react";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import * as Icons from "lucide-react";

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
  initialPlatform?: string;
  initialHandle?: string;
}

const SocialMediaSelector = ({
  isOpen,
  onClose,
  onSave,
  initialPlatform = "",
  initialHandle = ""
}: SocialMediaSelectorProps) => {
  const isMobile = useIsMobile();
  const [selectedPlatform, setSelectedPlatform] = useState<typeof socialPlatforms[0] | null>(
    initialPlatform ? socialPlatforms.find(p => p.key === initialPlatform) || null : null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [handle, setHandle] = useState(initialHandle);
  
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
      }
    }
  }, [initialPlatform, initialHandle]);
  
  // Reset state when dialog closes
  useEffect(() => {
    if (!isOpen) {
      // Don't reset if we have initial values
      if (!initialPlatform && !initialHandle) {
        setSelectedPlatform(null);
        setHandle("");
      }
      setSearchQuery("");
    }
  }, [isOpen]);

  const filteredPlatforms = searchQuery
    ? socialPlatforms.filter(platform => 
        platform.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : socialPlatforms;
  
  const handleSelect = (platform: typeof socialPlatforms[0]) => {
    setSelectedPlatform(platform);
    setSearchQuery("");
  };
  
  const handleSave = () => {
    if (selectedPlatform && handle.trim()) {
      onSave(selectedPlatform.key, handle.trim());
    }
  };
  
  const handleBack = () => {
    setSelectedPlatform(null);
  };
  
  const content = (
    <>
      {!selectedPlatform ? (
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
      ) : (
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
      )}
    </>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{selectedPlatform ? `Add ${selectedPlatform.name}` : "Add social platform"}</DrawerTitle>
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
          <DialogTitle>{selectedPlatform ? `Add ${selectedPlatform.name}` : "Add social platform"}</DialogTitle>
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
