import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RefundRequestCenter() {
  const refundRequests = [
    { id: "REF-502", orderId: "ORD-0992", reason: "Missing items (Plantain)", amount: 2000, status: "Pending", risk: "Low", customer: "John Doe" },
    { id: "REF-505", orderId: "ORD-0980", reason: "Food was cold", amount: 15000, status: "Pending", risk: "High", customer: "Sarah Ndi" },
    { id: "REF-506", orderId: "ORD-0975", reason: "Wrong meal delivered", amount: 8500, status: "Pending", risk: "Medium", customer: "Amadou Ali" },
  ];

  return (
    <Card className="glass h-full flex flex-col">
      <CardHeader className="pb-4 shrink-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-violet-500" /> Refund Queue
          </CardTitle>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-violet-500/10 text-violet-500 border border-violet-500/20">
            3 Pending
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto custom-scrollbar pr-2 space-y-3">
        
        {refundRequests.map(ref => (
          <div key={ref.id} className="p-4 bg-muted/10 border border-border/40 rounded-xl relative overflow-hidden group">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold font-mono">{ref.id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                    ref.risk === 'High' ? 'bg-destructive/10 text-destructive border-destructive/20' :
                    ref.risk === 'Medium' ? 'bg-warning/10 text-warning border-warning/20' :
                    'bg-success/10 text-success border-success/20'
                  }`}>
                    {ref.risk} Risk
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground">{ref.customer} • {ref.orderId}</p>
              </div>
              <p className="text-sm font-black text-foreground font-mono">{ref.amount.toLocaleString()} F</p>
            </div>
            
            <div className="p-2 bg-background/50 rounded-lg text-xs border border-border/20 mb-3 text-muted-foreground">
              <span className="font-bold text-foreground mr-1">Reason:</span>
              {ref.reason}
            </div>

            <div className="flex gap-2">
              <Button size="sm" className="flex-1 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/20">
                <Check className="h-3 w-3 mr-1" /> Approve
              </Button>
              <Button size="sm" variant="outline" className="flex-1 hover:bg-destructive/10 hover:text-destructive border-border/40">
                <X className="h-3 w-3 mr-1" /> Reject
              </Button>
            </div>
          </div>
        ))}

      </CardContent>
    </Card>
  );
}
