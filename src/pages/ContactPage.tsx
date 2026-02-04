// @ts-ignore
// @ts-nocheck
// @ts-expect-error

import Contact from "../components/Contact";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Mail, MessageSquare, Phone, MapPin, Clock, Send } from "lucide-react";

const ContactPage = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "Send me an email for project inquiries",
      value: "gamingopgamingop67+sarthakdev@gmail.com",
      action: "mailto:gamingopgamingop67+sarthakdev@gmail.com"
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      description: "Quick chat for urgent matters",
      value: "+91 9557324171",
      action: "https://wa.me/919557324171"
    },
    {
      icon: Phone,
      title: "Phone",
      description: "Call for direct consultation",
      value: "+91 9557324171",
      action: "tel:+919557324171"
    }
  ];

  const workingHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM IST" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM IST" },
    { day: "Sunday", hours: "Closed" }
  ];

  const services = [
    "Python Development",
    "Web Application Development",
    "AI Chatbot Development",
    "Database Design & Optimization",
    "Technical Writing & Documentation",
    "Automation Solutions",
    "Educational Content Creation",
    "Technical Consultation"
  ];

  return (
    <main className="min-h-screen pt-20">
      <SEO 
        title="Contact Sarthak Bansal | Hire Python Developer & AI Specialist"
        description="Get in touch with Sarthak Bansal for Python development, AI automation, web applications, and technical consulting. Available for freelance projects and collaborations. Response within 24 hours."
        keywords="contact Python developer, hire AI developer, freelance web developer, Python consultation, AI chatbot development services, automation expert contact"
      />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Get In Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to start your next project? Let's discuss how I can help bring your ideas to life
          </p>
        </motion.div>

        {/* Contact Methods */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="card-hover p-6 text-center h-full">
                <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-accent mx-auto mb-4 w-fit">
                  <method.icon className="h-6 w-6 text-background" />
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-foreground">{method.title}</h3>
                <p className="text-muted-foreground mb-4">{method.description}</p>
                <p className="font-medium text-foreground mb-4">{method.value}</p>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(method.action, '_blank')}
                  className="w-full"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Contact
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Working Hours & Services */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="p-8">
            <div className="flex items-center mb-6">
              <Clock className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-foreground">Working Hours</h2>
            </div>
            <div className="space-y-4">
              {workingHours.map((schedule, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-accent/10 last:border-b-0">
                  <span className="font-medium text-foreground">{schedule.day}</span>
                  <span className="text-muted-foreground">{schedule.hours}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 inline mr-1" />
                Based in India (UTC +5:30)
              </p>
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Services Offered</h2>
            <div className="grid grid-cols-1 gap-3">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="flex items-center p-3 rounded-lg bg-muted/5 border border-accent/10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
                  <span className="text-foreground">{service}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Response Time */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border border-accent/20 max-w-md mx-auto">
            <h3 className="text-lg font-bold mb-2 text-foreground">Quick Response</h3>
            <p className="text-muted-foreground">
              I typically respond to all inquiries within 24 hours during working days.
            </p>
          </Card>
        </motion.div>

        {/* Contact Component */}
        <Contact />
      </div>
    </main>
  );
};

export default ContactPage;