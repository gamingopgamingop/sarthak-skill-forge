// src/pages/ComingSoon.jsx
// @ts-nocheck
// @ts-ignore

import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Clock, Home } from "lucide-react";
import { Link } from "react-router-dom";

const ComingSoon = () => {
  return (
    <main className="min-h-screen pt-20 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="p-12">
            <motion.div
              className="text-6xl font-bold mb-6 text-primary"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            >
              🚧 Coming Soon 🚧
            </motion.div>

            <h1 className="text-3xl font-bold mb-4 text-foreground">
              Something exciting is on the way!
            </h1>

            <p className="text-muted-foreground mb-8 text-lg">
              We're working hard to bring this feature to you. Stay tuned!
            </p>

            <Link to="/">
              <Button variant="tech" size="lg">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    </main>
  );
};

export default ComingSoon;
