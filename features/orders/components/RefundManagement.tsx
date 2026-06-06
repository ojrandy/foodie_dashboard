"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RotateCcw, Check, X, AlertOctagon } from "lucide-react";

export function RefundManagement() {
  const refunds = [
    { id: "RFD-091", order: "ORD-9415", customer: "Stella Njoh", reason: "Order missing items", amount: 4500, status: "Pending" },
    { id: "RFD-092", order: "ORD-9302", customer: "Mark Ebai", reason: "Food was cold upon arrival", amount: 12000, status: "Pending" },
    { id: "RFD-093", order: "ORD-9288", customer: "Alice Nchinda", reason: "Cancelled by restaurant", amount: 15000, status: "Approved" },
  ];

  return (
    <Card className="glass border-border/40 h-full">
      <CardHeader>
        <CardTitle className="text-base font-bold flex items-center gap-2">
          <RotateCcw className="h-4 w-4 text-warning" /> Refund Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-xl flex items-start gap-3">
          <AlertOctagon className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-destructive">Action Required</h4>
            <p className="text-[10px] text-destructive/80 mt-0.5">You have 2 pending refund requests that exceed the 24-hour SLA.</p>
          </div>
        </div>

        <div className="space-y-3">
          {refunds.map(rfd => (
            <div key={rfd.id} className="p-3 bg-card border border-border/40 rounded-xl space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="text-xs font-bold text-foreground">{rfd.customer} <span className="text-muted-foreground font-normal">({rfd.order})</span></h5>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Reason: {rfd.reason}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-foreground">{rfd.amount.toLocaleString()} XAF</p>
                  <Badge variant="outline" className={`text-[9px] mt-0.5 ${rfd.status === 'Pending' ? 'bg-warning/10 text-warning border-warning/30' : 'bg-success/10 text-success border-success/30'}`}>
                    {rfd.status}
                  </Badge>
                </div>
              </div>
              
              {rfd.status === "Pending" && (
                <div className="flex gap-2 pt-2 border-t border-border/20">
                  <Button size="sm" className="flex-1 h-7 text-[10px] bg-success hover:bg-success/90">
                    <Check className="h-3 w-3 mr-1" /> Approve
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 h-7 text-[10px] text-destructive hover:bg-destructive/10 border-destructive/30">
                    <X className="h-3 w-3 mr-1" /> Reject
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  );
}
