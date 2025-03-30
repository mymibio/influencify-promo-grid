
import { useState, useEffect } from "react";
import SimpleSidebar from "@/components/dashboard/simple-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, BarChart2, ArrowUp, ArrowDown, Users } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useAuth } from "@/contexts/AuthContext";
import MobileNavigation from "@/components/dashboard/mobile-navigation";
import { supabase } from "@/integrations/supabase/client";

// Analytics data shape
interface AnalyticsData {
  totalVisits: number;
  totalClicks: number;
  clickRate: number;
  visitGrowth: number;
  clickGrowth: number;
  topSource: string;
  avgTimeOnPage: string;
  newUsers: number;
  lastUpdated: string;
}

const DashboardAnalytics = () => {
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState("7d");
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { profile } = useAuth();

  useEffect(() => {
    if (profile) {
      fetchAnalytics(analyticsTimeframe);
    }
  }, [profile, analyticsTimeframe]);

  const fetchAnalytics = async (timeframe: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, you would fetch actual analytics data from your backend
      // For now, we'll generate some random data based on the user's ID
      
      // Use the user's ID to seed the random number generator for consistent results
      const seed = profile ? profile.id.charCodeAt(0) + profile.id.charCodeAt(1) : 0;
      const rand = (min: number, max: number) => Math.floor((Math.sin(seed) + 1) * (max - min) / 2 + min);
      
      // Generate data based on timeframe
      let multiplier = 1;
      if (timeframe === "30d") multiplier = 4;
      if (timeframe === "90d") multiplier = 12;
      
      const data: AnalyticsData = {
        totalVisits: rand(500, 2000) * multiplier,
        totalClicks: rand(200, 800) * multiplier,
        clickRate: parseFloat((rand(30, 60) / 10).toFixed(1)),
        visitGrowth: parseFloat((rand(-20, 30) / 10).toFixed(1)),
        clickGrowth: parseFloat((rand(-15, 25) / 10).toFixed(1)),
        topSource: ["Instagram", "Twitter", "Direct", "Facebook"][rand(0, 3)],
        avgTimeOnPage: `${rand(1, 3)}m ${rand(10, 59)}s`,
        newUsers: rand(100, 500) * multiplier,
        lastUpdated: new Date().toISOString()
      };
      
      // Simulate API delay
      setTimeout(() => {
        setAnalyticsData(data);
        setIsLoading(false);
      }, 800);
      
    } catch (error) {
      console.error("Error fetching analytics:", error);
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <SimpleSidebar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
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
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="pt-6">
                      <div className="h-16 bg-gray-200 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : analyticsData ? (
              <>
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
                          <p>Traffic visualization would appear here</p>
                          <p className="text-sm mt-1">Data for {profile?.username || 'your profile'}</p>
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
                          <span className="font-medium">{Math.floor(Math.random() * 30) + 40}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "54%" }}></div>
                        </div>
                        
                        <div className="flex justify-between">
                          <span>Direct</span>
                          <span className="font-medium">{Math.floor(Math.random() * 20) + 20}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "28%" }}></div>
                        </div>
                        
                        <div className="flex justify-between">
                          <span>Twitter</span>
                          <span className="font-medium">{Math.floor(Math.random() * 15) + 10}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "18%" }}></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p>No analytics data available</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <MobileNavigation />
    </div>
  );
};

export default DashboardAnalytics;
