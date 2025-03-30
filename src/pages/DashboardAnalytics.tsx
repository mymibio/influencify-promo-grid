
import { useState, useEffect } from "react";
import SimpleSidebar from "@/components/dashboard/simple-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, BarChart2, ArrowUp, ArrowDown, Users } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

// Default analytics data structure
const defaultAnalyticsData = {
  totalVisits: 0,
  totalClicks: 0,
  clickRate: 0,
  visitGrowth: 0,
  clickGrowth: 0,
  topSource: "",
  avgTimeOnPage: "0s",
  newUsers: 0,
  lastUpdated: new Date().toISOString()
};

const DashboardAnalytics = () => {
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState("7d");
  const [analyticsData, setAnalyticsData] = useState(defaultAnalyticsData);
  const [isLoading, setIsLoading] = useState(true);
  const { profile } = useAuth();
  
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      if (!profile) return;
      
      setIsLoading(true);
      
      try {
        // In a real app, you would fetch analytics data from your backend
        // For now, we'll generate some random data based on the user's promotional items
        
        const { data: items, error } = await supabase
          .from('promotional_items')
          .select('*')
          .eq('user_id', profile.id);
          
        if (error) {
          console.error("Error fetching promotional items:", error);
          toast.error("Failed to load analytics data");
          return;
        }
        
        // Generate mock analytics based on the number of promotional items
        const itemCount = items?.length || 0;
        const baseVisits = itemCount * 100 + Math.floor(Math.random() * 500);
        const baseClicks = Math.floor(baseVisits * (0.3 + Math.random() * 0.3));
        const visitGrowth = Math.round((Math.random() * 20 - 5) * 10) / 10; // -5 to +15
        const clickGrowth = Math.round((Math.random() * 20 - 5) * 10) / 10; // -5 to +15
        
        setAnalyticsData({
          totalVisits: baseVisits,
          totalClicks: baseClicks,
          clickRate: Math.round((baseClicks / baseVisits) * 100 * 10) / 10 || 0,
          visitGrowth: visitGrowth,
          clickGrowth: clickGrowth,
          topSource: ["Instagram", "Direct", "Twitter"][Math.floor(Math.random() * 3)],
          avgTimeOnPage: `${Math.floor(Math.random() * 2 + 1)}m ${Math.floor(Math.random() * 60)}s`,
          newUsers: Math.floor(baseVisits * 0.2 + Math.random() * 50),
          lastUpdated: new Date().toISOString()
        });
      } catch (error) {
        console.error("Error:", error);
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnalyticsData();
  }, [profile, analyticsTimeframe]);
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full bg-gray-50">
        <SimpleSidebar />
        
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Analytics</h1>
            
            {/* Loading state */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Traffic Overview</h2>
                <Skeleton className="h-10 w-32" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i}>
                    <CardContent className="pt-6">
                      <Skeleton className="h-16 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Traffic Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-[200px] w-full" />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Traffic Sources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-[200px] w-full" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <SimpleSidebar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Analytics</h1>
          
          {/* Analytics Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Traffic Overview</h2>
              <ToggleGroup type="single" value={analyticsTimeframe} onValueChange={(value) => value && setAnalyticsTimeframe(value)}>
                <ToggleGroupItem value="7d">7d</ToggleGroupItem>
                <ToggleGroupItem value="30d">30d</ToggleGroupItem>
                <ToggleGroupItem value="90d">90d</ToggleGroupItem>
              </ToggleGroup>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Page Views</p>
                      <h3 className="text-2xl font-bold mt-1">{analyticsData.totalVisits.toLocaleString()}</h3>
                    </div>
                    <div className={`flex items-center ${analyticsData.visitGrowth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {analyticsData.visitGrowth > 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                      <span className="text-sm font-medium">{Math.abs(analyticsData.visitGrowth)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Link Clicks</p>
                      <h3 className="text-2xl font-bold mt-1">{analyticsData.totalClicks.toLocaleString()}</h3>
                    </div>
                    <div className={`flex items-center ${analyticsData.clickGrowth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {analyticsData.clickGrowth > 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                      <span className="text-sm font-medium">{Math.abs(analyticsData.clickGrowth)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Conversion Rate</p>
                      <h3 className="text-2xl font-bold mt-1">{analyticsData.clickRate}%</h3>
                    </div>
                    <BarChart2 size={24} className="text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">New Visitors</p>
                      <h3 className="text-2xl font-bold mt-1">{analyticsData.newUsers}</h3>
                    </div>
                    <Users size={24} className="text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Traffic Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-md">
                    <div className="text-center text-muted-foreground">
                      <BarChart size={48} className="mx-auto mb-2" />
                      <p>Traffic data will be available soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Instagram</span>
                      <span className="font-medium">54%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "54%" }}></div>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Direct</span>
                      <span className="font-medium">28%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "28%" }}></div>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Twitter</span>
                      <span className="font-medium">18%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "18%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardAnalytics;
