"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Truck, MapPin, CheckCircle, AlertTriangle, User,
  Navigation, Activity, Zap, X, Route
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import { toast } from "sonner";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

// ============================================
// MOCK DATA
// ============================================
interface Rider {
  id: string;
  name: string;
  status: "Active" | "Idle" | "Offline";
  zone: string;
  deliveriesCompleted: number;
  avgEta: number;
  rating: number;
  currentOrder?: string;
}

interface ActiveDelivery {
  id: string;
  customer: string;
  location: string;
  rider: string;
  progressPct: number;
  etaRemaining: number;
  risk: "Low" | "Medium" | "High";
}

const RIDERS: Rider[] = [
  { id: "r1", name: "Samuel E.", status: "Active", zone: "Molyko / Buea Town", deliveriesCompleted: 12, avgEta: 28, rating: 4.8, currentOrder: "ord-1027" },
  { id: "r2", name: "Alain N.", status: "Active", zone: "Akwa / Bonapriso", deliveriesCompleted: 9, avgEta: 32, rating: 4.5, currentOrder: "ord-1026" },
  { id: "r3", name: "Elvis T.", status: "Idle", zone: "Bastos / Mvog-Mbi", deliveriesCompleted: 7, avgEta: 35, rating: 4.2 },
  { id: "r4", name: "Marc O.", status: "Active", zone: "Douala Port / Akwa", deliveriesCompleted: 15, avgEta: 24, rating: 4.9, currentOrder: "ord-1024" },
  { id: "r5", name: "Fritz B.", status: "Offline", zone: "Yaounde Centre", deliveriesCompleted: 3, avgEta: 40, rating: 4.0 },
];

const ACTIVE_DELIVERIES: ActiveDelivery[] = [
  { id: "ord-1027", customer: "Frank Ndip", location: "Clerks Quarters, Buea", rider: "Samuel E.", progressPct: 70, etaRemaining: 12, risk: "High" },
  { id: "ord-1026", customer: "Mary Nchinda", location: "Bastos, Yaounde", rider: "Alain N.", progressPct: 45, etaRemaining: 25, risk: "Low" },
  { id: "ord-1024", customer: "Theresa Mboa", location: "Molyko, Buea", rider: "Marc O.", progressPct: 20, etaRemaining: 38, risk: "Medium" },
];

const ZONE_PERFORMANCE = [
  { zone: "Molyko", deliveries: 47, avgTime: 28 },
  { zone: "Akwa", deliveries: 63, avgTime: 22 },
  { zone: "Bastos", deliveries: 38, avgTime: 35 },
  { zone: "Bonapriso", deliveries: 29, avgTime: 30 },
  { zone: "Buea Town", deliveries: 54, avgTime: 26 },
];

export function DispatchWorkspace() {
  const [mounted, setMounted] = useState(false);
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const stats = useMemo(() => ({
    activeRiders: RIDERS.filter(r => r.status === "Active").length,
    totalDeliveries: RIDERS.reduce((s, r) => s + r.deliveriesCompleted, 0),
    avgRating: (RIDERS.reduce((s, r) => s + r.rating, 0) / RIDERS.length).toFixed(1),
    highRiskRoutes: ACTIVE_DELIVERIES.filter(d => d.risk === "High").length,
  }), []);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <Truck className="h-8 w-8 text-accent" /> Dispatch & Logistics Command
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Live rider tracking, route intelligence, zone heatmaps, and delivery fleet management.
          </p>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Riders", value: `${stats.activeRiders} Online`, icon: User, color: "accent" },
          { label: "Deliveries Today", value: stats.totalDeliveries, icon: CheckCircle, color: "success" },
          { label: "Fleet Avg Rating", value: `${stats.avgRating} / 5.0`, icon: Activity, color: "sky-500" },
          { label: "High-Risk Routes", value: `${stats.highRiskRoutes} Active`, icon: AlertTriangle, color: "warning", danger: true },
        ].map((kpi, i) => {
          const iconBgClass = kpi.color === "accent" ? "bg-accent/10" : kpi.color === "success" ? "bg-success/10" : kpi.color === "sky-500" ? "bg-sky-500/10" : "bg-warning/10";
          const iconTextClass = kpi.color === "accent" ? "text-accent" : kpi.color === "success" ? "text-success" : kpi.color === "sky-500" ? "text-sky-500" : "text-warning";
          return (
          <Card key={i} className={`glass ${kpi.danger ? "border-warning/20 bg-warning/5" : ""}`}>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <span className={`text-[10px] font-bold tracking-widest uppercase ${kpi.danger ? "text-warning" : "text-muted-foreground"}`}>{kpi.label}</span>
                <div className={`text-2xl font-extrabold mt-1 ${kpi.danger ? "text-warning" : "text-foreground"}`}>{kpi.value}</div>
              </div>
              <div className={cn("h-10 w-10 rounded-full flex items-center justify-center", iconBgClass, iconTextClass)}>
                <kpi.icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
          );
        })}
      </div>

      {/* LIVE DELIVERIES + ZONE CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Deliveries Tracker */}
        <Card className="lg:col-span-7 glass">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Navigation className="h-5 w-5 text-accent animate-pulse" /> Live Delivery Tracker
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ACTIVE_DELIVERIES.map(d => (
              <div key={d.id} className="p-4 rounded-xl border border-border/40 bg-muted/20 glass space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{d.customer}</h4>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3" /> {d.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className={
                      d.risk === "High" ? "bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/10"
                      : d.risk === "Medium" ? "bg-warning/10 text-warning border border-warning/20 hover:bg-warning/10"
                      : "bg-success/10 text-success border border-success/20 hover:bg-success/10"
                    }>{d.risk} Risk</Badge>
                    <p className="text-[10px] text-muted-foreground mt-1">ETA: <strong className="text-foreground">{d.etaRemaining} mins</strong></p>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] text-muted-foreground font-semibold">
                    <span>Rider: {d.rider}</span>
                    <span>{d.progressPct}% Complete</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${d.progressPct}%` }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className={`h-full rounded-full ${d.risk === "High" ? "bg-destructive" : d.risk === "Medium" ? "bg-warning" : "bg-success"}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Zone Performance Chart */}
        <Card className="lg:col-span-5 glass">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Route className="h-5 w-5 text-accent" /> Zone Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              {!mounted ? (
                <div className="h-full animate-pulse rounded bg-muted/20" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ZONE_PERFORMANCE} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis type="number" stroke="#888" fontSize={10} tickLine={false} />
                    <YAxis type="category" dataKey="zone" stroke="#888" fontSize={10} tickLine={false} width={65} />
                    <Tooltip contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "0.75rem", color: "var(--foreground)", fontSize: "11px" }} />
                    <Bar dataKey="deliveries" fill="var(--primary)" radius={[0, 6, 6, 0]} name="Deliveries" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RIDER FLEET STATUS BOARD */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <User className="h-5 w-5 text-accent" /> Rider Fleet Status Board
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-border/40 bg-muted/20 text-muted-foreground uppercase font-bold tracking-wider">
                  <th className="p-4">Rider</th>
                  <th className="p-4">Zone Coverage</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Completed</th>
                  <th className="p-4 text-center">Avg ETA</th>
                  <th className="p-4 text-center">Rating</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {RIDERS.map(r => (
                  <tr key={r.id} className="hover:bg-muted/10 transition-colors">
                    <td className="p-4 font-extrabold text-foreground">{r.name}</td>
                    <td className="p-4 text-muted-foreground">{r.zone}</td>
                    <td className="p-4 text-center">
                      <Badge className={
                        r.status === "Active" ? "bg-success/10 text-success border border-success/20 hover:bg-success/10"
                        : r.status === "Idle" ? "bg-warning/10 text-warning border border-warning/20 hover:bg-warning/10"
                        : "bg-muted text-muted-foreground border border-border/20 hover:bg-muted"
                      }>{r.status}</Badge>
                    </td>
                    <td className="p-4 text-center font-bold text-foreground">{r.deliveriesCompleted}</td>
                    <td className="p-4 text-center font-bold text-foreground">{r.avgEta} min</td>
                    <td className="p-4 text-center font-bold text-accent">{r.rating} ⭐</td>
                    <td className="p-4 text-center">
                      <Button size="sm" variant="outline" className="text-[10px] h-7" onClick={() => {
                        setSelectedRider(r);
                        toast.info(`Viewing dispatch profile for ${r.name}`);
                      }}>
                        Dispatch
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* RIDER DETAIL PANEL */}
      <AnimatePresence>
        {selectedRider && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedRider(null)} className="fixed inset-0 bg-black z-[900]" />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-card border-l border-border/40 z-[950] p-6 shadow-2xl glass overflow-y-auto"
            >
              <div className="flex justify-between items-center border-b border-border/40 pb-4 mb-5">
                <h3 className="text-lg font-bold text-foreground">Rider Profile</h3>
                <Button size="icon" variant="ghost" onClick={() => setSelectedRider(null)}><X className="h-4 w-4" /></Button>
              </div>
              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-4 p-4 bg-accent/5 border border-accent/20 rounded-xl">
                  <div className="h-14 w-14 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <User className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-foreground">{selectedRider.name}</h3>
                    <Badge className={
                      selectedRider.status === "Active" ? "bg-success/10 text-success border border-success/20 mt-1 hover:bg-success/10"
                      : "bg-muted text-muted-foreground mt-1"
                    }>{selectedRider.status}</Badge>
                  </div>
                </div>
                {[
                  { label: "Zone Coverage", val: selectedRider.zone },
                  { label: "Deliveries Today", val: `${selectedRider.deliveriesCompleted} orders` },
                  { label: "Avg ETA", val: `${selectedRider.avgEta} minutes` },
                  { label: "Customer Rating", val: `${selectedRider.rating} / 5.0 ⭐` },
                  { label: "Current Order", val: selectedRider.currentOrder || "No Active Delivery" },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between items-center p-3 bg-muted/20 rounded-lg border border-border/20">
                    <span className="text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">{label}</span>
                    <span className="font-bold text-foreground">{val}</span>
                  </div>
                ))}
                <Button className="w-full mt-4 gap-2" onClick={() => {
                  toast.success(`New route assigned to ${selectedRider.name}`);
                  setSelectedRider(null);
                }}>
                  <Zap className="h-4 w-4" /> Assign New Route
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
