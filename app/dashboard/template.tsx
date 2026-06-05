"use client";

import { motion } from "framer-motion";

export default function DashboardTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99, y: 5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex-1 w-full h-full"
    >
      {children}
    </motion.div>
  );
}
