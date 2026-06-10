import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt, Smartphone, Server, Megaphone, HelpCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function ExpenseManagement() {
  const expenses = [
    { category: "Platform Operations", amount: "850,000", value: 35, icon: Server, color: "text-blue-500", bg: "bg-blue-500" },
    { category: "Rider Payouts", amount: "3,800,000", value: 45, icon: Smartphone, color: "text-emerald-500", bg: "bg-emerald-500" },
    { category: "Marketing & Promos", amount: "420,000", value: 12, icon: Megaphone, color: "text-violet-500", bg: "bg-violet-500" },
    { category: "Support & Infrastructure", amount: "150,000", value: 8, icon: HelpCircle, color: "text-amber-500", bg: "bg-amber-500" },
  ];

  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Receipt className="h-5 w-5 text-indigo-500" /> Operating Expenses
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="p-4 bg-muted/10 rounded-xl border border-border/40 text-center">
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Total Monthly Burn</p>
          <div className="text-3xl font-black text-foreground font-mono">5,220,000 F</div>
          <p className="text-[10px] text-success mt-1">-5% from last month (Efficiency ↑)</p>
        </div>

        <div className="space-y-4">
          {expenses.map((exp) => (
            <div key={exp.category} className="space-y-2">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-md bg-muted/20 border border-border/40 ${exp.color}`}>
                    <exp.icon className="h-3 w-3" />
                  </div>
                  <h4 className="text-xs font-bold text-foreground">{exp.category}</h4>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black font-mono">{exp.amount} F</span>
                  <span className="text-[9px] text-muted-foreground ml-2">({exp.value}%)</span>
                </div>
              </div>
              <Progress value={exp.value} indicatorClassName={exp.bg} className="h-1.5 bg-muted/30" />
            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  );
}
