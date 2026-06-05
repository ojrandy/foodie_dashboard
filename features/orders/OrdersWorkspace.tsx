"use client";

import React, { useState, useMemo } from "react";
import { 
  ShoppingCart, Clock, CheckCircle, 
  MapPin, AlertTriangle, ArrowRight, X, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

// ==========================================
// TYPES & MOCK DATA
// ==========================================

export interface Order {
  id: string;
  customerName: string;
  location: string;
  itemsCount: number;
  totalCost: number; // in XAF
  status: "Pending" | "Confirmed" | "Preparing" | "Transit" | "Delivered";
  assignedRider?: string;
  eta: number; // in minutes
  createdAt: string;
  riskFactor: "Low" | "Medium" | "High";
  itemsDescription: string;
}

const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-1024",
    customerName: "Theresa Mboa",
    location: "Molyko, Buea",
    itemsCount: 4,
    totalCost: 12500,
    status: "Pending",
    eta: 45,
    createdAt: "10 mins ago",
    riskFactor: "Medium",
    itemsDescription: "Egusi Soup Combo, 2x Yellow Garri Packs, Fresh Cocoyam"
  },
  {
    id: "ord-1025",
    customerName: "Jean-Pierre Eto'o",
    location: "Akwa, Douala",
    itemsCount: 7,
    totalCost: 28000,
    status: "Confirmed",
    assignedRider: "Samuel E.",
    eta: 35,
    createdAt: "15 mins ago",
    riskFactor: "Low",
    itemsDescription: "Ndole Plan Deluxe, Fried Plantain, Smoked Shrimps"
  },
  {
    id: "ord-1026",
    customerName: "Mary Nchinda",
    location: "Bastos, Yaounde",
    itemsCount: 3,
    totalCost: 15500,
    status: "Preparing",
    assignedRider: "Alain N.",
    eta: 25,
    createdAt: "22 mins ago",
    riskFactor: "Low",
    itemsDescription: "Achu Yellow Soup supreme, Smoked Cow Skin (Canda)"
  },
  {
    id: "ord-1027",
    customerName: "Frank Ndip",
    location: "Clerks Quarters, Buea",
    itemsCount: 5,
    totalCost: 9500,
    status: "Transit",
    assignedRider: "Elvis T.",
    eta: 12,
    createdAt: "35 mins ago",
    riskFactor: "High", // weather warnings in Buea
    itemsDescription: "Student Budget Rice, Fried Eggs, Chili Pepper paste"
  },
  {
    id: "ord-1028",
    customerName: "Solange Mbida",
    location: "Bonapriso, Douala",
    itemsCount: 6,
    totalCost: 35000,
    status: "Delivered",
    assignedRider: "Marc O.",
    eta: 0,
    createdAt: "1 hour ago",
    riskFactor: "Low",
    itemsDescription: "Koki Wrap Plan, 1x Red Palm oil large bottle, Extra Plantains"
  }
];

const RIDERS = ["Unassigned", "Samuel E.", "Alain N.", "Elvis T.", "Marc O.", "Fritz B."];

export function OrdersWorkspace() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("All");

  // Kanban columns mapping
  const COLUMNS: Order["status"][] = ["Pending", "Confirmed", "Preparing", "Transit", "Delivered"];

  const stats = useMemo(() => {
    const active = orders.filter(o => o.status !== "Delivered").length;
    const completed = orders.filter(o => o.status === "Delivered").length;
    const totalRev = orders.reduce((sum, o) => sum + o.totalCost, 0);
    const highRisk = orders.filter(o => o.riskFactor === "High" && o.status !== "Delivered").length;
    return { active, completed, totalRev, highRisk };
  }, [orders]);

  const handleMoveStatus = (orderId: string, currentStatus: Order["status"], direction: "next" | "prev") => {
    const currentIndex = COLUMNS.indexOf(currentStatus);
    let nextIndex = currentIndex;

    if (direction === "next" && currentIndex < COLUMNS.length - 1) {
      nextIndex = currentIndex + 1;
    } else if (direction === "prev" && currentIndex > 0) {
      nextIndex = currentIndex - 1;
    }

    const nextStatus = COLUMNS[nextIndex];
    if (nextStatus === currentStatus) return;

    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        toast.info(`Order #${o.id} transitioned to ${nextStatus}`);
        return { 
          ...o, 
          status: nextStatus,
          eta: nextStatus === "Delivered" ? 0 : Math.max(5, o.eta - 10)
        };
      }
      return o;
    }));
  };

  const handleAssignRider = (orderId: string, rider: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        toast.success(`Assigned rider ${rider} to Order #${o.id}`);
        return { 
          ...o, 
          assignedRider: rider === "Unassigned" ? undefined : rider,
          status: o.status === "Pending" ? "Confirmed" : o.status
        };
      }
      return o;
    }));

    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, assignedRider: rider === "Unassigned" ? undefined : rider } : null);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchesSearch = o.customerName.toLowerCase().includes(search.toLowerCase()) || 
        o.location.toLowerCase().includes(search.toLowerCase()) ||
        o.id.toLowerCase().includes(search.toLowerCase());
      const matchesCity = cityFilter === "All" || o.location.toLowerCase().includes(cityFilter.toLowerCase());
      return matchesSearch && matchesCity;
    });
  }, [orders, search, cityFilter]);

  return (
    <div className="space-y-6">
      {/* HEADER STRIP */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <ShoppingCart className="h-8 w-8 text-accent" /> Orders Operations Command
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Real-time logistical monitoring, Kanban dispatcher, AI bottleneck forecast, and driver assignments.
          </p>
        </div>
      </div>

      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase flex items-center gap-1">
                Active Deliveries
              </span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">
                {stats.active} Orders
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <Clock className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase flex items-center gap-1">
                Completed Today
              </span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">
                {stats.completed} Orders
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center text-success">
              <CheckCircle className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase flex items-center gap-1">
                Transactional Volume
              </span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">
                {stats.totalRev.toLocaleString()} XAF
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Sparkles className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-warning/20 bg-warning/5">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-[0.08em] text-warning uppercase flex items-center gap-1">
                AI Logistics Warnings
              </span>
              <div className="text-2xl font-extrabold mt-1 text-warning">
                {stats.highRisk} High Risk
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center text-warning">
              <AlertTriangle className="h-5 w-5 animate-bounce" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DELAY FORECASTER STRIP */}
      <div className="p-4 bg-accent/5 border border-accent/20 rounded-xl glass flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-accent/15 flex items-center justify-center text-accent animate-pulse">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground">AI Dispatch Delay Forecaster</h4>
            <p className="text-[10px] text-muted-foreground mt-0.5">Heavy rains predicted in Buea (Molyko, Clerks). Slower delivery timelines anticipated.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/10">Rain impact: +15 Mins</Badge>
          <Badge className="bg-sky-500/10 text-sky-500 border border-sky-500/20 hover:bg-sky-500/10">Akwa Traffic: Moderate</Badge>
        </div>
      </div>

      {/* FILTER & SEARCH */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card/40 border border-border/40 p-4 rounded-xl glass shadow-sm">
        <div className="relative w-full sm:max-w-xs group">
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer, order ID..." 
            className="pl-3 bg-muted/30 border-border/50 focus-visible:ring-accent/30"
          />
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <Badge 
            onClick={() => setCityFilter("All")}
            className={`cursor-pointer px-3 py-1 ${cityFilter === "All" ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            All Cities
          </Badge>
          {["Buea", "Douala", "Yaounde"].map((city) => (
            <Badge 
              key={city}
              onClick={() => setCityFilter(city)}
              className={`cursor-pointer px-3 py-1 ${cityFilter === city ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              {city}
            </Badge>
          ))}
        </div>
      </div>

      {/* KANBAN BOARD WRAPPER */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {COLUMNS.map(col => {
          const colOrders = filteredOrders.filter(o => o.status === col);

          return (
            <div key={col} className="min-w-[220px] flex flex-col gap-4 bg-muted/10 p-3.5 border border-border/20 rounded-2xl glass">
              {/* Column Header */}
              <div className="flex justify-between items-center pb-2 border-b border-border/30">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-foreground">{col}</h4>
                  <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-accent/5 text-accent border-accent/20">
                    {colOrders.length}
                  </Badge>
                </div>
              </div>

              {/* Cards Listing */}
              <div className="flex flex-col gap-3 min-h-[350px] overflow-y-auto">
                {colOrders.map(o => (
                  <motion.div
                    key={o.id}
                    layoutId={`order-card-${o.id}`}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setSelectedOrder(o)}
                    className="p-3.5 rounded-xl border border-border/40 bg-card glass shadow-sm cursor-pointer space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-accent">#{o.id}</span>
                        {o.riskFactor === "High" && (
                          <Badge className="bg-destructive/10 text-destructive border border-destructive/20 text-[8px] hover:bg-destructive/10">
                            High Risk
                          </Badge>
                        )}
                      </div>
                      <h5 className="text-xs font-extrabold text-foreground mt-1.5">{o.customerName}</h5>
                      <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" /> {o.location}
                      </p>
                      <p className="text-[10px] text-foreground font-semibold mt-2 bg-muted/40 p-1.5 rounded border border-border/20 line-clamp-2">
                        {o.itemsDescription}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-border/20 space-y-2.5">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-muted-foreground font-medium">ETA:</span>
                        <span className="font-extrabold text-foreground">{o.eta > 0 ? `${o.eta} Mins` : "Delivered"}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-muted-foreground font-medium">Rider:</span>
                        <span className="font-extrabold text-foreground text-[9px]">{o.assignedRider || "Unassigned"}</span>
                      </div>
                      <div className="flex justify-between items-center pt-1 gap-2">
                        <span className="text-xs font-black text-foreground">{o.totalCost.toLocaleString()} XAF</span>
                        {col !== "Delivered" && (
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-6 w-6 rounded-full bg-accent/15 text-accent hover:bg-accent hover:text-accent-foreground"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveStatus(o.id, col, "next");
                            }}
                          >
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {colOrders.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <ShoppingCart className="h-8 w-8 text-muted-foreground/30 mb-2" />
                    <span className="text-[10px] text-muted-foreground">No orders in this pool</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* DETAIL DRAWER */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="fixed inset-0 bg-black z-[900]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-card border-l border-border/40 z-[950] p-6 shadow-2xl glass overflow-y-auto flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center border-b border-border/40 pb-4 mb-5">
                  <h3 className="text-lg font-bold text-foreground">Order Dispatch Panel</h3>
                  <Button size="icon" variant="ghost" onClick={() => setSelectedOrder(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-6 text-xs">
                  <div>
                    <Badge variant="outline" className="border-accent/40 bg-accent/5 text-accent font-semibold mb-2">
                      Order ID: {selectedOrder.id}
                    </Badge>
                    <h2 className="text-xl font-extrabold tracking-tight text-foreground">{selectedOrder.customerName}</h2>
                    <p className="text-muted-foreground mt-1 flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-accent" /> {selectedOrder.location}
                    </p>
                  </div>

                  <div className="p-4 bg-muted/20 border border-border/40 rounded-xl glass space-y-2">
                    <h4 className="font-bold text-foreground">Items Checklist</h4>
                    <p className="text-muted-foreground">{selectedOrder.itemsDescription}</p>
                    <div className="pt-2 flex justify-between font-extrabold text-foreground text-sm border-t border-border/20">
                      <span>Total Value</span>
                      <span className="text-accent">{selectedOrder.totalCost.toLocaleString()} XAF</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-muted-foreground uppercase tracking-wider text-[10px]">Assign Dispatch Rider</label>
                    <select 
                      value={selectedOrder.assignedRider || "Unassigned"}
                      onChange={(e) => handleAssignRider(selectedOrder.id, e.target.value)}
                      className="w-full bg-muted/30 border border-border/40 rounded-lg p-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 cursor-pointer"
                    >
                      {RIDERS.map(rider => (
                        <option key={rider} value={rider} className="bg-card">{rider}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-foreground uppercase tracking-wider text-[10px]">Operational Timeline</h4>
                    <div className="space-y-3 pl-2.5 border-l-2 border-accent/20">
                      <div className="relative">
                        <span className="absolute -left-[15px] top-0 h-2 w-2 rounded-full bg-accent" />
                        <div className="pl-3.5">
                          <h5 className="font-bold text-foreground">Order Placed</h5>
                          <span className="text-[10px] text-muted-foreground">{selectedOrder.createdAt}</span>
                        </div>
                      </div>
                      <div className="relative">
                        <span className={`absolute -left-[15px] top-0 h-2 w-2 rounded-full ${selectedOrder.status !== "Pending" ? "bg-accent" : "bg-muted"}`} />
                        <div className="pl-3.5">
                          <h5 className={`font-bold ${selectedOrder.status !== "Pending" ? "text-foreground" : "text-muted-foreground"}`}>Preparation Chamber</h5>
                          <span className="text-[10px] text-muted-foreground">Kitchen allocation dispatch</span>
                        </div>
                      </div>
                      <div className="relative">
                        <span className={`absolute -left-[15px] top-0 h-2 w-2 rounded-full ${selectedOrder.status === "Transit" || selectedOrder.status === "Delivered" ? "bg-accent" : "bg-muted"}`} />
                        <div className="pl-3.5">
                          <h5 className={`font-bold ${selectedOrder.status === "Transit" || selectedOrder.status === "Delivered" ? "text-foreground" : "text-muted-foreground"}`}>Active Logistics Transit</h5>
                          <span className="text-[10px] text-muted-foreground">Rider assigned: {selectedOrder.assignedRider || "None"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-border/40 pt-4 mt-6 flex gap-3">
                <Button className="flex-1" onClick={() => {
                  toast.success(`Force updated dispatch for order #${selectedOrder.id}`);
                  setSelectedOrder(null);
                }}>
                  Commit Dispatch
                </Button>
                <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                  Close
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
