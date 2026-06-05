"use client";

import { useState, useMemo } from "react";
import type { Rider, ActiveDelivery, ZonePerformance, DispatchStats } from "../types";

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

const ZONE_PERFORMANCE: ZonePerformance[] = [
  { zone: "Molyko", deliveries: 47, avgTime: 28 },
  { zone: "Akwa", deliveries: 63, avgTime: 22 },
  { zone: "Bastos", deliveries: 38, avgTime: 35 },
  { zone: "Bonapriso", deliveries: 29, avgTime: 30 },
  { zone: "Buea Town", deliveries: 54, avgTime: 26 },
];

export function useDispatch() {
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);

  const stats: DispatchStats = useMemo(
    () => ({
      activeRiders: RIDERS.filter((r) => r.status === "Active").length,
      totalDeliveries: RIDERS.reduce((s, r) => s + r.deliveriesCompleted, 0),
      avgRating: (RIDERS.reduce((s, r) => s + r.rating, 0) / RIDERS.length).toFixed(1),
      highRiskRoutes: ACTIVE_DELIVERIES.filter((d) => d.risk === "High").length,
    }),
    []
  );

  return {
    riders: RIDERS,
    activeDeliveries: ACTIVE_DELIVERIES,
    zonePerformance: ZONE_PERFORMANCE,
    stats,
    selectedRider,
    setSelectedRider,
  };
}
