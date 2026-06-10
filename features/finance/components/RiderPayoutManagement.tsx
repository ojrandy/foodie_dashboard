import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFinanceIntelligence } from "../hooks/useFinanceIntelligence";
import { Bike, CheckCircle2, Clock, AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RiderPayoutManagement() {
  const { payouts } = useFinanceIntelligence();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Processing": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Pending": return "bg-warning/10 text-warning border-warning/20";
      case "Failed": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-neutral-500/10 text-neutral-500 border-neutral-500/20";
    }
  };

  const pendingAmount = payouts.filter(p => p.status === 'Pending').reduce((acc, p) => acc + p.earnings + p.bonuses + p.adjustments, 0);

  return (
    <Card className="glass h-full flex flex-col">
      <CardHeader className="pb-4 shrink-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Bike className="h-5 w-5 text-pink-500" /> Rider Payouts
          </CardTitle>
          <Button variant="outline" size="sm" className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
            Process All <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden flex flex-col gap-4">
        
        <div className="grid grid-cols-3 gap-2 shrink-0">
          <div className="p-3 bg-muted/10 rounded-xl border border-border/40 text-center">
            <Clock className="h-4 w-4 mx-auto mb-1 text-warning" />
            <p className="text-lg font-black">{pendingAmount.toLocaleString()} F</p>
            <p className="text-[9px] uppercase font-bold text-muted-foreground">Pending</p>
          </div>
          <div className="p-3 bg-muted/10 rounded-xl border border-border/40 text-center">
            <CheckCircle2 className="h-4 w-4 mx-auto mb-1 text-emerald-500" />
            <p className="text-lg font-black">97,500 F</p>
            <p className="text-[9px] uppercase font-bold text-muted-foreground">Paid Today</p>
          </div>
          <div className="p-3 bg-muted/10 rounded-xl border border-border/40 text-center">
            <AlertTriangle className="h-4 w-4 mx-auto mb-1 text-destructive" />
            <p className="text-lg font-black">1</p>
            <p className="text-[9px] uppercase font-bold text-muted-foreground">Failed</p>
          </div>
        </div>

        <div className="flex-1 overflow-auto custom-scrollbar pr-2 space-y-2">
          {payouts.map(payout => {
            const total = payout.earnings + payout.bonuses + payout.adjustments;
            return (
              <div key={payout.id} className="p-3 bg-muted/10 border border-border/40 rounded-xl hover:bg-muted/30 transition-colors flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-foreground">{payout.riderName}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-muted-foreground font-mono">{payout.id}</span>
                    <span className="text-[10px] text-muted-foreground">• {payout.deliveries} deliveries</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black font-mono">{total.toLocaleString()} F</p>
                  <span className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-[9px] font-bold border ${getStatusColor(payout.status)}`}>
                    {payout.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </CardContent>
    </Card>
  );
}
