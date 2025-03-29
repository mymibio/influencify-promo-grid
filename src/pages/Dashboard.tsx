
import React from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, PromotionalItem } from "@/types/user";
import ProfilePreview from "@/components/dashboard/profile-preview";

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h1 className="text-3xl font-bold">Dashboard</h1>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Welcome back, {sampleUser.name}!</CardTitle>
                <CardDescription>
                  Here's an overview of your promotional links and analytics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Your Link</h3>
                    <div className="flex items-center justify-between mt-2 p-3 bg-muted rounded-lg">
                      <p className="text-sm">
                        linkpromo.io/{sampleUser.username}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mt-4">Recent Activity</h3>
                    <div className="mt-2 p-4 bg-muted rounded-lg text-center">
                      <p>Your link had 25 views in the last 7 days</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Latest Promotional Items</CardTitle>
                <CardDescription>
                  Your recent promotional links and coupons
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {sampleItems.slice(0, 2).map((item) => (
                    <div key={item.id} className="p-4 border rounded-lg">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.type === 'coupon' ? 'Coupon' : 'Product Link'}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Live Preview section - only shown on desktop and tablet */}
        <div className="hidden lg:block">
          <ProfilePreview
            user={sampleUser}
            items={sampleItems}
            selectedTheme="default"
            hideOnMobile={true}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
