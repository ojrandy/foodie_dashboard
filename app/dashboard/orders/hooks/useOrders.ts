"use client";

import { useState, useMemo } from "react";
import type { Order, OrderStats } from "../types";

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
    itemsDescription: "Egusi Soup Combo, 2x Yellow Garri Packs, Fresh Cocoyam",
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
    itemsDescription: "Ndole Plan Deluxe, Fried Plantain, Smoked Shrimps",
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
    itemsDescription: "Achu Yellow Soup supreme, Smoked Cow Skin (Canda)",
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
    riskFactor: "High",
    itemsDescription: "Student Budget Rice, Fried Eggs, Chili Pepper paste",
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
    itemsDescription: "Koki Wrap Plan, 1x Red Palm oil large bottle, Extra Plantains",
  },
];

const COLUMNS: Order["status"][] = [
  "Pending",
  "Confirmed",
  "Preparing",
  "Transit",
  "Delivered",
];

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const stats: OrderStats = useMemo(() => {
    const active = orders.filter((o) => o.status !== "Delivered").length;
    const completed = orders.filter((o) => o.status === "Delivered").length;
    const totalRev = orders.reduce((sum, o) => sum + o.totalCost, 0);
    const highRisk = orders.filter(
      (o) => o.riskFactor === "High" && o.status !== "Delivered"
    ).length;
    return { active, completed, totalRev, highRisk };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.customerName.toLowerCase().includes(search.toLowerCase()) ||
        o.location.toLowerCase().includes(search.toLowerCase()) ||
        o.id.toLowerCase().includes(search.toLowerCase());
      const matchesCity =
        cityFilter === "All" ||
        o.location.toLowerCase().includes(cityFilter.toLowerCase());
      return matchesSearch && matchesCity;
    });
  }, [orders, search, cityFilter]);

  const handleMoveStatus = (
    orderId: string,
    currentStatus: Order["status"],
    direction: "next" | "prev"
  ) => {
    const currentIndex = COLUMNS.indexOf(currentStatus);
    let nextIndex = currentIndex;
    if (direction === "next" && currentIndex < COLUMNS.length - 1)
      nextIndex = currentIndex + 1;
    else if (direction === "prev" && currentIndex > 0)
      nextIndex = currentIndex - 1;
    const nextStatus = COLUMNS[nextIndex];
    if (nextStatus === currentStatus) return;

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            status: nextStatus,
            eta: nextStatus === "Delivered" ? 0 : Math.max(5, o.eta - 10),
          };
        }
        return o;
      })
    );
  };

  const columns = COLUMNS;

  return {
    orders,
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
  };
}
