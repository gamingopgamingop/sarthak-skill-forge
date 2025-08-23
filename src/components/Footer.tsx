import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              <span className="gradient-text">Sarthak Bansal</span>
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Passionate programmer and tech entrepreneur building innovative solutions 
              through Python, AI, and automation. Sharing knowledge and inspiring others 
              through education and technology.
            </p>
            <div className="flex space-x-4">
              <Button variant="tech" size="icon" className="rounded-full">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="tech" size="icon" className="rounded-full">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="tech" size="icon" className="rounded-full">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a 
                    href={resource.href}
                    className="text-muted-foreground hover:text-accent transition-colors flex items-center"
                  >
                    <resource.icon className="h-4 w-4 mr-2" />
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <Separator className="mb-8" />
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center text-muted-foreground text-sm">
            <span>© 2024 Sarthak Bansal. Made with</span>
            <Heart className="h-4 w-4 mx-1 text-red-500 animate-pulse" />
            <span>and lots of</span>
            <Code className="h-4 w-4 ml-1 text-accent" />
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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