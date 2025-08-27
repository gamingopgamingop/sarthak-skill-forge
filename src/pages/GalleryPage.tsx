import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Filter, Grid, LayoutGrid, Image as ImageIcon, 
  ExternalLink, Github, Play, Maximize2,
  Code, Globe, Smartphone, Database, Brain, Shield
} from "lucide-react";

const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'masonry'

  const categories = ['All', 'Web Apps', 'Mobile Apps', 'AI Projects', 'Design', 'Security Tools'];

  const galleryItems = [
    {
      id: 1,
      title: "E-commerce Platform",
      category: "Web Apps",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      description: "Modern e-commerce solution with advanced features",
      tags: ["React", "Node.js", "MongoDB"],
      type: "image",
      gradient: "from-blue-500 to-purple-500",
      featured: true
    },
    {
      id: 2,
      title: "Mobile Banking App",
      category: "Mobile Apps", 
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      description: "Secure mobile banking application with biometric authentication",
      tags: ["React Native", "Firebase", "Security"],
      type: "image",
      gradient: "from-green-500 to-teal-500",
      featured: false
    },
    {
      id: 3,
      title: "AI Chat Assistant",
      category: "AI Projects",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      description: "Intelligent chatbot with natural language processing",
      tags: ["Python", "OpenAI", "NLP"],
      type: "video",
      gradient: "from-purple-500 to-pink-500",
      featured: true
    },
    {
      id: 4,
      title: "Dashboard Design",
      category: "Design",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      description: "Clean and intuitive dashboard interface design",
      tags: ["UI/UX", "Figma", "Design System"],
      type: "image",
      gradient: "from-orange-500 to-red-500",
      featured: false
    },
    {
      id: 5,
      title: "Cybersecurity Suite",
      category: "Security Tools",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
      description: "Comprehensive security testing and monitoring tools",
      tags: ["Python", "Security", "Penetration Testing"],
      type: "image",
      gradient: "from-red-500 to-pink-500",
      featured: true
    },
    {
      id: 6,
      title: "Learning Management System",
      category: "Web Apps",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
      description: "Comprehensive platform for online education",
      tags: ["React", "TypeScript", "PostgreSQL"],
      type: "image",
      gradient: "from-cyan-500 to-blue-500",
      featured: false
    },
    {
      id: 7,
      title: "Smart Home App",
      category: "Mobile Apps",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      description: "IoT-enabled smart home control application",
      tags: ["Flutter", "IoT", "Bluetooth"],
      type: "image",
      gradient: "from-teal-500 to-green-500",
      featured: false
    },
    {
      id: 8,
      title: "AI Image Generator",
      category: "AI Projects",
      image: "https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=600&h=400&fit=crop",
      description: "AI-powered image generation and manipulation tool",
      tags: ["Python", "Machine Learning", "Computer Vision"],
      type: "video",
      gradient: "from-violet-500 to-purple-500",
      featured: true
    },
    {
      id: 9,
      title: "Brand Identity Suite",
      category: "Design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
      description: "Complete brand identity and visual design system",
      tags: ["Branding", "Logo Design", "Visual Identity"],
      type: "image",
      gradient: "from-yellow-500 to-orange-500",
      featured: false
    }
  ];

  const filteredItems = activeFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  const getIcon = (category: string) => {
    switch (category) {
      case 'Web Apps': return Globe;
      case 'Mobile Apps': return Smartphone;
      case 'AI Projects': return Brain;
      case 'Design': return ImageIcon;
      case 'Security Tools': return Shield;
      default: return Code;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <ImageIcon className="mr-2 h-4 w-4" />
              Project Gallery
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Visual Showcase
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Explore a curated collection of projects, designs, and innovations that 
              demonstrate technical expertise and creative problem-solving.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and View Controls */}
      <section className="py-8 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = getIcon(category);
                return (
                  <Button
                    key={category}
                    variant={activeFilter === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter(category)}
                    className={`${
                      activeFilter === category 
                        ? 'bg-gradient-to-r from-primary to-secondary text-background' 
                        : ''
                    }`}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {category}
                  </Button>
                );
              })}
            </div>

            {/* View Mode Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'masonry' ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode('masonry')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground ml-2">
                {filteredItems.length} items
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'columns-1 md:columns-2 lg:columns-3 space-y-6'
          }`}>
            {filteredItems.map((item, index) => (
              <Card 
                key={item.id}
                className={`group overflow-hidden card-hover ${
                  item.featured ? 'ring-2 ring-primary/20' : ''
                } ${viewMode === 'masonry' ? 'break-inside-avoid' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                      viewMode === 'grid' ? 'h-48' : 'h-auto'
                    }`}
                  />
                  
                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-0 group-hover:opacity-80 transition-opacity duration-300`} />
                  
                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-gradient-to-r from-accent to-primary text-background border-0">
                        Featured
                      </Badge>
                    </div>
                  )}

                  {/* Media Type Icon */}
                  <div className="absolute top-3 right-3">
                    {item.type === 'video' ? (
                      <div className="p-2 rounded-full bg-background/80 backdrop-blur-sm">
                        <Play className="h-4 w-4 text-foreground" />
                      </div>
                    ) : (
                      <div className="p-2 rounded-full bg-background/80 backdrop-blur-sm">
                        <ImageIcon className="h-4 w-4 text-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-3">
                      <Button size="sm" variant="secondary" className="bg-background/90 text-foreground">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="bg-background/90 text-foreground">
                        <Github className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="bg-background/90 text-foreground">
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex} 
                        variant="secondary" 
                        className="text-xs bg-muted/50 hover:bg-accent/10 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No items found</h3>
              <p className="text-muted-foreground">Try selecting a different category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <Card className="p-12 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-border/50">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">
              Like What You See?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ready to bring your vision to life? Let's collaborate and create something 
              amazing that showcases your brand and achieves your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-background">
                <ExternalLink className="mr-2 h-5 w-5" />
                Start Your Project
              </Button>
              <Button size="lg" variant="outline">
                <ImageIcon className="mr-2 h-5 w-5" />
                View All Work
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;