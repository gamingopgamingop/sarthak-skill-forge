import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import { Routes, Route, Link, useLocation, useNavigate, Navigate, Location, useNavigationType, useNavigation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import AIGreeting from "@/components/AIGreeting";
import Chatbot from "@/components/Chatbot";
import CursorEffects from "@/components/CursorEffects";
import MouseFollower from "@/components/MouseFollower";
import InteractiveBackground from "@/components/InteractiveBackground";
import Home from "@/pages/Home";
import AboutPage from "@/pages/AboutPage";
import SkillsPage from "@/pages/SkillsPage";
import ProjectsPage from "@/pages/ProjectsPage";
import TechPage from "@/pages/TechPage";
import BlogPage from "@/pages/BlogPage";
import ContactPage from "@/pages/ContactPage";
import TestimonialsPage from "@/pages/TestimonialsPage";
import ServicesPage from "@/pages/ServicesPage";
import GalleryPage from "@/pages/GalleryPage";
import NotFound from "@/pages/NotFound";

const RouteHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const navigation = useNavigation();
  
  const { data: locationData } = useQuery({
    queryKey: ["locationData"],
    queryFn: () => location.pathname,
  });

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/#home");
    }
  }, [location.pathname, navigate]);

  return null;
};

const App = () => {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="min-h-screen bg-background text-foreground relative">
        <CursorEffects />
        <MouseFollower />
        <InteractiveBackground />
        <Navigation />
        <AIGreeting />
        <RouteHandler />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/tech" element={<TechPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Chatbot />
      </div>
    </TooltipProvider>
  );
};

export default App;