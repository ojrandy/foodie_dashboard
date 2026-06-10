import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertOctagon, TrendingDown, Info } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const COMPLAINT_DATA = [
  { category: "Late Delivery", volume: 45 },
  { category: "Missing Item", volume: 32 },
  { category: "Wrong Order", volume: 20 },
  { category: "Food Quality", volume: 15 },
  { category: "App Problem", volume: 10 },
  { category: "Payment Issue", volume: 8 },
];

export function ComplaintManagement() {
  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <AlertOctagon className="h-5 w-5 text-rose-500" /> Complaint Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-muted/10 rounded-xl border border-border/40">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Total Weekly Complaints</p>
            <p className="text-2xl font-black text-foreground">130</p>
            <p className="text-[10px] text-success mt-1 flex items-center gap-1"><TrendingDown className="h-3 w-3" /> 12% lower than last week</p>
          </div>
          <div className="p-3 bg-muted/10 rounded-xl border border-border/40">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Resolution Rate</p>
            <p className="text-2xl font-black text-emerald-500">84%</p>
            <p className="text-[10px] text-muted-foreground mt-1 text-balance">Within 24 hours</p>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-1">
            Complaint Categories <Info className="h-3 w-3" />
          </h4>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COMPLAINT_DATA} layout="vertical" margin={{ top: 0, right: 10, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis dataKey="category" type="category" stroke="#888" fontSize={10} tickLine={false} axisLine={false} width={80} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "0.75rem", fontSize: "11px" }}
                  cursor={{ fill: 'var(--muted)' }}
                />
                <Bar dataKey="volume" radius={[0, 4, 4, 0]}>
                  {COMPLAINT_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? "#ef4444" : index === 1 ? "#f59e0b" : "#3b82f6"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
