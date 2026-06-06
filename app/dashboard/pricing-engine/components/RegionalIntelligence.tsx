import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { Map, MapPin, TrendingUp, TrendingDown, MousePointerClick, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CommodityPrice } from "../types";
import { Badge } from "@/components/ui/badge";

interface CustomTooltipProps {
  active?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  label?: any;
}

const CustomBarTooltip = ({ active, payload, label }: CustomTooltipProps) => {
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

interface RegionalIntelligenceProps {
  commodities: CommodityPrice[];
}

export function RegionalIntelligence({ commodities }: RegionalIntelligenceProps) {
  const [isViewAllOpen, setIsViewAllOpen] = React.useState(false);
  const [activeMarketForItems, setActiveMarketForItems] = React.useState<{name: string, region: string, items: number, trackedList: string[]} | null>(null);

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
    { name: "Bafoussam Market", region: "West", items: 25, index: "High", trend: "up" },
    { name: "Garoua Market", region: "North", items: 10, index: "Medium", trend: "stable" },
    { name: "Maroua Market", region: "Far North", items: 8, index: "Low", trend: "down" },
    { name: "Ebolowa Market", region: "South", items: 15, index: "Low", trend: "stable" },
    { name: "Ngaoundere Market", region: "Adamawa", items: 14, index: "Medium", trend: "up" },
    { name: "Bertoua Market", region: "East", items: 11, index: "Medium", trend: "stable" },
  ].map((m, i) => ({
    ...m,
    // Provide a deterministic mock slice of commodities for each market
    trackedList: commodities.slice(i % 5, (i % 5) + m.items).map(c => c.name.split(" ")[0])
  }));

  const top4Markets = markets.slice(0, 4);

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
                  <Tooltip cursor={false} content={CustomBarTooltip} />
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
          <h3 
            className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center justify-between cursor-pointer hover:text-accent transition-colors"
            onClick={() => setIsViewAllOpen(true)}
          >
            Tracked Market Sources
            <MousePointerClick className="h-4 w-4 opacity-50" />
          </h3>
          {top4Markets.map((m, idx) => (
            <Card key={idx} className="bg-card/50 hover:bg-muted/10 transition-colors border-border/40">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-accent" /> {m.name}
                  </h4>
                  <p 
                    className="text-[10px] text-accent mt-1 uppercase tracking-wider font-bold cursor-pointer hover:underline underline-offset-2 flex items-center gap-1"
                    onClick={() => setActiveMarketForItems(m)}
                  >
                    {m.region} Region • {m.items} Tracked Items <MousePointerClick className="h-3 w-3" />
                  </p>
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

      {/* Massive View All Modal */}
      <AnimatePresence>
        {isViewAllOpen && (
          <div className="fixed inset-0 z-[900] flex items-center justify-center">
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
              onClick={() => setIsViewAllOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-[950] w-[90vw] md:w-[75vw] h-[85vh] bg-card border border-border/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-border/40 bg-muted/20 flex justify-between items-center shrink-0">
                <div>
                  <h2 className="text-2xl font-extrabold flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-accent" /> National Market Network
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">Complete overview of all monitored local and regional markets.</p>
                </div>
                <button onClick={() => setIsViewAllOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {markets.map((m, idx) => (
                  <Card key={`all-${idx}`} className="bg-card/50 hover:bg-muted/10 transition-colors border-border/40">
                    <CardContent className="p-4 flex flex-col justify-between h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                            <MapPin className="h-4 w-4 text-accent" /> {m.name}
                          </h4>
                          <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">{m.region} Region</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className={
                            m.index === "High" ? "border-destructive text-destructive" :
                            m.index === "Medium" ? "border-warning text-warning" : "border-success text-success"
                          }>
                            {m.index} Index
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 border-t border-border/40 pt-3 mt-2">
                        <div className="flex items-center justify-between">
                          <span 
                            className="text-xs font-bold text-accent cursor-pointer hover:underline underline-offset-2 flex items-center gap-1"
                            onClick={() => setActiveMarketForItems(m)}
                          >
                            {m.items} Tracked Items <MousePointerClick className="h-3 w-3" />
                          </span>
                          <div className="flex items-center gap-1.5 text-xs font-bold">
                            {m.trend === "up" ? (
                              <><TrendingUp className="h-3.5 w-3.5 text-destructive" /> <span className="text-destructive">Inflating</span></>
                            ) : m.trend === "down" ? (
                              <><TrendingDown className="h-3.5 w-3.5 text-success" /> <span className="text-success">Deflating</span></>
                            ) : (
                              <><div className="h-1 w-3 bg-muted-foreground rounded-full" /> <span className="text-muted-foreground">Stable</span></>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Tracked Items Nested Modal */}
      <AnimatePresence>
        {activeMarketForItems && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center">
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-xl" 
              onClick={() => setActiveMarketForItems(null)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative z-[1050] w-[90vw] max-w-lg bg-card border border-border/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-5 border-b border-border/40 bg-muted/20 flex justify-between items-center shrink-0">
                <div>
                  <h2 className="text-lg font-extrabold flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-accent" /> {activeMarketForItems.name}
                  </h2>
                  <p className="text-muted-foreground text-xs mt-1">
                    {activeMarketForItems.region} Region • {activeMarketForItems.items} Items Actively Tracked
                  </p>
                </div>
                <button onClick={() => setActiveMarketForItems(null)} className="p-2 hover:bg-muted rounded-full transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {activeMarketForItems.trackedList.map((item: string, i: number) => (
                    <div key={i} className="bg-accent/5 border border-accent/20 rounded-lg p-2.5 flex items-center justify-center text-center shadow-sm">
                      <span className="text-xs font-bold text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
