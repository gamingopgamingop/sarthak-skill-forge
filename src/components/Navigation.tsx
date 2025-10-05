import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Code2 } from "lucide-react";
import { motion } from "framer-motion";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("/");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Tech", path: "/tech" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const isActive = (path: string) => activeTab === path;

  const handleNavClick = (path: string) => {
    setActiveTab(path);
    setIsOpen(false);
  };

  return (
    <motion.header 
      className="sticky top-0 left-0 right-0 w-full border-b border-accent/20 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 shadow-lg"
      style={{ zIndex: 9999 }}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick("/")}
            className="flex items-center space-x-2 relative z-50"
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
              <Code2 className="h-6 w-6 text-background" />
            </div>
            <span className="text-xl font-bold gradient-text">SarthakDev</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 relative z-50">
            {navItems.map((item) => (
              <button key={item.path} onClick={() => handleNavClick(item.path)}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  className="relative hover:bg-primary/20 hover:text-primary transition-all duration-200"
                >
                  {item.name}
                  {isActive(item.path) && (
                    <motion.div
                      className="absolute inset-0 bg-primary/10 rounded-md -z-10"
                      layoutId="activeTab"
                      initial={false}
                    />
                  )}
                </Button>
              </button>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden relative z-50">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-80 bg-background/95 backdrop-blur-xl" 
              style={{ zIndex: 10000 }}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-bold gradient-text">Navigation</span>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <button 
                    key={item.path} 
                    onClick={() => handleNavClick(item.path)}
                    className="w-full"
                  >
                    <Button
                      variant={isActive(item.path) ? "default" : "ghost"}
                      size="sm"
                      className="w-full justify-start"
                    >
                      {item.name}
                    </Button>
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-8 border-t border-accent/20">
                <p className="text-sm text-muted-foreground mb-4">
                  Ready to work together?
                </p>
                <button onClick={() => handleNavClick("/contact")} className="w-full">
                  <Button variant="default" className="w-full">
                    Get In Touch
                  </Button>
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Demo content below to show scroll behavior */}
      <style>{`
        .gradient-text {
          background: linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </motion.header>
  );
};

export default Navigation;
