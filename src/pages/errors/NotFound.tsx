// @ts-nocheck
// @ts-ignore

import { useEffect } from "react";
import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
import { Button } from "../../components/ui/button"

import { Card } from "../../components/ui/card";
import { Home, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";
import { Parallax } from 'react-scroll-parallax';

const NotFound = () => {
  const navigate = useNavigate();

  // Keyboard shortcut: press "H" to go Home
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "h") navigate("/");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted pt-20 px-6">
      {/* SEO: prevent search engines from indexing */}
      <SEO title="404 - Page Not Found" noindex />

      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="p-12 shadow-2xl">
            {/* Floating 404 */}
            <motion.div
              className="text-8xl font-bold mb-6"
              animate={{ 
                y: [0, -10, 0],
                background: [
                  "linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)))",
                  "linear-gradient(45deg, hsl(var(--accent)), hsl(var(--secondary)))",
                  "linear-gradient(45deg, hsl(var(--secondary)), hsl(var(--primary)))"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent"
              }}
            >
              404
            </motion.div>

            {/* Optional spot for Lottie/SVG illustration */}
            {/* <div className="mb-8">
              <YourLottie404Animation />
            </div> */}

            <h1 className="text-3xl font-bold mb-4 text-foreground">
              Oops! Page Not Found
            </h1>

            <p className="text-muted-foreground mb-8 text-lg">
              The page you’re looking for seems to have wandered off into the
              digital void. Don’t worry, even the best developers encounter 404s!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="tech" size="lg">
                  <Home className="mr-2 h-5 w-5" />
                  Back to Home
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </Button>
            </div>

            {/* Quick links */}
            <div className="mt-8 pt-8 border-t border-accent/20">
              <p className="text-sm text-muted-foreground mb-4">
                Looking for something specific?
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link to="/projects">
                  <Button variant="ghost" size="sm">Projects</Button>
                </Link>
                <Link to="/skills">
                  <Button variant="ghost" size="sm">Skills</Button>
                </Link>
                <Link to="/blog">
                  <Button variant="ghost" size="sm">Blog</Button>
                </Link>
                <Link to="/contact">
                  <Button variant="ghost" size="sm">Contact</Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </main>
  );
};

export default NotFound;
