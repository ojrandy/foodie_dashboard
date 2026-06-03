"use client";

import { Package, AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <Package className="h-8 w-8 text-accent" /> Inventory Management
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Real-time ingredient stock tracking, automated reorder triggers, and warehouse capacity monitoring.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Total Items</span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">284</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Package className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Low Stock Alerts</span>
              <div className="text-2xl font-extrabold mt-1 text-destructive">8 Items</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Stock Turnover</span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">4.2 Days</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <TrendingUp className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Waste Rate</span>
              <div className="text-2xl font-extrabold mt-1 text-success">-2.4%</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center text-success">
              <TrendingDown className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border border-dashed border-border/40 p-12 text-center glass">
        <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-bold text-foreground">Inventory Module</h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mt-2">
          Full inventory management with real-time stock tracking, automated reorder points, and supplier management will be available here.
        </p>
      </div>
    </div>
  );
}
