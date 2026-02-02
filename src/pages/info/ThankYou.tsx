// @ts-nocheck
// @ts-ignore

// This file is a part of the Convex project.
// It is not part of the Convex codebase and is not subject to the Convex license.
// You may use this file for any purpose, including but not limited to:
// - Demonstrating how to use Convex in a real-world application
// - Building a custom UI for Convex
// - Integrating Convex with other technologies
// - Experimenting with Convex features
// - Sharing this file with others
// - Any other purpose you can think of

import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { CheckCircle, Home } from "lucide-react";
import { Link } from "react-router-dom";

const ThankYou = () => {
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
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <CheckCircle className="h-16 w-16 text-green-500" />
            </motion.div>

            <h1 className="text-3xl font-bold mb-4 text-foreground">
              Thank You!
            </h1>

            <p className="text-muted-foreground mb-8 text-lg">
              Your submission has been received successfully. We’ll get back to you soon.
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

export default ThankYou;
