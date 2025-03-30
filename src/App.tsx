
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardSettings from "./pages/DashboardSettings";
import DashboardAnalytics from "./pages/DashboardAnalytics";
import DashboardTheme from "./pages/DashboardTheme";
import MobileNavigation from "./components/dashboard/mobile-navigation";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { MobilePopoverProvider } from "./components/ui/popover";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MobilePopoverProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                
                {/* Protected dashboard routes with nested routes */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/dashboard/settings" element={<ProtectedRoute><DashboardSettings /></ProtectedRoute>} />
                <Route path="/dashboard/analytics" element={<ProtectedRoute><DashboardAnalytics /></ProtectedRoute>} />
                <Route path="/dashboard/theme" element={<ProtectedRoute><DashboardTheme /></ProtectedRoute>} />
                
                {/* User profile route - should be below dashboard routes */}
                <Route path="/:username" element={<UserProfile />} />
                
                {/* Catch-all route for 404s */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              
              {/* Mobile Navigation that will display on all pages where the URL includes "/dashboard" */}
              <MobileNavigation />
            </BrowserRouter>
          </TooltipProvider>
        </MobilePopoverProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
