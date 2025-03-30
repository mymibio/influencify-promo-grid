
import { useState, useEffect } from "react";
import SimpleSidebar from "@/components/dashboard/simple-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, BarChart2, ArrowUp, ArrowDown, Users } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent 
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

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
  lastUpdated: new Date().toISOString(),
  chartData: []
};

// Generate sample chart data
const generateChartData = (timeframe) => {
  const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
  const data = [];
  let date = new Date();
  date.setDate(date.getDate() - days);
  
  for (let i = 0; i < days; i++) {
    date.setDate(date.getDate() + 1);
    data.push({
      date: date.toISOString().split('T')[0],
      visits: Math.floor(Math.random() * 500) + 100,
      clicks: Math.floor(Math.random() * 200) + 50,
    });
  }
  
  return data;
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
        const chartData = generateChartData(analyticsTimeframe);
        
        setAnalyticsData({
          totalVisits: baseVisits,
          totalClicks: baseClicks,
          clickRate: Math.round((baseClicks / baseVisits) * 100 * 10) / 10 || 0,
          visitGrowth: visitGrowth,
          clickGrowth: clickGrowth,
          topSource: ["Instagram", "Direct", "Twitter"][Math.floor(Math.random() * 3)],
          avgTimeOnPage: `${Math.floor(Math.random() * 2 + 1)}m ${Math.floor(Math.random() * 60)}s`,
          newUsers: Math.floor(baseVisits * 0.2 + Math.random() * 50),
          lastUpdated: new Date().toISOString(),
          chartData
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
  
  // Traffic sources data
  const trafficSources = [
    { name: "Instagram", percentage: 54 },
    { name: "Direct", percentage: 28 },
    { name: "Twitter", percentage: 18 }
  ];
  
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
                  <Card key={i} className="rounded-3xl border-0 shadow-sm">
                    <CardContent className="pt-6">
                      <Skeleton className="h-16 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="md:col-span-2 rounded-3xl border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Traffic Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-[200px] w-full" />
                  </CardContent>
                </Card>
                
                <Card className="rounded-3xl border-0 shadow-sm">
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
              <Card className="rounded-3xl border-0 shadow-sm">
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
              
              <Card className="rounded-3xl border-0 shadow-sm">
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
              
              <Card className="rounded-3xl border-0 shadow-sm">
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
              
              <Card className="rounded-3xl border-0 shadow-sm">
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
              <Card className="md:col-span-2 rounded-3xl border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Traffic Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      visits: {
                        label: "Page Views",
                        color: "#8B5CF6", // Purple color
                      },
                      clicks: {
                        label: "Clicks",
                        color: "#D946EF", // Pink color
                      }
                    }}
                    className="aspect-auto h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={analyticsData.chartData}
                        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                      >
                        <XAxis
                          dataKey="date"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={10}
                          tickFormatter={(value) => {
                            const date = new Date(value);
                            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                          }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tickMargin={10}
                          tickFormatter={(value) => {
                            if (value >= 1000) {
                              return `${(value / 1000).toFixed(1)}k`;
                            }
                            return value;
                          }}
                        />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              labelFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
                              }}
                            />
                          }
                        />
                        <defs>
                          <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#D946EF" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#D946EF" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          name="Page Views"
                          dataKey="visits"
                          stroke="#8B5CF6"
                          strokeWidth={2}
                          fill="url(#colorVisits)"
                          activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                        <Area
                          type="monotone"
                          name="Clicks"
                          dataKey="clicks"
                          stroke="#D946EF"
                          strokeWidth={2}
                          fill="url(#colorClicks)"
                          activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
              
              <Card className="rounded-3xl border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trafficSources.map((source) => (
                      <div key={source.name}>
                        <div className="flex justify-between">
                          <span>{source.name}</span>
                          <span className="font-medium">{source.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${source.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
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
