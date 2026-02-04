// @ts-nocheck
// @ts-ignore

import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Github, Linkedin, Mail, Heart, Code, BookOpen } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  const resources = [
    { name: "Python eBooks", href: "#", icon: BookOpen },
    { name: "Urban Jiva Blog", href: "#", icon: Code },
    { name: "GitHub", href: "#", icon: Github },
    { name: "LinkedIn", href: "#", icon: Linkedin }
  ];

  return (
    <footer className="relative border-t border-border/50">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              <span className="gradient-text">Sarthak Bansal</span>
            </h3>
            <p className="text-muted-foreground mb-4 sm:mb-6 max-w-md mx-auto sm:mx-0 text-sm sm:text-base">
              Passionate programmer and tech entrepreneur building innovative solutions 
              through Python, AI, and automation. Sharing knowledge and inspiring others 
              through education and technology.
            </p>
            <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4">
              <Button variant="tech" size="icon" className="rounded-full h-10 w-10 sm:h-12 sm:w-12">
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button variant="tech" size="icon" className="rounded-full h-10 w-10 sm:h-12 sm:w-12">
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button variant="tech" size="icon" className="rounded-full h-10 w-10 sm:h-12 sm:w-12">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
              Navigation
            </h4>
            <ul className="space-y-1 sm:space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors text-sm sm:text-base"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
              Resources
            </h4>
            <ul className="space-y-1 sm:space-y-2">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a 
                    href={resource.href}
                    className="text-muted-foreground hover:text-accent transition-colors flex items-center justify-center sm:justify-start text-sm sm:text-base"
                  >
                    <resource.icon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <Separator className="mb-6 sm:mb-8" />
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 sm:space-y-4 md:space-y-0">
          <div className="flex items-center text-muted-foreground text-xs sm:text-sm text-center">
            <span>© 2024 Sarthak Bansal. Made with</span>
            <Heart className="h-3 w-3 sm:h-4 sm:w-4 mx-1 text-red-500 animate-pulse" />
            <span>and lots of</span>
            <Code className="h-3 w-3 sm:h-4 sm:w-4 ml-1 text-accent" />
          </div>
          
          <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-muted-foreground">
            <a href="#" className="hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 right-10 w-16 h-16 bg-primary/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-10 left-10 w-20 h-20 bg-secondary/10 rounded-full blur-xl animate-float" style={{ animationDelay: "1s" }} />
      </div>
    </footer>
  );
};

export default Footer;