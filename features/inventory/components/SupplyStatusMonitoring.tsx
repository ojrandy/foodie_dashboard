import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInventoryIntelligence } from "../hooks/useInventoryIntelligence";
import { ShieldCheck, ShieldAlert, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function SupplyStatusMonitoring() {
  const { ingredients } = useInventoryIntelligence();

  const healthy = ingredients.filter(i => i.supplyLevel === "Available");
  const warning = ingredients.filter(i => i.supplyLevel === "Low Supply");
  const critical = ingredients.filter(i => ["Critical", "Out of Stock"].includes(i.supplyLevel));

  const total = ingredients.length;

  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Supply Health</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Healthy */}
        <div className="space-y-2 p-4 rounded-xl bg-muted/10 border border-border/40 hover:border-success/30 transition-colors">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-success" />
              <h4 className="text-sm font-bold text-foreground">Healthy Inventory</h4>
            </div>
            <span className="text-sm font-black text-success">{healthy.length}</span>
          </div>
          <Progress value={(healthy.length / total) * 100} indicatorClassName="bg-success" className="h-1.5" />
          <p className="text-[10px] text-muted-foreground pt-1">
            {healthy.map(i => i.name).join(", ")}
          </p>
        </div>

        {/* Warning */}
        <div className="space-y-2 p-4 rounded-xl bg-muted/10 border border-border/40 hover:border-warning/30 transition-colors">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <h4 className="text-sm font-bold text-foreground">Low Supply Warning</h4>
            </div>
            <span className="text-sm font-black text-warning">{warning.length}</span>
          </div>
          <Progress value={(warning.length / total) * 100} indicatorClassName="bg-warning" className="h-1.5" />
          <p className="text-[10px] text-muted-foreground pt-1">
            {warning.map(i => i.name).join(", ")}
          </p>
        </div>

        {/* Critical */}
        <div className="space-y-2 p-4 rounded-xl bg-muted/10 border border-border/40 hover:border-destructive/30 transition-colors">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-destructive" />
              <h4 className="text-sm font-bold text-foreground">Critical Shortages</h4>
            </div>
            <span className="text-sm font-black text-destructive">{critical.length}</span>
          </div>
          <Progress value={(critical.length / total) * 100} indicatorClassName="bg-destructive" className="h-1.5" />
          <p className="text-[10px] text-muted-foreground pt-1">
            {critical.map(i => i.name).join(", ")}
          </p>
        </div>

      </CardContent>
    </Card>
  );
}
