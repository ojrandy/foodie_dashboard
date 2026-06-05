"use client";

import { X, MapPin } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Order } from "../types";

interface OrderDrawerProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
  onAssignRider: (orderId: string, rider: string) => void;
}

const RIDERS = ["Unassigned", "Samuel E.", "Alain N.", "Elvis T.", "Marc O.", "Fritz B."];

export function OrderDrawer({ order, open, onClose, onAssignRider }: OrderDrawerProps) {
  return (
    <AnimatePresence>
      {open && order && (
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
            className="fixed top-0 right-0 h-full w-full max-w-md bg-card border-l border-border/40 z-[950] p-6 shadow-2xl glass overflow-y-auto flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center border-b border-border/40 pb-4 mb-5">
                <h3 className="text-lg font-bold text-foreground">Order Dispatch Panel</h3>
                <Button size="icon" variant="ghost" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-6 text-xs">
                <div>
                  <Badge variant="outline" className="border-accent/40 bg-accent/5 text-accent font-semibold mb-2">
                    Order ID: {order.id}
                  </Badge>
                  <h2 className="text-xl font-extrabold tracking-tight text-foreground">{order.customerName}</h2>
                  <p className="text-muted-foreground mt-1 flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-accent" /> {order.location}
                  </p>
                </div>
                <div className="p-4 bg-muted/20 border border-border/40 rounded-xl glass space-y-2">
                  <h4 className="font-bold text-foreground">Items Checklist</h4>
                  <p className="text-muted-foreground">{order.itemsDescription}</p>
                  <div className="pt-2 flex justify-between font-extrabold text-foreground text-sm border-t border-border/20">
                    <span>Total Value</span>
                    <span className="text-accent">{order.totalCost.toLocaleString()} XAF</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-bold text-muted-foreground uppercase tracking-wider text-[10px]">Assign Dispatch Rider</label>
                  <select
                    value={order.assignedRider || "Unassigned"}
                    onChange={(e) => onAssignRider(order.id, e.target.value)}
                    className="w-full bg-muted/30 border border-border/40 rounded-lg p-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 cursor-pointer"
                  >
                    {RIDERS.map((rider) => (
                      <option key={rider} value={rider} className="bg-card">{rider}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-foreground uppercase tracking-wider text-[10px]">Operational Timeline</h4>
                  <div className="space-y-3 pl-2.5 border-l-2 border-accent/20">
                    {[
                      { title: "Order Placed", detail: order.createdAt, active: true },
                      { title: "Preparation Chamber", detail: "Kitchen allocation dispatch", active: order.status !== "Pending" },
                      { title: "Active Logistics Transit", detail: `Rider assigned: ${order.assignedRider || "None"}`, active: order.status === "Transit" || order.status === "Delivered" },
                    ].map((step, i) => (
                      <div key={i} className="relative">
                        <span className={`absolute -left-[15px] top-0 h-2 w-2 rounded-full ${step.active ? "bg-accent" : "bg-muted"}`} />
                        <div className="pl-3.5">
                          <h5 className={`font-bold ${step.active ? "text-foreground" : "text-muted-foreground"}`}>{step.title}</h5>
                          <span className="text-[10px] text-muted-foreground">{step.detail}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-border/40 pt-4 mt-6 flex gap-3">
              <Button className="flex-1" onClick={() => {
                toast.success(`Force updated dispatch for order #${order.id}`);
                onClose();
              }}>
                Commit Dispatch
              </Button>
              <Button variant="outline" onClick={onClose}>Close</Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

