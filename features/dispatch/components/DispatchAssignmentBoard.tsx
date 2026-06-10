import React from "react";

import { useDispatchOperations, DispatchOrder } from "../hooks/useDispatchOperations";
import { motion } from "framer-motion";
import { MapPin, User, AlertCircle } from "lucide-react";

const COLUMNS: Array<{ id: DispatchOrder["status"]; label: string; color: string }> = [
  { id: "Waiting Assignment", label: "Waiting", color: "bg-destructive" },
  { id: "Assigned", label: "Assigned", color: "bg-warning" },
  { id: "Picked Up", label: "Picked Up", color: "bg-primary" },
  { id: "In Transit", label: "In Transit", color: "bg-sky-500" },
  { id: "Delivered", label: "Delivered", color: "bg-success" },
];

export function DispatchAssignmentBoard() {
  const { orders, moveOrder } = useDispatchOperations();

  const handleDragStart = (e: React.DragEvent, orderId: string) => {
    e.dataTransfer.setData("orderId", orderId);
  };

  const handleDrop = (e: React.DragEvent, status: DispatchOrder["status"]) => {
    const orderId = e.dataTransfer.getData("orderId");
    moveOrder(orderId, status);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg flex items-center gap-2">
        <MapPin className="h-5 w-5 text-accent" /> Dispatch Assignment Board
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {COLUMNS.map(col => (
          <div 
            key={col.id} 
            className="flex flex-col min-w-[250px] bg-muted/20 border border-border/40 rounded-xl p-3"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, col.id)}
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-xs uppercase tracking-wider">{col.label}</h4>
              <span className="text-[10px] bg-background px-2 py-1 rounded-full font-bold">
                {orders.filter(o => o.status === col.id).length}
              </span>
            </div>
            <div className="flex-1 space-y-3 min-h-[400px]">
              {orders.filter(o => o.status === col.id).map(order => (
                <motion.div
                  layoutId={order.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent, order.id)}
                  key={order.id}
                  className="bg-card border border-border/40 p-3 rounded-lg shadow-sm cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-primary">{order.id}</span>
                    {order.status === "Waiting Assignment" && (
                      <AlertCircle className="h-3 w-3 text-destructive animate-pulse" />
                    )}
                  </div>
                  <p className="font-bold text-sm text-foreground">{order.customerName}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {order.location}
                  </p>
                  {order.riderId && (
                    <div className="mt-3 pt-2 border-t border-border/40 flex items-center gap-2 text-[10px] font-bold">
                      <User className="h-3 w-3 text-muted-foreground" /> {order.riderId}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
