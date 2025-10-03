import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Download } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "gamingopgamingop67+sarthakdev@gmail.com",
      description: "Drop me a line anytime"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 9557324171",
      description: "Call for urgent inquiries"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "India (UTC +5:30)",
      description: "Available for remote work"
    }
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", url: "https://github.com/gamingopgamingop" },
    { icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/sarthak-bansal-01550432b/" },
    { icon: Twitter, label: "Twitter", url: "https://twitter.com/gamingopgamingop" },
    { icon: Mail, label: "Email", url: "gamingopgamingop67+sarthakdev@gmail.com" }
  ];

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="gradient-text">Let's Connect</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Ready to collaborate on innovative projects or discuss opportunities? I'd love to hear from you!
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <Card className="card-hover p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground">
              Send a Message
            </h3>
            
            <form className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Name
                  </label>
                  <Input 
                    placeholder="Your name" 
                    className="bg-muted/10 border-accent/20 focus:border-accent"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Email
                  </label>
                  <Input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="bg-muted/10 border-accent/20 focus:border-accent"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Subject
                </label>
                <Input 
                  placeholder="Project collaboration, job opportunity, etc." 
                  className="bg-muted/10 border-accent/20 focus:border-accent"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Message
                </label>
                <Textarea 
                  placeholder="Tell me about your project or inquiry..." 
                  rows={5}
                  className="bg-muted/10 border-accent/20 focus:border-accent resize-none"
                />
              </div>
              
              <Button variant="hero" size="lg" className="w-full group hover:scale-105 transition-all duration-300 ">
                <Send className="mr-2 group-hover:translate-x-1 transition-transform" />
                Send Message
              </Button>
            </form>
          </Card>
          
          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((info, index) => (
                <Card 
                  key={index} 
                  className="card-hover p-4 sm:p-6 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-br from-primary to-secondary group-hover:scale-110 transition-transform">
                      <info.icon className="h-5 w-5 sm:h-6 sm:w-6 text-background" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-foreground">
                        {info.title}
                      </h4>
                      <p className="text-accent font-medium text-sm sm:text-base">
                        {info.value}
                      </p>
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Social Links */}
            <Card className="card-hover p-4 sm:p-6">
              <h4 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
                Follow Me
              </h4>
              <div className="flex flex-wrap gap-3 sm:space-x-4">
                {socialLinks.map((social, index) => (
                  <Button 
                    key={index}
                    variant="tech" 
                    size="icon" 
                    className="rounded-full group h-10 w-10 sm:h-12 sm:w-12"
                    onClick={() => window.open(social.url, '_blank')}
                  >
                    <social.icon className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                  </Button>
                ))}
              </div>
            </Card>
            
            {/* CTA Card */}
            <Card className="card-hover p-4 sm:p-6 text-center">
              <h4 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                Open to Opportunities
              </h4>
              <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                Actively seeking internships, collaborations, and freelance projects
              </p>
              <Button variant="glow" className="w-full group hover:scale-105 transition-all duration-300 ">
                <Download className="mr-2 group-hover:scale-110 transition-transform" />
                Download Resume
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;