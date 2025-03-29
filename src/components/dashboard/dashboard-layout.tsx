
import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { SidebarProvider, Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LayoutDashboard, Link as LinkIcon, UserRound, Settings, LogOut } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  user: User;
}

const DashboardLayout = ({ children, user }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  
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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="flex flex-col items-center justify-center gap-2 py-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                {user.profilePicture ? (
                  <AvatarImage src={user.profilePicture} alt={user.name} />
                ) : (
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                )}
              </Avatar>
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
                  <Link to="/dashboard/profile">
                    <UserRound size={18} />
                    <span>Profile</span>
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
    </SidebarProvider>
  );
};

export default DashboardLayout;
