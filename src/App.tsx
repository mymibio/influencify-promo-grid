
import { Route, Routes } from "react-router-dom";
import Navbar from "@/components/ui/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import Dashboard from "@/pages/Dashboard";
import DashboardAnalytics from "@/pages/DashboardAnalytics";
import DashboardSettings from "@/pages/DashboardSettings";
import DashboardTheme from "@/pages/DashboardTheme";
import UserProfile from "@/pages/UserProfile";
import NotFound from "@/pages/NotFound";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Demo from "@/pages/Demo";
import Blogs from "@/pages/Blogs";
import BlogPost from "@/pages/BlogPost";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/analytics" element={
          <ProtectedRoute>
            <DashboardAnalytics />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/settings" element={
          <ProtectedRoute>
            <DashboardSettings />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/theme" element={
          <ProtectedRoute>
            <DashboardTheme />
          </ProtectedRoute>
        } />
        <Route path="/u/:username" element={<UserProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
