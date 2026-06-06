"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, DollarSign, Percent, TrendingUp } from "lucide-react";

export function ProfitabilityAnalytics() {
  const topMeals = [
    { name: "Premium Ndole & Beef", margin: 4500, roi: 65, costRatio: 40, deliveryRatio: 15 },
    { name: "Egusi Soup & Fufu", margin: 2800, roi: 45, costRatio: 50, deliveryRatio: 20 },
    { name: "Eru & Waterfufu", margin: 3200, roi: 55, costRatio: 45, deliveryRatio: 18 },
    { name: "Student Budget Jollof", margin: 1200, roi: 85, costRatio: 30, deliveryRatio: 25 }, // High ROI because it's cheap to make
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass border-success/20 bg-success/5">
          <CardContent className="p-4">
            <p className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1"><Percent className="h-3 w-3" /> Average Profit Margin</p>
            <p className="text-3xl font-black text-success mt-2">42.5%</p>
            <p className="text-xs text-success/80 mt-1 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> +5.2% this month</p>
          </CardContent>
        </Card>
        
        <Card className="glass border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <p className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1"><DollarSign className="h-3 w-3" /> Projected Monthly Revenue</p>
            <p className="text-3xl font-black text-primary mt-2">12.5M <span className="text-sm">XAF</span></p>
            <p className="text-xs text-primary/80 mt-1 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> +12% growth</p>
          </CardContent>
        </Card>

        <Card className="glass border-border/40">
          <CardContent className="p-4">
            <p className="text-[10px] font-bold uppercase text-muted-foreground">Avg Cost Breakdown</p>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-xs"><span>Ingredients</span> <span className="font-bold">55%</span></div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden"><div className="h-full bg-destructive" style={{ width: `55%` }} /></div>
              <div className="flex justify-between text-xs pt-1"><span>Logistics</span> <span className="font-bold">25%</span></div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden"><div className="h-full bg-warning" style={{ width: `25%` }} /></div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-border/40">
          <CardContent className="p-4">
            <p className="text-[10px] font-bold uppercase text-muted-foreground">Platform Fees vs Profit</p>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-xs"><span>Net Profit</span> <span className="font-bold text-success">85%</span></div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden"><div className="h-full bg-success" style={{ width: `85%` }} /></div>
              <div className="flex justify-between text-xs pt-1"><span>Service Fees</span> <span className="font-bold text-muted-foreground">15%</span></div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden"><div className="h-full bg-muted-foreground" style={{ width: `15%` }} /></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <LineChart className="h-5 w-5 text-primary" /> Top Profitable Meals Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-muted-foreground uppercase bg-muted/20">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Recipe Name</th>
                  <th className="px-4 py-3 text-right">Net Margin (XAF)</th>
                  <th className="px-4 py-3 text-center">ROI %</th>
                  <th className="px-4 py-3 text-center">Cost Ratio</th>
                  <th className="px-4 py-3 text-center rounded-tr-lg">Delivery Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {topMeals.map((meal, idx) => (
                  <tr key={idx} className="hover:bg-muted/5 transition-colors">
                    <td className="px-4 py-4 font-bold text-foreground">{meal.name}</td>
                    <td className="px-4 py-4 text-right font-black text-success">{meal.margin.toLocaleString()}</td>
                    <td className="px-4 py-4 text-center">
                      <Badge className="bg-success/20 text-success border-success/30">{meal.roi}%</Badge>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden"><div className="h-full bg-destructive" style={{ width: `${meal.costRatio}%` }} /></div>
                        <span className="text-[10px] font-bold">{meal.costRatio}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden"><div className="h-full bg-warning" style={{ width: `${meal.deliveryRatio}%` }} /></div>
                        <span className="text-[10px] font-bold">{meal.deliveryRatio}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
