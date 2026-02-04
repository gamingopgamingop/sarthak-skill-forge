// @ts-nocheck
// @ts-ignore



import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { X, Sparkles } from "lucide-react";

const AIGreeting = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  useEffect(() => {
    // Check if greeting has been shown in this session
    const greetingShown = sessionStorage.getItem('ai-greeting-shown');
    
    if (!greetingShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHasBeenShown(true);
        sessionStorage.setItem('ai-greeting-shown', 'true');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const greetings = [
    "👋 Welcome to Sarthak's digital space!",
    "🚀 Ready to explore cutting-edge tech?",
    "💡 Discover innovative solutions here!",
    "⚡ Let's build something amazing together!"
  ];

  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 0.5 }}
          className="fixed top-24 right-4 z-50 max-w-sm"
        >
          <Card className="p-4 backdrop-blur-sm bg-background/95 border border-primary/20 shadow-lg">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground mb-1">AI Assistant</p>
                  <p className="text-xs text-muted-foreground">
                    {randomGreeting}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Need help? Try the chatbot below! 👇
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIGreeting;