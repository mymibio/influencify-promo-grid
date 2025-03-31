
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigationType } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import Dashboard from "./pages/Dashboard";
import DashboardSettings from "./pages/DashboardSettings";
import DashboardAnalytics from "./pages/DashboardAnalytics";
import DashboardTheme from "./pages/DashboardTheme";
import MobileNavigation from "./components/dashboard/mobile-navigation";
import { AuthProvider } from "./contexts/AuthContext";
import { MobilePopoverProvider } from "./components/ui/popover";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Add Google Fonts (injected in head)
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

// ScrollToTop component to handle navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  
  React.useEffect(() => {
    // Only scroll to top on initial load or PUSH navigation, not on POP (back button)
    if (navigationType !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [pathname, navigationType]);
  
  return null;
}

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MobilePopoverProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                
                {/* Dashboard routes - protected */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/settings" element={
                  <ProtectedRoute>
                    <DashboardSettings />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/analytics" element={
                  <ProtectedRoute>
                    <DashboardAnalytics />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/theme" element={
                  <ProtectedRoute>
                    <DashboardTheme />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/links" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                
                {/* User profile route */}
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
