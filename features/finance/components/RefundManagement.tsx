import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFinanceIntelligence } from "../hooks/useFinanceIntelligence";
import { ShieldAlert, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RefundManagement() {
  const { refunds } = useFinanceIntelligence();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "text-emerald-500 bg-emerald-500/10";
      case "Completed": return "text-blue-500 bg-blue-500/10";
      case "Pending": return "text-warning bg-warning/10";
      case "Rejected": return "text-destructive bg-destructive/10";
      default: return "text-muted-foreground bg-muted/10";
    }
  };

  return (
    <Card className="glass h-full flex flex-col">
      <CardHeader className="pb-4 shrink-0">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-destructive" /> Refund Requests
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto custom-scrollbar pr-2 space-y-3">
        
        {refunds.map(ref => (
          <div key={ref.id} className="p-4 bg-muted/10 border border-border/40 rounded-xl relative overflow-hidden group">
            {ref.status === 'Pending' && (
              <div className="absolute top-0 left-0 w-1 h-full bg-warning" />
            )}
            
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold font-mono">{ref.id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${getStatusColor(ref.status)}`}>
                    {ref.status}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground">Order: {ref.orderId} • {ref.date}</p>
              </div>
              <p className="text-sm font-black text-foreground font-mono">{ref.amount.toLocaleString()} F</p>
            </div>
            
            <div className="p-2 bg-background/50 rounded-lg text-xs border border-border/20">
              <span className="font-bold text-muted-foreground mr-2">Reason:</span>
              {ref.reason}
            </div>

            {ref.status === 'Pending' && (
              <div className="flex gap-2 mt-3">
                <Button size="sm" className="flex-1 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/20">
                  <Check className="h-3 w-3 mr-1" /> Approve
                </Button>
                <Button size="sm" variant="outline" className="flex-1 hover:bg-destructive/10 hover:text-destructive border-border/40">
                  <X className="h-3 w-3 mr-1" /> Reject
                </Button>
              </div>
            )}
          </div>
        ))}

      </CardContent>
    </Card>
  );
}
