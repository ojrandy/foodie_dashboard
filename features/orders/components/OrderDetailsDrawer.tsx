"use client";

import React from "react";
import { useOrdersOperations } from "../hooks/useOrdersOperations";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  X, User, MapPin, Phone, ChefHat, 
  Receipt, Clock, CreditCard, Truck 
} from "lucide-react";

export function OrderDetailsDrawer() {
  const { selectedOrder, setSelectedOrder } = useOrdersOperations();

  if (!selectedOrder) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedOrder(null)}
        className="fixed inset-0 bg-black z-[900]"
      />
      <motion.div 
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-card border-l border-border/40 z-[950] shadow-2xl glass flex flex-col"
      >
        <div className="flex justify-between items-center p-6 border-b border-border/40 shrink-0">
          <div>
            <h3 className="text-lg font-bold text-foreground">Order Details</h3>
            <Badge variant="outline" className="mt-1 bg-primary/10 text-primary border-primary/30 text-[10px]">
              {selectedOrder.id}
            </Badge>
          </div>
          <Button size="icon" variant="ghost" onClick={() => setSelectedOrder(null)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          
          {/* Customer Info */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1">
              <User className="h-3 w-3" /> Customer Information
            </h4>
            <div className="bg-muted/10 p-3 rounded-lg border border-border/40 space-y-2 text-xs">
              <p className="font-bold text-foreground text-sm">{selectedOrder.customerName}</p>
              <p className="text-muted-foreground flex items-center gap-2"><Phone className="h-3 w-3" /> {selectedOrder.phone}</p>
              <p className="text-muted-foreground flex items-center gap-2"><MapPin className="h-3 w-3" /> {selectedOrder.address}, {selectedOrder.region}</p>
            </div>
          </div>

          {/* Order Info */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1">
              <ChefHat className="h-3 w-3" /> Order Information
            </h4>
            <div className="bg-muted/10 p-3 rounded-lg border border-border/40 space-y-2 text-xs">
              <p className="font-bold text-foreground text-sm">{selectedOrder.recipe}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedOrder.ingredients.map(ing => (
                  <Badge key={ing} variant="secondary" className="text-[9px]">{ing}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1">
              <Receipt className="h-3 w-3" /> Cost Breakdown
            </h4>
            <div className="bg-muted/10 p-3 rounded-lg border border-border/40 space-y-2 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{(selectedOrder.totalCost - selectedOrder.deliveryFee - selectedOrder.serviceFee).toLocaleString()} XAF</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery Fee</span>
                <span>{selectedOrder.deliveryFee.toLocaleString()} XAF</span>
              </div>
              <div className="flex justify-between text-muted-foreground border-b border-border/40 pb-2">
                <span>Service Fee</span>
                <span>{selectedOrder.serviceFee.toLocaleString()} XAF</span>
              </div>
              <div className="flex justify-between font-black text-sm text-foreground pt-1">
                <span>Total</span>
                <span>{selectedOrder.totalCost.toLocaleString()} XAF</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-[10px] text-muted-foreground">Payment Status:</span>
                <span className={`font-bold ${selectedOrder.paymentStatus === 'Paid' ? 'text-success' : 'text-warning'}`}>
                  <CreditCard className="inline h-3 w-3 mr-1" /> {selectedOrder.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Operational Timeline */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> Operational Timeline
            </h4>
            <div className="space-y-4 pl-3 border-l-2 border-border/40 relative ml-2">
              {selectedOrder.createdAt && (
                <div className="relative">
                  <span className="absolute -left-[17px] top-1 h-3 w-3 rounded-full bg-primary" />
                  <div className="pl-4">
                    <p className="font-bold text-foreground text-xs">Order Created</p>
                    <p className="text-[10px] text-muted-foreground">{selectedOrder.createdAt}</p>
                  </div>
                </div>
              )}
              {selectedOrder.confirmedAt && (
                <div className="relative">
                  <span className="absolute -left-[17px] top-1 h-3 w-3 rounded-full bg-accent" />
                  <div className="pl-4">
                    <p className="font-bold text-foreground text-xs">Confirmed by System</p>
                    <p className="text-[10px] text-muted-foreground">{selectedOrder.confirmedAt}</p>
                  </div>
                </div>
              )}
              {selectedOrder.preparingAt && (
                <div className="relative">
                  <span className="absolute -left-[17px] top-1 h-3 w-3 rounded-full bg-warning" />
                  <div className="pl-4">
                    <p className="font-bold text-foreground text-xs">Preparation Started</p>
                    <p className="text-[10px] text-muted-foreground">{selectedOrder.preparingAt}</p>
                  </div>
                </div>
              )}
              {selectedOrder.assignedAt && (
                <div className="relative">
                  <span className="absolute -left-[17px] top-1 h-3 w-3 rounded-full bg-purple-500" />
                  <div className="pl-4">
                    <p className="font-bold text-foreground text-xs">Rider Assigned</p>
                    <p className="text-[10px] text-muted-foreground">{selectedOrder.assignedAt} - {selectedOrder.assignedRider}</p>
                  </div>
                </div>
              )}
              {selectedOrder.transitAt && (
                <div className="relative">
                  <span className="absolute -left-[17px] top-1 h-3 w-3 rounded-full bg-sky-500" />
                  <div className="pl-4">
                    <p className="font-bold text-foreground text-xs">In Transit</p>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1"><Truck className="h-3 w-3" /> ETA: {selectedOrder.eta}m</p>
                  </div>
                </div>
              )}
              {selectedOrder.deliveredAt && (
                <div className="relative">
                  <span className="absolute -left-[17px] top-1 h-3 w-3 rounded-full bg-success" />
                  <div className="pl-4">
                    <p className="font-bold text-success text-xs">Delivered</p>
                    <p className="text-[10px] text-success">{selectedOrder.deliveredAt}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
        
        <div className="p-6 border-t border-border/40 shrink-0">
          <Button className="w-full bg-primary hover:bg-primary/90">Contact Customer</Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
