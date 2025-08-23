import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "sarthak@skillforge.dev",
      description: "Drop me a line anytime"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 9876543210",
      description: "Call for urgent inquiries"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "India",
      description: "Available for remote work"
    }
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", url: "#" },
    { icon: Linkedin, label: "LinkedIn", url: "#" },
    { icon: Twitter, label: "Twitter", url: "#" },
    { icon: Mail, label: "Email", url: "#" }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Let's Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to collaborate on innovative projects or discuss opportunities? I'd love to hear from you!
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="card-hover p-8">
            <h3 className="text-2xl font-bold mb-6 text-foreground">
              Send a Message
            </h3>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
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
                  rows={6}
                  className="bg-muted/10 border-accent/20 focus:border-accent resize-none"
                />
              </div>
              
              <Button variant="hero" size="lg" className="w-full group">
                <Send className="mr-2 group-hover:translate-x-1 transition-transform" />
                Send Message
              </Button>
            </form>
          </Card>
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card 
                  key={index} 
                  className="card-hover p-6 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-secondary group-hover:scale-110 transition-transform">
                      <info.icon className="h-6 w-6 text-background" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">
                        {info.title}
                      </h4>
                      <p className="text-accent font-medium">
                        {info.value}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Social Links */}
            <Card className="card-hover p-6">
              <h4 className="text-lg font-semibold text-foreground mb-4">
                Follow Me
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <Button 
                    key={index}
                    variant="tech" 
                    size="icon" 
                    className="rounded-full group"
                  >
                    <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </Button>
                ))}
              </div>
            </Card>
            
            {/* CTA Card */}
            <Card className="card-hover p-6 text-center">
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Open to Opportunities
              </h4>
              <p className="text-muted-foreground mb-4">
                Actively seeking internships, collaborations, and freelance projects
              </p>
              <Button variant="glow" className="w-full">
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