import React from 'react';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, Users, Trophy, Heart } from "lucide-react";

const TestimonialsPage = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Product Manager",
      company: "TechCorp Inc.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332e234?w=150&h=150&fit=crop&crop=face",
      content: "Exceptional work quality and attention to detail. The AI automation project exceeded all our expectations and significantly improved our workflow efficiency.",
      rating: 5,
      project: "AI Automation Platform",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CTO",
      company: "StartupHub",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "Brilliant technical skills combined with excellent communication. The EdTech platform was delivered on time and has helped thousands of students learn programming.",
      rating: 5,
      project: "EdTech Learning Platform",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Founder",
      company: "Creative Studios",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "Outstanding creativity and technical expertise. The web development project transformed our online presence and increased conversions by 300%.",
      rating: 5,
      project: "E-commerce Website",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      name: "David Kumar",
      role: "Engineering Manager",
      company: "DevSolutions",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "Professional approach and innovative solutions. The security tools project enhanced our cybersecurity posture significantly.",
      rating: 5,
      project: "Security Assessment Tools",
      gradient: "from-red-500 to-orange-500"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "VP of Technology",
      company: "InnovateLab",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      content: "Remarkable problem-solving skills and dedication. The mobile app suite exceeded user expectations and achieved top ratings on app stores.",
      rating: 5,
      project: "Mobile App Development",
      gradient: "from-teal-500 to-blue-500"
    },
    {
      id: 6,
      name: "Alex Morgan",
      role: "Head of Innovation",
      company: "FutureTech",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      content: "Visionary thinking and flawless execution. The award-winning project showcased cutting-edge technology and won multiple hackathons.",
      rating: 5,
      project: "AI Innovation Project",
      gradient: "from-yellow-500 to-amber-500"
    }
  ];

  const stats = [
    { icon: Users, label: "Happy Clients", value: "50+", gradient: "from-blue-500 to-purple-500" },
    { icon: Trophy, label: "Awards Won", value: "15+", gradient: "from-yellow-500 to-orange-500" },
    { icon: Star, label: "5-Star Reviews", value: "98%", gradient: "from-green-500 to-emerald-500" },
    { icon: Heart, label: "Satisfaction Rate", value: "100%", gradient: "from-pink-500 to-rose-500" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <Quote className="mr-2 h-4 w-4" />
              Client Testimonials
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              What Clients Say
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover why clients choose to work with me and how our collaborations 
              have transformed their businesses and exceeded expectations.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 card-hover">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.gradient} flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="h-6 w-6 text-background" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
              Success Stories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real feedback from real clients who have experienced the impact of quality work and dedication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.id} 
                className="p-6 card-hover relative overflow-hidden group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${testimonial.gradient} opacity-10 rounded-bl-full`} />
                
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="h-8 w-8" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Project Badge */}
                <Badge 
                  variant="secondary" 
                  className={`mb-4 bg-gradient-to-r ${testimonial.gradient} text-background border-0`}
                >
                  {testimonial.project}
                </Badge>

                {/* Client Info */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback className={`bg-gradient-to-br ${testimonial.gradient} text-background`}>
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground/80">{testimonial.company}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">
            Ready to Join Them?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your project today and become the next success story. 
            Let's create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Card className="p-4 bg-gradient-to-r from-primary to-secondary text-background hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-semibold mb-1">Get Started</h3>
              <p className="text-sm opacity-90">Begin your project today</p>
            </Card>
            <Card className="p-4 bg-gradient-to-r from-secondary to-accent text-background hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-semibold mb-1">Free Consultation</h3>
              <p className="text-sm opacity-90">Discuss your ideas</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;