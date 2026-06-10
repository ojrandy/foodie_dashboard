import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { LineChart as LineChartIcon } from "lucide-react";

const TICKET_TRENDS = [
  { month: "Jan", resolved: 420, new: 450 },
  { month: "Feb", resolved: 380, new: 390 },
  { month: "Mar", resolved: 510, new: 480 },
  { month: "Apr", resolved: 460, new: 470 },
  { month: "May", resolved: 590, new: 550 },
  { month: "Jun", resolved: 650, new: 600 },
];

export function SupportAnalytics() {
  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <LineChartIcon className="h-5 w-5 text-indigo-500" /> Ticket Volume Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 h-[calc(100%-4rem)] flex flex-col">
        
        <div className="grid grid-cols-2 gap-4 shrink-0">
          <div className="p-3 bg-muted/10 rounded-xl border border-border/40">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">New Tickets (Jun)</p>
            <p className="text-2xl font-black text-rose-500">600</p>
          </div>
          <div className="p-3 bg-muted/10 rounded-xl border border-border/40">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Resolved (Jun)</p>
            <p className="text-2xl font-black text-emerald-500">650</p>
          </div>
        </div>

        <div className="flex-1 min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={TICKET_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "0.75rem", fontSize: "12px" }}
              />
              <Area type="monotone" dataKey="new" stroke="#f43f5e" fill="url(#colorNew)" name="New Tickets" />
              <Area type="monotone" dataKey="resolved" stroke="#10b981" fill="url(#colorResolved)" name="Resolved Tickets" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </CardContent>
    </Card>
  );
}
