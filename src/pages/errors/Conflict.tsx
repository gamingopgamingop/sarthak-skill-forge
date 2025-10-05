import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GitMerge } from "lucide-react";
import { Link } from "react-router-dom";

const Conflict = () => (
  <main className="min-h-screen pt-20 flex items-center justify-center bg-orange-50">
    <div className="max-w-2xl mx-auto px-6 text-center">
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Card className="p-12">
          <motion.div className="text-8xl font-bold mb-6 text-orange-500" animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <GitMerge className="inline-block h-20 w-20" />
          </motion.div>

          <h1 className="text-3xl font-bold mb-4 text-foreground">Conflict</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            There’s a conflict with the current request. Please check and try again.
          </p>

          <div className="flex justify-center">
            <Link to="/">
              <Button variant="outline" size="lg">
                Back to Home
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  </main>
);

export default Conflict;
