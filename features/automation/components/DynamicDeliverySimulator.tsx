"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Truck, MapPin, CloudRain, Clock, AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";

export function DynamicDeliverySimulator() {
  const [region, setRegion] = useState("Buea");
  const [distanceKm, setDistanceKm] = useState(5);
  const [trafficLevel, setTrafficLevel] = useState<"Low" | "Moderate" | "Heavy" | "Gridlock">("Moderate");
  const [weather, setWeather] = useState<"Clear" | "Rain" | "Storm">("Clear");
  const [orderSize, setOrderSize] = useState<"Small" | "Medium" | "Large" | "Catering">("Medium");
  const [simulationResult, setSimulationResult] = useState<{ cost: number; time: number; risk: number } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleSimulate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      // Base logic
      const baseFee = 500;
      const perKm = region === "Douala" ? 150 : 100;
      
      let trafficMultiplier = 1;
      if (trafficLevel === "Moderate") trafficMultiplier = 1.2;
      if (trafficLevel === "Heavy") trafficMultiplier = 1.5;
      if (trafficLevel === "Gridlock") trafficMultiplier = 2.0;

      let weatherMultiplier = 1;
      if (weather === "Rain") weatherMultiplier = 1.3;
      if (weather === "Storm") weatherMultiplier = 1.8;

      let sizeMultiplier = 1;
      if (orderSize === "Large") sizeMultiplier = 1.5;
      if (orderSize === "Catering") sizeMultiplier = 2.5;

      const cost = Math.round((baseFee + (distanceKm * perKm)) * trafficMultiplier * weatherMultiplier * sizeMultiplier);
      const time = Math.round(15 + (distanceKm * 3 * trafficMultiplier) + (weather === "Rain" ? 15 : 0) + (weather === "Storm" ? 30 : 0));
      
      let risk = 10; // base risk
      if (distanceKm > 10) risk += 20;
      if (trafficLevel === "Heavy") risk += 30;
      if (trafficLevel === "Gridlock") risk += 50;
      if (weather === "Rain") risk += 20;
      if (weather === "Storm") risk += 40;
      if (orderSize === "Catering") risk += 10;
      
      setSimulationResult({ cost, time, risk: Math.min(risk, 100) });
      setIsCalculating(false);
    }, 800);
  };

  return (
    <Card className="glass border-accent/20">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Truck className="h-6 w-6 text-accent" /> Dynamic Delivery Engine
        </CardTitle>
        <p className="text-xs text-muted-foreground">Simulate complex routing environments to predict costs, ETAs, and logistical risk.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 p-5 bg-muted/10 rounded-xl border border-border/40">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> Zone</label>
            <select className="w-full bg-background border border-border/40 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-accent/30" value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="Buea">Buea</option>
              <option value="Douala">Douala</option>
              <option value="Yaounde">Yaounde</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-muted-foreground">Distance (Km)</label>
            <Input type="number" min={1} value={distanceKm} onChange={(e) => setDistanceKm(parseInt(e.target.value) || 1)} className="font-bold bg-background" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1"><Truck className="h-3 w-3" /> Traffic</label>
            <select className="w-full bg-background border border-border/40 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-accent/30" value={trafficLevel} onChange={(e) => setTrafficLevel(e.target.value as "Low" | "Moderate" | "Heavy" | "Gridlock")}>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="Heavy">Heavy</option>
              <option value="Gridlock">Gridlock</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1"><CloudRain className="h-3 w-3" /> Weather</label>
            <select className="w-full bg-background border border-border/40 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-accent/30" value={weather} onChange={(e) => setWeather(e.target.value as "Clear" | "Rain" | "Storm")}>
              <option value="Clear">Clear</option>
              <option value="Rain">Rain</option>
              <option value="Storm">Storm</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-muted-foreground">Order Size</label>
            <select className="w-full bg-background border border-border/40 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-accent/30" value={orderSize} onChange={(e) => setOrderSize(e.target.value as "Small" | "Medium" | "Large" | "Catering")}>
              <option value="Small">Small (Bike)</option>
              <option value="Medium">Medium (Bike)</option>
              <option value="Large">Large (Car)</option>
              <option value="Catering">Catering (Van)</option>
            </select>
          </div>
        </div>

        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleSimulate} disabled={isCalculating}>
          {isCalculating ? (
            <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Calculating Physics...</span>
          ) : (
            <span className="flex items-center gap-2">Execute Simulation <ArrowRight className="h-4 w-4" /></span>
          )}
        </Button>

        {simulationResult && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <p className="text-[10px] uppercase font-bold text-muted-foreground">Calculated Cost</p>
                <p className="text-2xl font-black text-primary mt-1">{simulationResult.cost.toLocaleString()} XAF</p>
              </CardContent>
            </Card>
            <Card className="bg-success/5 border-success/20">
              <CardContent className="p-4">
                <p className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> Estimated ETA</p>
                <p className="text-2xl font-black text-success mt-1">{simulationResult.time} mins</p>
              </CardContent>
            </Card>
            <Card className={simulationResult.risk > 50 ? "bg-destructive/5 border-destructive/20" : "bg-warning/5 border-warning/20"}>
              <CardContent className="p-4">
                <p className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Logistics Risk Score</p>
                <div className="flex items-end gap-2">
                  <p className={`text-2xl font-black mt-1 ${simulationResult.risk > 50 ? "text-destructive" : "text-warning"}`}>{simulationResult.risk}/100</p>
                  {simulationResult.risk < 30 && <CheckCircle2 className="h-5 w-5 mb-1 text-success" />}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
