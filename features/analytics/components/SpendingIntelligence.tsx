import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Crown, Star, PiggyBank, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function SpendingIntelligence() {
  const segments = [
    { name: "VIP Customers", value: 15, count: 1860, avgSpend: "450k", icon: Crown, color: "text-amber-500", bg: "bg-amber-500" },
    { name: "Premium Customers", value: 25, count: 3110, avgSpend: "120k", icon: Star, color: "text-indigo-500", bg: "bg-indigo-500" },
    { name: "Regular Customers", value: 45, count: 5600, avgSpend: "45k", icon: Users, color: "text-primary", bg: "bg-primary" },
    { name: "Budget Customers", value: 15, count: 1880, avgSpend: "12k", icon: PiggyBank, color: "text-emerald-500", bg: "bg-emerald-500" },
  ];

  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Wallet className="h-5 w-5 text-emerald-500" /> Spending Segments
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-muted/10 rounded-xl border border-border/40">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Avg Order Value</p>
            <p className="text-2xl font-black text-foreground">8,500 F</p>
          </div>
          <div className="p-4 bg-muted/10 rounded-xl border border-border/40">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">High Value Target</p>
            <p className="text-2xl font-black text-amber-500">40%</p>
          </div>
        </div>

        <div className="space-y-4">
          {segments.map((seg) => (
            <div key={seg.name} className="space-y-2">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-md bg-muted/20 border border-border/40 ${seg.color}`}>
                    <seg.icon className="h-3 w-3" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">{seg.name}</h4>
                    <p className="text-[9px] text-muted-foreground">{seg.count.toLocaleString()} users • ~{seg.avgSpend} avg</p>
                  </div>
                </div>
                <span className="text-xs font-black">{seg.value}%</span>
              </div>
              <Progress value={seg.value} indicatorClassName={seg.bg} className="h-1.5 bg-muted/30" />
            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  );
}
