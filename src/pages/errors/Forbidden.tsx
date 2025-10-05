import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <main className="min-h-screen pt-20 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Card className="p-12">
            <motion.div className="text-8xl font-bold mb-6 text-yellow-600" animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              403
            </motion.div>

            <h1 className="text-3xl font-bold mb-4 text-foreground">Access Forbidden</h1>

            <p className="text-muted-foreground mb-8 text-lg">
              You don’t have permission to access this page.
            </p>

            <div className="flex justify-center">
              <Link to="/">
                <Button variant="outline" size="lg">
                  <Home className="mr-2 h-5 w-5" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </main>
  );
};

export default Forbidden;
