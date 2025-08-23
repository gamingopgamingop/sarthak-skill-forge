import { Button } from "@/components/ui/button";
import { ChevronDown, Github, Linkedin, Mail, FileText } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Tech Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Sarthak Bansal</span>
          </h1>
          
          <div className="text-xl md:text-2xl text-muted-foreground mb-8 space-y-2">
            <p className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              First-Year BCA Student • Passionate Programmer • Tech Entrepreneur
            </p>
            <p className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
              Python Expert • AI Developer • eBook Author • Blogger
            </p>
          </div>
          
          <p className="text-lg md:text-xl text-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "0.6s" }}>
            Turning creative ideas into real-world solutions through code, automation, and innovation. 
            Building the future one project at a time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up" style={{ animationDelay: "0.8s" }}>
            <Button variant="hero" size="lg" className="group">
              <FileText className="mr-2 group-hover:rotate-12 transition-transform" />
              View My Work
            </Button>
            <Button variant="glow" size="lg" className="group">
              <Mail className="mr-2 group-hover:scale-110 transition-transform" />
              Get In Touch
            </Button>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-12 animate-slide-up" style={{ animationDelay: "1s" }}>
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
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-accent animate-glow" />
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-accent/30 rounded-full blur-xl animate-float" style={{ animationDelay: "2s" }} />
    </section>
  );
};

export default Hero;