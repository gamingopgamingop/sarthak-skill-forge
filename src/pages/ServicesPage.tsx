import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Code, Globe, Bot, Brain, Smartphone, Database, 
  Server, Shield, Palette, Zap, Users, Trophy,
  ArrowRight, CheckCircle, Star, Sparkles
} from "lucide-react";

const ServicesPage = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      id: 0,
      title: "Web Development",
      subtitle: "Modern & Responsive Websites",
      description: "Create stunning, high-performance web applications using cutting-edge technologies like React, TypeScript, and modern frameworks.",
      icon: Globe,
      gradient: "from-blue-500 to-cyan-500",
      features: [
        "Responsive Design",
        "Performance Optimization", 
        "SEO-Friendly",
        "Modern Frameworks",
        "Cross-Browser Compatible",
        "Mobile-First Approach"
      ],
      technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vite"],
      price: "Starting at $2,000",
      timeline: "2-4 weeks"
    },
    {
      id: 1,
      title: "AI & Automation",
      subtitle: "Intelligent Solutions",
      description: "Develop AI-powered applications, chatbots, and automation tools that streamline processes and enhance user experiences.",
      icon: Bot,
      gradient: "from-purple-500 to-pink-500",
      features: [
        "Custom AI Models",
        "Process Automation",
        "Intelligent Chatbots",
        "Machine Learning",
        "Data Analysis",
        "Workflow Optimization"
      ],
      technologies: ["Python", "TensorFlow", "OpenAI", "LangChain", "FastAPI"],
      price: "Starting at $3,500",
      timeline: "3-6 weeks"
    },
    {
      id: 2,
      title: "Mobile Development",
      subtitle: "Cross-Platform Apps",
      description: "Build beautiful, native-quality mobile applications that work seamlessly across iOS and Android platforms.",
      icon: Smartphone,
      gradient: "from-green-500 to-emerald-500",
      features: [
        "Cross-Platform",
        "Native Performance",
        "Offline Capability",
        "Push Notifications",
        "App Store Ready",
        "Backend Integration"
      ],
      technologies: ["React Native", "Flutter", "TypeScript", "Firebase"],
      price: "Starting at $4,000",
      timeline: "4-8 weeks"
    },
    {
      id: 3,
      title: "Backend Development",
      subtitle: "Scalable Server Solutions",
      description: "Design and implement robust backend systems, APIs, and databases that scale with your business needs.",
      icon: Server,
      gradient: "from-orange-500 to-red-500",
      features: [
        "RESTful APIs",
        "Database Design",
        "Cloud Integration",
        "Security Implementation",
        "Performance Optimization",
        "Microservices Architecture"
      ],
      technologies: ["Node.js", "Python", "PostgreSQL", "MongoDB", "AWS"],
      price: "Starting at $2,500",
      timeline: "2-5 weeks"
    },
    {
      id: 4,
      title: "Cybersecurity",
      subtitle: "Advanced Protection",
      description: "Implement comprehensive security measures, penetration testing, and vulnerability assessments to protect your digital assets.",
      icon: Shield,
      gradient: "from-red-500 to-pink-500",
      features: [
        "Penetration Testing",
        "Vulnerability Assessment",
        "Security Audits",
        "Compliance Solutions",
        "Incident Response",
        "Security Training"
      ],
      technologies: ["Python", "Kali Linux", "OWASP", "Security Tools"],
      price: "Starting at $1,500",
      timeline: "1-3 weeks"
    },
    {
      id: 5,
      title: "Consulting",
      subtitle: "Expert Technical Guidance",
      description: "Get expert advice on technology decisions, architecture planning, and strategic digital transformation.",
      icon: Users,
      gradient: "from-teal-500 to-blue-500",
      features: [
        "Technical Strategy",
        "Architecture Review",
        "Code Audits",
        "Team Training",
        "Technology Selection",
        "Performance Analysis"
      ],
      technologies: ["Various", "Best Practices", "Industry Standards"],
      price: "Starting at $150/hour",
      timeline: "Flexible"
    }
  ];

  const packages = [
    {
      name: "Starter",
      price: "$999",
      description: "Perfect for small projects and startups",
      features: [
        "Single Page Application",
        "Responsive Design",
        "Basic SEO",
        "1 Month Support",
        "Source Code"
      ],
      gradient: "from-blue-500 to-purple-500",
      popular: false
    },
    {
      name: "Professional",
      price: "$2,999",
      description: "Ideal for growing businesses",
      features: [
        "Multi-page Application",
        "Advanced Features",
        "Database Integration",
        "3 Months Support",
        "Documentation",
        "Performance Optimization"
      ],
      gradient: "from-purple-500 to-pink-500",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$7,999",
      description: "Complete solution for large organizations",
      features: [
        "Complex Applications",
        "Custom Integrations",
        "Advanced Security",
        "6 Months Support",
        "Training & Documentation",
        "Scalability Planning",
        "Priority Support"
      ],
      gradient: "from-green-500 to-teal-500",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <Sparkles className="mr-2 h-4 w-4" />
              Premium Services
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Transform Your Ideas
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              From concept to deployment, I provide comprehensive technical solutions 
              that drive innovation and deliver exceptional results for your business.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
              Services Offered
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive technical solutions tailored to meet your specific needs and goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <Card 
                key={service.id}
                className={`p-6 card-hover cursor-pointer transition-all duration-300 ${
                  activeService === service.id ? 'ring-2 ring-primary shadow-lg' : ''
                }`}
                onClick={() => setActiveService(service.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-4`}>
                  <service.icon className="h-6 w-6 text-background" />
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-foreground">{service.title}</h3>
                <p className="text-sm text-primary font-medium mb-3">{service.subtitle}</p>
                <p className="text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{service.price}</span>
                  <ArrowRight className={`h-4 w-4 transition-transform ${
                    activeService === service.id ? 'translate-x-1' : ''
                  }`} />
                </div>
              </Card>
            ))}
          </div>

          {/* Service Details */}
          <Card className="p-8 bg-gradient-to-br from-muted/30 to-background border-border/50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${services[activeService].gradient} flex items-center justify-center`}>
                    {React.createElement(services[activeService].icon, { className: "h-5 w-5 text-background" })}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{services[activeService].title}</h3>
                </div>
                
                <p className="text-muted-foreground mb-6">{services[activeService].description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Timeline</h4>
                    <p className="text-muted-foreground">{services[activeService].timeline}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Starting Price</h4>
                    <p className="text-muted-foreground">{services[activeService].price}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {services[activeService].technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="bg-muted/50">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-4">What's Included</h4>
                <div className="space-y-3">
                  {services[activeService].features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
              Service Packages
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect package that fits your project needs and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card 
                key={index}
                className={`p-6 relative overflow-hidden ${
                  pkg.popular ? 'ring-2 ring-primary shadow-xl scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-primary to-secondary text-background px-3 py-1 text-xs font-medium">
                    <Star className="inline mr-1 h-3 w-3" />
                    Most Popular
                  </div>
                )}
                
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${pkg.gradient}`} />
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2 text-foreground">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-foreground mb-2">{pkg.price}</div>
                  <p className="text-muted-foreground text-sm">{pkg.description}</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  {pkg.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className={`w-full bg-gradient-to-r ${pkg.gradient} hover:opacity-90 text-background border-0`}
                  variant={pkg.popular ? "default" : "outline"}
                >
                  Choose {pkg.name}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Card className="p-12 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-border/50">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your project and find the perfect solution for your needs. 
              Free consultation and project estimation available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-background">
                <Zap className="mr-2 h-5 w-5" />
                Start Your Project
              </Button>
              <Button size="lg" variant="outline">
                <Users className="mr-2 h-5 w-5" />
                Free Consultation
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;