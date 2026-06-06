"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Smartphone } from "lucide-react";

export function PaymentVerificationCenter() {
  const transactions = [
    { id: "TXN-001", order: "ORD-9421", method: "MTN Mobile Money", amount: 12500, status: "Paid", time: "10:15 AM" },
    { id: "TXN-002", order: "ORD-9422", method: "Orange Money", amount: 15000, status: "Paid", time: "12:30 PM" },
    { id: "TXN-003", order: "ORD-9423", method: "Credit Card (Stripe)", amount: 8500, status: "Pending", time: "1:15 PM" },
    { id: "TXN-004", order: "ORD-9425", method: "MTN Mobile Money", amount: 22000, status: "Failed", time: "9:00 AM" },
  ];

  return (
    <Card className="glass border-border/40 h-full">
      <CardHeader>
        <CardTitle className="text-base font-bold flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-emerald-500" /> Payment Verification Center
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20 text-center">
            <p className="text-[10px] uppercase font-bold text-emerald-500">Paid Today</p>
            <p className="text-lg font-black text-emerald-500 mt-1">2.4M</p>
          </div>
          <div className="bg-warning/10 p-3 rounded-lg border border-warning/20 text-center">
            <p className="text-[10px] uppercase font-bold text-warning">Pending</p>
            <p className="text-lg font-black text-warning mt-1">45K</p>
          </div>
          <div className="bg-destructive/10 p-3 rounded-lg border border-destructive/20 text-center">
            <p className="text-[10px] uppercase font-bold text-destructive">Failed</p>
            <p className="text-lg font-black text-destructive mt-1">22K</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-[10px] font-bold uppercase text-muted-foreground">Recent Transactions</h4>
          {transactions.map(txn => (
            <div key={txn.id} className="flex items-center justify-between p-3 bg-card border border-border/40 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                  txn.method.includes('MTN') ? 'bg-yellow-500/20 text-yellow-500' : 
                  txn.method.includes('Orange') ? 'bg-orange-500/20 text-orange-500' : 'bg-indigo-500/20 text-indigo-500'
                }`}>
                  {txn.method.includes('Card') ? <CreditCard className="h-4 w-4" /> : <Smartphone className="h-4 w-4" />}
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">{txn.order} <span className="text-muted-foreground font-normal">({txn.id})</span></p>
                  <p className="text-[9px] text-muted-foreground">{txn.method} • {txn.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-black text-foreground">{txn.amount.toLocaleString()} XAF</p>
                <Badge variant="outline" className={`text-[9px] mt-0.5 ${
                  txn.status === "Paid" ? "bg-success/10 text-success border-success/30" :
                  txn.status === "Pending" ? "bg-warning/10 text-warning border-warning/30" :
                  "bg-destructive/10 text-destructive border-destructive/30"
                }`}>
                  {txn.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  );
}
