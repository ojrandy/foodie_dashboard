"use client";

import { ShoppingCart, MapPin, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Order } from "../types";

interface OrderKanbanProps {
  columns: Order["status"][];
  orders: Order[];
  onMoveStatus: (id: string, current: Order["status"], dir: "next" | "prev") => void;
  onSelectOrder: (order: Order) => void;
}

export function OrderKanban({
  columns,
  orders,
  onMoveStatus,
  onSelectOrder,
}: OrderKanbanProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
      {columns.map((col) => {
        const colOrders = orders.filter((o) => o.status === col);
        return (
          <div
            key={col}
            className="min-w-[220px] flex flex-col gap-4 bg-muted/10 p-3.5 border border-border/20 rounded-2xl glass"
          >
            <div className="flex justify-between items-center pb-2 border-b border-border/30">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-bold text-foreground">{col}</h4>
                <Badge
                  variant="outline"
                  className="text-[9px] px-1.5 py-0 bg-accent/5 text-accent border-accent/20"
                >
                  {colOrders.length}
                </Badge>
              </div>
            </div>
            <div className="flex flex-col gap-3 min-h-[350px] overflow-y-auto">
              <AnimatePresence>
                {colOrders.map((o) => (
                  <motion.div
                    key={o.id}
                    layoutId={`order-card-${o.id}`}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => onSelectOrder(o)}
                    className="p-3.5 rounded-xl border border-border/40 bg-card glass shadow-sm cursor-pointer space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-accent">#{o.id}</span>
                        {o.riskFactor === "High" && (
                          <Badge className="bg-destructive/10 text-destructive border border-destructive/20 text-[8px] hover:bg-destructive/10">
                            High Risk
                          </Badge>
                        )}
                      </div>
                      <h5 className="text-xs font-extrabold text-foreground mt-1.5">
                        {o.customerName}
                      </h5>
                      <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" /> {o.location}
                      </p>
                      <p className="text-[10px] text-foreground font-semibold mt-2 bg-muted/40 p-1.5 rounded border border-border/20 line-clamp-2">
                        {o.itemsDescription}
                      </p>
                    </div>
                    <div className="pt-2.5 border-t border-border/20 space-y-2.5">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-muted-foreground font-medium">ETA:</span>
                        <span className="font-extrabold text-foreground">
                          {o.eta > 0 ? `${o.eta} Mins` : "Delivered"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-muted-foreground font-medium">Rider:</span>
                        <span className="font-extrabold text-foreground text-[9px]">
                          {o.assignedRider || "Unassigned"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-1 gap-2">
                        <span className="text-xs font-black text-foreground">
                          {o.totalCost.toLocaleString()} XAF
                        </span>
                        {col !== "Delivered" && (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6 rounded-full bg-accent/15 text-accent hover:bg-accent hover:text-accent-foreground"
                            onClick={(e) => {
                              e.stopPropagation();
                              onMoveStatus(o.id, col, "next");
                            }}
                          >
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {colOrders.length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <ShoppingCart className="h-8 w-8 text-muted-foreground/30 mb-2" />
                  <span className="text-[10px] text-muted-foreground">No orders in this pool</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
