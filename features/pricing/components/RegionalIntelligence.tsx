import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { Map, MapPin, TrendingUp, TrendingDown } from "lucide-react";
import { CommodityPrice } from "../hooks/usePricingEngine";
import { Badge } from "@/components/ui/badge";

interface RegionalIntelligenceProps {
  commodities: CommodityPrice[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface TooltipProps { active?: boolean; payload?: any; label?: any; }
const CustomBarTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border/40 p-3 rounded-lg shadow-xl min-w-[150px]">
        <p className="text-sm font-bold text-foreground mb-2">{label} Prices</p>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between text-xs py-1">
            <span className="text-muted-foreground flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}
            </span>
            <span className="font-extrabold" style={{ color: entry.color }}>
              {entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function RegionalIntelligence({ commodities }: RegionalIntelligenceProps) {
  const regionalData = useMemo(() => {
    // We only take the first 6 items for a clean bar chart
    return commodities.slice(0, 6).map(c => ({
      name: c.name.split(" ")[0], // short name
      Buea: c.bueaPrice,
      Douala: c.doualaPrice,
      Yaounde: c.yaoundePrice
    }));
  }, [commodities]);

  const markets = [
    { name: "Buea Central Market", region: "South West", items: commodities.length, index: "High", trend: "up" },
    { name: "Mokolo Market", region: "Centre", items: commodities.length, index: "Medium", trend: "stable" },
    { name: "Sandaga Market", region: "Littoral", items: commodities.length, index: "Low", trend: "down" },
    { name: "Bamenda Main Market", region: "North West", items: 12, index: "High", trend: "up" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Map className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Regional Market Intelligence</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Regional Comparison Chart */}
        <Card className="lg:col-span-2 glass">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Cross-Regional Affordability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" vertical={false} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={false} content={<CustomBarTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: "20px" }} />
                  <Bar dataKey="Buea" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  <Bar dataKey="Douala" fill="#0ea5e9" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  <Bar dataKey="Yaounde" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Market Sources Cards */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Tracked Market Sources</h3>
          {markets.map((m, idx) => (
            <Card key={idx} className="bg-card/50 hover:bg-muted/10 transition-colors border-border/40">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-accent" /> {m.name}
                  </h4>
                  <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">{m.region} Region • {m.items} Items</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className={
                    m.index === "High" ? "border-destructive text-destructive" :
                    m.index === "Medium" ? "border-warning text-warning" : "border-success text-success"
                  }>
                    {m.index} Index
                  </Badge>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    {m.trend === "up" ? <TrendingUp className="h-3 w-3 text-destructive" /> : 
                     m.trend === "down" ? <TrendingDown className="h-3 w-3 text-success" /> : 
                     <div className="h-1 w-3 bg-muted-foreground rounded-full" />}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
