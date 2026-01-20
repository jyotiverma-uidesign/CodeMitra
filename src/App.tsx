import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

import Gallery from "./pages/Gallery";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Ragister from "./pages/Ragister";
import NotFound from "./pages/NotFound";
import Courses from "./pages/Courses";
import CoursesDetails from "./pages/CoursesDetails";
import Profile from "./pages/Profile";
import AdminPyment from "./pages/admin/AdminPyment";
import Deshboard from "./pages/Deshboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import { AuthProvider } from "./context/AuthContext";
import ThemeToggle from "./pages/ThemeToggle";
import { useEffect } from "react";
import ScrollToTop from "./components/ScrollTop";

const queryClient = new QueryClient();

const App = () => {
  // 🔹 Set default dark mode on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = savedTheme ?? (systemDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <AuthProvider>
          <ScrollToTop smooth={true}/>
          {/* 🔹 Routes */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CoursesDetails />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Ragister />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/deshboard" element={<Deshboard />} />
            <Route path="/admin/pyment" element={<AdminPyment />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* 🔹 Floating Theme Toggle button */}
          <div className="fixed bottom-4 right-4 z-50">
            <ThemeToggle />
          </div>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
