
import { ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { SidebarProvider, Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LayoutDashboard, Link as LinkIcon, Settings, LogOut, BarChart, Palette, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: ReactNode;
  user: User;
}

const DashboardLayout = ({ children, user: initialUser }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUser);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [newUsername, setNewUsername] = useState(user.username);
  const [newProfilePicture, setNewProfilePicture] = useState<string | undefined>(user.profilePicture);
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = () => {
    // In a real app, this would handle the logout logic
    navigate("/login");
  };
  
  const handleEditProfile = () => {
    setIsProfileDialogOpen(true);
  };
  
  const handleSaveProfile = () => {
    setUser(prev => ({
      ...prev,
      username: newUsername,
      profilePicture: newProfilePicture
    }));
    setIsProfileDialogOpen(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="flex flex-col items-center justify-center gap-2 py-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Avatar className="h-8 w-8">
                  {user.profilePicture ? (
                    <AvatarImage src={user.profilePicture} alt={user.name} />
                  ) : (
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  )}
                </Avatar>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full bg-primary p-0.5"
                  onClick={handleEditProfile}
                >
                  <Pencil size={10} className="text-white" />
                </Button>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">@{user.username}</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/dashboard">
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/dashboard/links">
                    <LinkIcon size={18} />
                    <span>Promotional Links</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/dashboard/analytics">
                    <BarChart size={18} />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/dashboard/theme">
                    <Palette size={18} />
                    <span>Theme</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/dashboard/settings">
                    <Settings size={18} />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <Button 
              variant="ghost" 
              onClick={handleLogout} 
              className="w-full justify-start"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </Button>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 p-6 overflow-auto">
          {children}
        </div>
      </div>
      
      <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                value={newUsername} 
                onChange={(e) => setNewUsername(e.target.value)} 
                placeholder="Enter your username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profilePicture">Profile Picture URL</Label>
              <Input 
                id="profilePicture" 
                value={newProfilePicture || ''} 
                onChange={(e) => setNewProfilePicture(e.target.value)} 
                placeholder="Enter profile picture URL"
              />
            </div>
            <div className="pt-4 flex justify-end">
              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default DashboardLayout;
