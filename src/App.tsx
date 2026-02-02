// @ts-nocheck
// @ts-ignore

import { useEffect } from "react";
import SimpleBar from 'simplebar-react';
import { Toaster } from "../../components/ui/toaster";
import { Toaster as Sonner } from "../../components/ui/sonner";
import { TooltipProvider } from "../../components/ui/tooltip";
import { BrowserRouter, Routes, Route , Link,HashRouter, useLocation , useNavigate , Navigate ,useNavigationType , useNavigation} from "react-router-dom";
import type { Location } from "react-router-dom";

import { QueryClient as ReactQueryClient, QueryClientProvider as ReactQueryClientProvider, useQuery as useReactQuery } from "@tanstack/react-query";
import Navigation from "../../components/Navigation";
import AIGreeting from "../../components/AIGreeting";
import Chatbot from "../../components/Chatbot";
import CursorEffects from "../../components/CursorEffects";
import MouseFollower from "../../components/MouseFollower";
import InteractiveBackground from "../../components/InteractiveBackground";
import Home from "../../pages/Home";
import AboutPage from "../../pages/AboutPage";
import SkillsPage from "../../pages/SkillsPage";
import ProjectsPage from "../../pages/ProjectsPage";
import TechPage from "../../pages/TechPage";
import BlogPage from "../../pages/BlogPage";
import ContactPage from "../../pages/ContactPage";
import TestimonialsPage from "../../pages/TestimonialsPage";
import ServicesPage from "../../pages/ServicesPage";
import GalleryPage from "../../pages/GalleryPage";
import NotFound from "../../pages/errors/NotFound";
import { useQuery } from "convex/react";
import { api } from "../../convex/my-app-authkit/convex/_generated/api.js";
import { MotiaStreamProvider } from '@motiadev/stream-client-react'
import { useStreamGroup } from '@motiadev/stream-client-react'
import { useTodoEndpoints, type Todo } from "../../hooks/useTodoEndpoints"
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";


const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { createTodo, updateTodo, deleteTodo } = useTodoEndpoints()


  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/#home");
    }
  }, [location.pathname, navigate]);

    const { data: todos } = useStreamGroup<Todo>({ 
    groupId: 'inbox', 
    streamName: 'todo' 
  })
 
  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id)
    // No need to manually update UI - stream does it automatically!
  }


  const handleAddTodo = async (description: string) => {
    await createTodo(description)
    // No need to manually update UI - stream does it automatically!
  }


  return (
    <BrowserRouter>
    <MotiaStreamProvider address="ws://localhost:3000">
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <SimpleBar style={{ maxHeight: '100vh' }}>
        <div className="min-h-screen bg-background text-foreground relative">
          <CursorEffects />
          <MouseFollower />
          <InteractiveBackground />
          <Navigation />
          <AIGreeting />
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
      </SimpleBar>
    </TooltipProvider>
  </MotiaStreamProvider>
  </BrowserRouter>

  );
};

export default App;