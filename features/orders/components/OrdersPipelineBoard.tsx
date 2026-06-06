"use client";

import React from "react";
import { useOrdersOperations, Order } from "../hooks/useOrdersOperations";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OrdersPipelineBoard() {
  const { orders, updateOrderStatus, setSelectedOrder } = useOrdersOperations();

  const COLUMNS: Order["status"][] = ["Pending", "Confirmed", "Preparing", "Assigned", "Transit", "Delivered"];

  const getNextStatus = (current: Order["status"]): Order["status"] | null => {
    const idx = COLUMNS.indexOf(current);
    if (idx >= 0 && idx < COLUMNS.length - 1) return COLUMNS[idx + 1];
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h2 className="text-xl font-bold text-foreground">Pipeline Board</h2>
          <p className="text-xs text-muted-foreground">Kanban-style workflow for live logistical routing.</p>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
        {COLUMNS.map(col => {
          const colOrders = orders.filter(o => o.status === col);

          return (
            <div key={col} className="min-w-[260px] flex-shrink-0 flex flex-col gap-3 bg-muted/10 p-3 rounded-2xl border border-border/40 glass">
              <div className="flex justify-between items-center pb-2 border-b border-border/30">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">{col}</h4>
                <Badge variant="outline" className="text-[10px] bg-background">{colOrders.length}</Badge>
              </div>

              <div className="flex flex-col gap-3 min-h-[400px] overflow-y-auto pr-1">
                {colOrders.map(o => (
                  <motion.div
                    key={o.id}
                    layoutId={`board-card-${o.id}`}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedOrder(o)}
                    className="p-3 rounded-xl border border-border/40 bg-card shadow-sm cursor-pointer space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold text-primary">{o.id}</span>
                      <span className="text-xs font-black text-foreground">{o.totalCost.toLocaleString()} XAF</span>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-bold text-foreground">{o.customerName}</h5>
                      <p className="text-[10px] text-muted-foreground line-clamp-1">{o.recipe}</p>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground bg-muted/40 p-1.5 rounded">
                      <MapPin className="h-3 w-3" /> {o.region}
                    </div>

                    <div className="pt-2 border-t border-border/20 flex justify-between items-center">
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="h-3 w-3" /> ETA: {o.eta}m
                      </div>
                      
                      {getNextStatus(o.status) && (
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-6 w-6 rounded-full hover:bg-primary/20 text-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateOrderStatus(o.id, getNextStatus(o.status)!);
                          }}
                        >
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {colOrders.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center opacity-50">
                    <span className="text-[10px] text-muted-foreground uppercase">Empty</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
