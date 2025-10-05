import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentRequired = () => (
  <main className="min-h-screen pt-20 flex items-center justify-center bg-yellow-50">
    <div className="max-w-2xl mx-auto px-6 text-center">
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Card className="p-12">
          <motion.div className="text-8xl font-bold mb-6 text-yellow-500" animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <CreditCard className="inline-block h-20 w-20" />
          </motion.div>

          <h1 className="text-3xl font-bold mb-4 text-foreground">Payment Required</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            This page requires payment to access.
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

export default PaymentRequired;
