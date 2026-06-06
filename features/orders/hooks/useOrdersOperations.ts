import { useState, useMemo } from 'react';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  recipe: string;
  itemsCount: number;
  ingredients: string[];
  region: string;
  address: string;
  totalCost: number;
  deliveryFee: number;
  serviceFee: number;
  status: "Pending" | "Confirmed" | "Preparing" | "Assigned" | "Transit" | "Delivered" | "Cancelled";
  paymentStatus: "Paid" | "Pending" | "Failed" | "Refunded";
  assignedRider?: string;
  eta: number; // minutes
  createdAt: string;
  confirmedAt?: string;
  preparingAt?: string;
  assignedAt?: string;
  transitAt?: string;
  deliveredAt?: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-9421",
    customerName: "Alice Nchinda",
    phone: "+237 671234567",
    recipe: "Egusi Soup Combo",
    itemsCount: 3,
    ingredients: ["Egusi", "Beef", "Garri", "Palm Oil"],
    region: "Buea Central",
    address: "Clerks Quarters, Street 2",
    totalCost: 12500,
    deliveryFee: 1000,
    serviceFee: 250,
    status: "Delivered",
    paymentStatus: "Paid",
    assignedRider: "Samuel E.",
    eta: 0,
    createdAt: "10:15 AM",
    confirmedAt: "10:17 AM",
    preparingAt: "10:20 AM",
    assignedAt: "10:35 AM",
    transitAt: "10:45 AM",
    deliveredAt: "11:10 AM"
  },
  {
    id: "ORD-9422",
    customerName: "Jean-Paul Etoundi",
    phone: "+237 692345678",
    recipe: "Ndole & Plantains",
    itemsCount: 2,
    ingredients: ["Ndole Leaves", "Peanuts", "Plantains", "Fish"],
    region: "Akwa, Douala",
    address: "Avenue De Gaulle",
    totalCost: 15000,
    deliveryFee: 1500,
    serviceFee: 300,
    status: "Transit",
    paymentStatus: "Paid",
    assignedRider: "Marc O.",
    eta: 15,
    createdAt: "12:30 PM",
    confirmedAt: "12:35 PM",
    preparingAt: "12:40 PM",
    assignedAt: "1:15 PM",
    transitAt: "1:20 PM"
  },
  {
    id: "ORD-9423",
    customerName: "Mary Ayuk",
    phone: "+237 673456789",
    recipe: "Achu Soup",
    itemsCount: 4,
    ingredients: ["Taro", "Yellow Soup", "Cow Skin"],
    region: "Molyko, Buea",
    address: "UB Junction",
    totalCost: 8500,
    deliveryFee: 500,
    serviceFee: 150,
    status: "Preparing",
    paymentStatus: "Pending",
    eta: 40,
    createdAt: "1:15 PM",
    confirmedAt: "1:20 PM",
    preparingAt: "1:25 PM"
  },
  {
    id: "ORD-9424",
    customerName: "Divine Tabe",
    phone: "+237 684567890",
    recipe: "Eru & Waterfufu",
    itemsCount: 1,
    ingredients: ["Eru", "Waterfufu", "Meat", "Crayfish"],
    region: "Bastos, Yaounde",
    address: "Street 4, Bastos",
    totalCost: 18000,
    deliveryFee: 2000,
    serviceFee: 400,
    status: "Pending",
    paymentStatus: "Paid",
    eta: 60,
    createdAt: "1:45 PM"
  },
  {
    id: "ORD-9425",
    customerName: "Elvis Ndi",
    phone: "+237 655678901",
    recipe: "Jollof Rice Supreme",
    itemsCount: 5,
    ingredients: ["Rice", "Tomatoes", "Chicken", "Spices"],
    region: "Bonamoussadi, Douala",
    address: "Makepe",
    totalCost: 22000,
    deliveryFee: 1200,
    serviceFee: 450,
    status: "Cancelled",
    paymentStatus: "Refunded",
    eta: 0,
    createdAt: "9:00 AM",
    confirmedAt: "9:05 AM"
  }
];

export function useOrdersOperations() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const kpis = useMemo(() => {
    return {
      totalToday: orders.length + 142,
      pending: orders.filter(o => o.status === "Pending").length + 12,
      confirmed: orders.filter(o => o.status === "Confirmed").length + 5,
      preparing: orders.filter(o => o.status === "Preparing").length + 18,
      transit: orders.filter(o => o.status === "Transit").length + 34,
      delivered: orders.filter(o => o.status === "Delivered").length + 89,
      cancelled: orders.filter(o => o.status === "Cancelled").length + 3,
      avgDeliveryTime: "42 mins",
      avgOrderValue: "14,500 XAF",
      revenue: "2,450,000 XAF"
    };
  }, [orders]);

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  return {
    orders,
    kpis,
    selectedOrder,
    setSelectedOrder,
    updateOrderStatus
  };
}
