import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimpleBar from 'simplebar-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send, 
  X, 
  Minimize2, 
  Maximize2,
  Bot,
  User
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm Sarthak's AI assistant. I can help you learn about his skills, projects, and experience. What would you like to know?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const websiteInfo = {
    skills: "React, TypeScript, Python, Django, FastAPI, AWS, Docker, AI/ML",
    experience: "5+ years in full-stack development",
    projects: "100+ successful projects including AI automation, e-commerce platforms, and mobile apps",
    specialties: "Frontend development, Backend APIs, Cloud infrastructure, AI integration",
    contact: "Available for freelance projects and collaborations",
    blog: "Regular posts about web development, AI, and tech insights"
  };

  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("skill") || lowerInput.includes("technology") || lowerInput.includes("tech")) {
      return `Sarthak is proficient in ${websiteInfo.skills}. He has ${websiteInfo.experience} with expertise in ${websiteInfo.specialties}. Would you like to know more about any specific technology?`;
    }
    
    if (lowerInput.includes("project") || lowerInput.includes("work") || lowerInput.includes("portfolio")) {
      return `Sarthak has completed ${websiteInfo.projects}. His portfolio includes AI automation tools, e-commerce platforms, mobile applications, and cloud-based solutions. You can check out his projects page for detailed case studies!`;
    }
    
    if (lowerInput.includes("experience") || lowerInput.includes("background")) {
      return `Sarthak has ${websiteInfo.experience} and specializes in ${websiteInfo.specialties}. He's passionate about creating innovative solutions and staying updated with the latest technologies.`;
    }
    
    if (lowerInput.includes("contact") || lowerInput.includes("hire") || lowerInput.includes("freelance")) {
      return `${websiteInfo.contact}. You can reach out through the contact page or connect via LinkedIn. Sarthak is always excited to discuss new opportunities!`;
    }
    
    if (lowerInput.includes("blog") || lowerInput.includes("article") || lowerInput.includes("post")) {
      return `Sarthak ${websiteInfo.blog}. You can find his latest articles on the blog page covering topics like React best practices, Python tips, and AI implementations.`;
    }
    
    if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
      return "Hello! Nice to meet you! I'm here to help you learn more about Sarthak's work and expertise. What specific area interests you most?";
    }
    
    if (lowerInput.includes("help") || lowerInput.includes("what can you do")) {
      return "I can help you with information about Sarthak's skills, projects, experience, and how to get in touch. Just ask me about any of these topics!";
    }
    
    return "That's an interesting question! I'd recommend checking out Sarthak's portfolio sections or feel free to contact him directly for more specific inquiries. Is there anything else about his skills or projects you'd like to know?";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "auto" : "500px"
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96"
          >
            <Card className="backdrop-blur-sm bg-background/95 border border-primary/20 shadow-xl overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-border bg-primary/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-semibold text-sm">AI Assistant</h3>
                      <Badge variant="secondary" className="text-xs">Online</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="h-8 w-8 p-0"
                    >
                      {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              {!isMinimized && (
                <>
                  <SimpleBar style={{ maxHeight: '320px' }} className="p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex gap-2 ${message.isBot ? "justify-start" : "justify-end"}`}
                        >
                          {message.isBot && (
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                              <Bot className="h-3 w-3 text-primary" />
                            </div>
                          )}
                          <div
                            className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                              message.isBot
                                ? "bg-muted text-foreground"
                                : "bg-primary text-primary-foreground"
                            }`}
                          >
                            {message.content}
                          </div>
                          {!message.isBot && (
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="h-3 w-3 text-primary" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                      
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex gap-2 justify-start"
                        >
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <Bot className="h-3 w-3 text-primary" />
                          </div>
                          <div className="bg-muted px-3 py-2 rounded-lg">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                              <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                            </div>
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </SimpleBar>

                  {/* Input */}
                  <div className="p-4 border-t border-border">
                    <div className="flex gap-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask about Sarthak's work..."
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;