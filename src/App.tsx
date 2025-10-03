import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route , Link,HashRouter, useLocation , useNavigate , Navigate,Location} from "react-router-dom";
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

const queryClient = new QueryClient();


useEffect(() => {
  const location = useLocation();
  const navigate = useNavigate();
  if (location.pathname === "/") {
    navigate("/# home");
  }
}, [location.pathname]);

const App = () => {
  return <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <HashRouter basename="/">
        <div className="min-h-screen bg-background text-foreground relative">
          <CursorEffects />
          <MouseFollower />
          <InteractiveBackground />
          <Navigation />
          <AIGreeting />
          <Routes>
            <Route path="/" element={<Link to="/"><Home /></Link  >} />
            <Route path="/about" element={<Link to="/about"><AboutPage /></Link>} />
            <Route path="/skills" element={<Link to="/skills"><SkillsPage /></Link>} />
            <Route path="/projects" element={<Link to="/projects"><ProjectsPage /></Link>} />
            <Route path="/tech" element={<Link to="/tech"><TechPage /></Link>} />
            <Route path="/blog" element={<Link to="/blog"><BlogPage /></Link>} />
            <Route path="/contact" element={<Link to="/contact"><ContactPage /></Link>} />
            <Route path="/testimonials" element={<Link to="/testimonials"><TestimonialsPage /></Link>} />
            <Route path="/services" element={<Link to="/services"><ServicesPage /></Link>} />
            <Route path="/gallery" element={<Link to="/gallery"><GalleryPage /></Link>} />
            <Route path="*" element={<Link to="/"><NotFound /></Link>} />
          </Routes>
          <Chatbot />
        </div>
      </HashRouter>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
};


export default App;
