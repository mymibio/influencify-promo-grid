
import React from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, PromotionalItem } from "@/types/user";
import { Input } from "@/components/ui/input";

// Sample user data
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

// Sample promotional items
const sampleItems: PromotionalItem[] = [
  {
    id: "1",
    userId: "123",
    title: "Summer Collection Dress",
    description: "Perfect for beach days and summer outings. Light and comfortable fabric.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format",
    url: "https://example.com/product/1",
    type: "product",
    aspectRatio: "9:16",
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    userId: "123",
    title: "Exclusive Beauty Box",
    description: "My favorite skincare products in one box!",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format",
    url: "https://example.com/product/2",
    type: "product",
    aspectRatio: "1:1",
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    userId: "123",
    title: "Summer Sale - 20% OFF",
    description: "Use my code for 20% off your entire purchase!",
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=500&auto=format",
    url: "https://example.com/coupon/3",
    type: "coupon",
    aspectRatio: "1:1",
    couponCode: "ASHLEY20",
    discount: "20% OFF",
    createdAt: new Date().toISOString()
  },
  {
    id: "4",
    userId: "123",
    title: "Designer Handbag",
    description: "The perfect accessory for any outfit. Limited stock available!",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format",
    url: "https://example.com/product/4",
    type: "product",
    aspectRatio: "9:16",
    createdAt: new Date().toISOString()
  }
];

const Dashboard = () => {
  return (
    <DashboardLayout user={sampleUser}>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Welcome Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Welcome back, {sampleUser.name}!</CardTitle>
            <CardDescription className="text-lg">
              Here's an overview of your promotional links and analytics.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Your Link Section */}
            <div>
              <h3 className="text-xl font-bold mb-3">Your Link</h3>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-lg">linkpromo.io/{sampleUser.username}</p>
              </div>
            </div>
            
            {/* Recent Activity Section */}
            <div>
              <h3 className="text-xl font-bold mb-3">Recent Activity</h3>
              <div className="bg-slate-50 p-6 rounded-lg text-center">
                <p className="text-lg">Your link had 25 views in the last 7 days</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Promotional Links Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Your Promotional Links</CardTitle>
            <CardDescription className="text-lg">
              Your promotional links and coupons
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Input
              placeholder="Search links..."
              className="max-w-sm"
            />
            
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              {sampleItems.slice(0, 4).map((item) => (
                <div key={item.id} className="rounded-lg overflow-hidden border border-gray-200">
                  {item.image && (
                    <div className="aspect-square w-full overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-3">
                    <h3 className="font-bold truncate">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
