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
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="animate-slide-up">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold mb-4 sm:mb-6">
            <span className="gradient-text">Sarthak Bansal</span>
          </h1>
          
          <div className="text-base sm:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 space-y-1 sm:space-y-2">
            <p className="animate-slide-up px-2" style={{ animationDelay: "0.2s" }}>
              Python Expert • AI Developer • eBook Author
            </p>
            <p className="animate-slide-up px-2" style={{ animationDelay: "0.4s" }}>
              Second-Year BCA Student • Tech Entrepreneur • Blogger
            </p>
          </div>
          
          <p className="text-sm sm:text-lg lg:text-xl text-foreground/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up px-4 font-medium" style={{ animationDelay: "0.6s" }}>
            Building the Future of Tech: Turning Ideas into Automated, Real-World Solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16 animate-slide-up px-4" style={{ animationDelay: "0.8s" }}>
          <a href="https://github.com/gamingopgamingop" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
            <Button variant="hero" size="lg" className="group w-full sm:w-auto shadow-lg shadow-primary/30">
              <FileText className="mr-2 group-hover:rotate-12 transition-transform" />
              View My Work
            </Button>
            </a>
            <a href="mailto:gamingopgamingop67+sarthakdev@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
            <Button variant="outline" size="lg" className="group w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Mail className="mr-2 group-hover:scale-110 transition-transform" />
              Get In Touch
            </Button>
            </a>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-4 sm:space-x-6 mb-8 sm:mb-12 animate-slide-up" style={{ animationDelay: "1s" }}>   
            <a href="https://github.com/gamingopgamingop" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10 sm:h-12 sm:w-12 border-primary/50 hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all">
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/sarthak-bansal-01550432b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10 sm:h-12 sm:w-12 border-primary/50 hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all">
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </a>
            <a href="mailto:gamingopgamingop67+sarthakdev@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10 sm:h-12 sm:w-12 border-primary/50 hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </a>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 sm:h-8 sm:w-8 text-accent animate-glow" />
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-4 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-primary/20 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-16 h-16 sm:w-32 sm:h-32 bg-secondary/20 rounded-full blur-xl animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 right-8 sm:right-20 w-10 h-10 sm:w-16 sm:h-16 bg-accent/30 rounded-full blur-xl animate-float" style={{ animationDelay: "2s" }} />
    </section>
  );
};

export default Hero;