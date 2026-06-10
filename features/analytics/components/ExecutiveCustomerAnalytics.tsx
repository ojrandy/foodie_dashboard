import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { LineChart as LineChartIcon } from "lucide-react";

const DATA = [
  { month: "Jan", newCustomers: 300, returning: 800 },
  { month: "Feb", newCustomers: 350, returning: 820 },
  { month: "Mar", newCustomers: 400, returning: 850 },
  { month: "Apr", newCustomers: 380, returning: 900 },
  { month: "May", newCustomers: 420, returning: 950 },
  { month: "Jun", newCustomers: 450, returning: 1050 },
];

export function ExecutiveCustomerAnalytics() {
  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <LineChartIcon className="h-5 w-5 text-primary" /> Customer Growth (6 Months)
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[250px] lg:h-[calc(100%-4rem)] pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorRet" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="month" stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#888" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}`} />
            <Tooltip 
              contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "0.75rem", fontSize: "12px" }}
            />
            <Area type="monotone" dataKey="returning" stackId="1" stroke="#10b981" fill="url(#colorRet)" name="Returning Customers" />
            <Area type="monotone" dataKey="newCustomers" stackId="1" stroke="#8b5cf6" fill="url(#colorNew)" name="New Signups" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
