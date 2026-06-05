"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useDispatch } from "../hooks/useDispatch";
import { DispatchHeader } from "./DispatchHeader";
import { DispatchCard } from "./DispatchCard";
import { DispatchLiveTracker } from "./DispatchLiveTracker";
import { DispatchZoneChart } from "./DispatchZoneChart";
import { DispatchTable } from "./DispatchTable";
import { DispatchRiderDrawer } from "./DispatchRiderDrawer";

export function DispatchMain() {
  const {
    riders,
    activeDeliveries,
    zonePerformance,
    stats,
    selectedRider,
    setSelectedRider,
  } = useDispatch();

  const [mounted, setMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <div className="space-y-6">
      <DispatchHeader />
      <DispatchCard stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <DispatchLiveTracker deliveries={activeDeliveries} />
        <DispatchZoneChart data={zonePerformance} mounted={mounted} />
      </div>
      <DispatchTable
        riders={riders}
        onSelectRider={(rider) => {
          setSelectedRider(rider);
          setDrawerOpen(true);
          toast.info(`Viewing dispatch profile for ${rider.name}`);
        }}
      />
      <DispatchRiderDrawer
        rider={selectedRider}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedRider(null);
        }}
      />
    </div>
  );
}
