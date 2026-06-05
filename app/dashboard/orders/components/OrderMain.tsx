"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useOrders } from "../hooks/useOrders";
import { OrderHeader } from "./OrderHeader";
import { OrderCard } from "./OrderCard";
import { OrderFilter } from "./OrderFilter";
import { OrderKanban } from "./OrderKanban";
import { OrderDrawer } from "./OrderDrawer";

export function OrderMain() {
  const {
    filteredOrders,
    stats,
    search,
    setSearch,
    cityFilter,
    setCityFilter,
    selectedOrder,
    setSelectedOrder,
    handleMoveStatus,
    columns,
  } = useOrders();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSelectOrder = (order: typeof filteredOrders[0]) => {
    setSelectedOrder(order);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      <OrderHeader />
      <OrderCard stats={stats} />
      <div className="p-4 bg-accent/5 border border-accent/20 rounded-xl glass flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h4 className="text-xs font-bold text-foreground">AI Dispatch Delay Forecaster</h4>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Heavy rains predicted in Buea (Molyko, Clerks). Slower delivery timelines anticipated.
          </p>
        </div>
      </div>
      <OrderFilter
        search={search}
        onSearchChange={setSearch}
        cityFilter={cityFilter}
        onCityChange={setCityFilter}
      />
      <OrderKanban
        columns={columns}
        orders={filteredOrders}
        onMoveStatus={handleMoveStatus}
        onSelectOrder={handleSelectOrder}
      />
      <OrderDrawer
        order={selectedOrder}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedOrder(null);
        }}
        onAssignRider={(orderId, rider) => {
          toast.success(`Assigned rider ${rider} to Order #${orderId}`);
          setDrawerOpen(false);
          setSelectedOrder(null);
        }}
      />
    </div>
  );
}
