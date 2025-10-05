import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Code2 } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("/");

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

  return (
    <div className="sticky top-0 w-full z-[9999] border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => setActiveTab("/")}
            className="flex items-center gap-2 z-50 hover:opacity-80 transition-opacity"
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              SarthakDev
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 z-50">
            {navItems.map((item) => (
              <button key={item.path} onClick={() => setActiveTab(item.path)}>
                <Button
                  variant={activeTab === item.path ? "default" : "ghost"}
                  size="sm"
                  className="hover:bg-blue-500/10 hover:text-blue-500 transition-all"
                >
                  {item.name}
                </Button>
              </button>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden z-50">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-80 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl z-[10000]"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Navigation
                </span>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button 
                    key={item.path} 
                    onClick={() => {
                      setActiveTab(item.path);
                      setIsOpen(false);
                    }}
                    className="w-full"
                  >
                    <Button
                      variant={activeTab === item.path ? "default" : "ghost"}
                      size="sm"
                      className="w-full justify-start"
                    >
                      {item.name}
                    </Button>
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  Ready to work together?
                </p>
                <button 
                  onClick={() => {
                    setActiveTab("/contact");
                    setIsOpen(false);
                  }} 
                  className="w-full"
                >
                  <Button variant="default" className="w-full">
                    Get In Touch
                  </Button>
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
