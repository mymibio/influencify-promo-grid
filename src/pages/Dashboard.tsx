
import { DashboardStats, User } from "@/types/user";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Users, MousePointerClick, TrendingUp } from "lucide-react";

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

// Mock dashboard stats
const sampleStats: DashboardStats = {
  totalVisits: 1243,
  totalClicks: 856,
  clickRate: 68.9,
};

const Dashboard = () => {
  return (
    <DashboardLayout user={sampleUser}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Visits</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                {sampleStats.totalVisits.toLocaleString()}
                <Users className="h-5 w-5 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Clicks</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                {sampleStats.totalClicks.toLocaleString()}
                <MousePointerClick className="h-5 w-5 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Click Rate</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                {sampleStats.clickRate}%
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Share URL</CardDescription>
              <CardTitle className="text-lg flex items-center gap-2 overflow-hidden">
                <span className="truncate text-brand-purple">
                  influencify.com/{sampleUser.username}
                </span>
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Visitor Insights</CardTitle>
            <CardDescription>Your visitor analytics over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="flex flex-col items-center text-muted-foreground">
              <BarChart className="h-12 w-12 mb-2" />
              <p>Analytics data will appear here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
