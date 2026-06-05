"use client";

import { X, User, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Rider } from "../types";

interface DispatchRiderDrawerProps {
  rider: Rider | null;
  open: boolean;
  onClose: () => void;
}

export function DispatchRiderDrawer({ rider, open, onClose }: DispatchRiderDrawerProps) {
  return (
    <AnimatePresence>
      {open && rider && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-[900]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-card border-l border-border/40 z-[950] p-6 shadow-2xl glass overflow-y-auto"
          >
            <div className="flex justify-between items-center border-b border-border/40 pb-4 mb-5">
              <h3 className="text-lg font-bold text-foreground">Rider Profile</h3>
              <Button size="icon" variant="ghost" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-4 p-4 bg-accent/5 border border-accent/20 rounded-xl">
                <div className="h-14 w-14 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                  <User className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-foreground">{rider.name}</h3>
                  <Badge
                    className={
                      rider.status === "Active"
                        ? "bg-success/10 text-success border border-success/20 mt-1 hover:bg-success/10"
                        : "bg-muted text-muted-foreground mt-1"
                    }
                  >
                    {rider.status}
                  </Badge>
                </div>
              </div>
              {[
                { label: "Zone Coverage", val: rider.zone },
                { label: "Deliveries Today", val: `${rider.deliveriesCompleted} orders` },
                { label: "Avg ETA", val: `${rider.avgEta} minutes` },
                { label: "Customer Rating", val: `${rider.rating} / 5.0 ⭐` },
                { label: "Current Order", val: rider.currentOrder || "No Active Delivery" },
              ].map(({ label, val }) => (
                <div
                  key={label}
                  className="flex justify-between items-center p-3 bg-muted/20 rounded-lg border border-border/20"
                >
                  <span className="text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">
                    {label}
                  </span>
                  <span className="font-bold text-foreground">{val}</span>
                </div>
              ))}
              <Button
                className="w-full mt-4 gap-2"
                onClick={() => {
                  toast.success(`New route assigned to ${rider.name}`);
                  onClose();
                }}
              >
                <Zap className="h-4 w-4" /> Assign New Route
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
