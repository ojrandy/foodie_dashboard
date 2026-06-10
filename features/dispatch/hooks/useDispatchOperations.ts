import { useState, useCallback } from "react";

export interface Rider {
  id: string;
  name: string;
  phone: string;
  region: string;
  vehicleType: "Motorcycle" | "Car" | "Van";
  status: "Available" | "Assigned" | "In Transit" | "Offline" | "Suspended";
  currentDeliveries: number;
  completedDeliveries: number;
  rating: number;
}

export interface DispatchOrder {
  id: string;
  customerName: string;
  location: string;
  eta: string;
  status: "Waiting Assignment" | "Assigned" | "Picked Up" | "In Transit" | "Delivered" | "Failed Delivery";
  cost: number;
  riderId?: string;
}

export interface Incident {
  id: string;
  type: "Late Delivery" | "Failed Delivery" | "Customer Complaint" | "Lost Order" | "Traffic Delay";
  severity: "High" | "Medium" | "Low";
  description: string;
  timestamp: string;
  orderId: string;
}

const mockRiders: Rider[] = [
  { id: "RDR-001", name: "Alain Nchinda", phone: "677-123-456", region: "Buea", vehicleType: "Motorcycle", status: "Available", currentDeliveries: 0, completedDeliveries: 142, rating: 4.8 },
  { id: "RDR-002", name: "Elvis Tabe", phone: "677-987-654", region: "Douala", vehicleType: "Motorcycle", status: "In Transit", currentDeliveries: 1, completedDeliveries: 89, rating: 4.5 },
  { id: "RDR-003", name: "Samuel Eto", phone: "699-112-233", region: "Yaoundé", vehicleType: "Car", status: "Assigned", currentDeliveries: 1, completedDeliveries: 210, rating: 4.9 },
  { id: "RDR-004", name: "Marc Ona", phone: "655-443-322", region: "Buea", vehicleType: "Motorcycle", status: "Offline", currentDeliveries: 0, completedDeliveries: 45, rating: 4.2 },
  { id: "RDR-005", name: "Thierry N.", phone: "677-555-777", region: "Douala", vehicleType: "Van", status: "Suspended", currentDeliveries: 0, completedDeliveries: 12, rating: 3.8 },
];

const mockDispatchOrders: DispatchOrder[] = [
  { id: "ORD-1024", customerName: "Theresa Mboa", location: "Molyko, Buea", eta: "45 Mins", status: "Waiting Assignment", cost: 12500 },
  { id: "ORD-1025", customerName: "Jean-Pierre", location: "Akwa, Douala", eta: "35 Mins", status: "Assigned", cost: 28000, riderId: "RDR-003" },
  { id: "ORD-1026", customerName: "Mary N.", location: "Bastos, Yaoundé", eta: "25 Mins", status: "In Transit", cost: 15500, riderId: "RDR-002" },
  { id: "ORD-1027", customerName: "Frank Ndip", location: "Clerks, Buea", eta: "12 Mins", status: "Picked Up", cost: 9500, riderId: "RDR-001" },
  { id: "ORD-1028", customerName: "Solange M.", location: "Bonapriso, Douala", eta: "-", status: "Delivered", cost: 35000, riderId: "RDR-002" },
];

const mockIncidents: Incident[] = [
  { id: "INC-001", type: "Traffic Delay", severity: "Low", description: "Heavy traffic at Ndokoti causing 15min delay.", timestamp: "10:24 AM", orderId: "ORD-1026" },
  { id: "INC-002", type: "Failed Delivery", severity: "High", description: "Customer uncontactable at drop-off location.", timestamp: "09:15 AM", orderId: "ORD-1010" },
  { id: "INC-003", type: "Customer Complaint", severity: "Medium", description: "Food arrived cold. Refund requested.", timestamp: "Yesterday", orderId: "ORD-0995" },
];

export function useDispatchOperations() {
  const [riders, setRiders] = useState<Rider[]>(mockRiders);
  const [orders, setOrders] = useState<DispatchOrder[]>(mockDispatchOrders);
  const [incidents] = useState<Incident[]>(mockIncidents);

  const kpis = {
    activeRiders: riders.filter(r => ["Assigned", "In Transit"].includes(r.status)).length,
    availableRiders: riders.filter(r => r.status === "Available").length,
    busyRiders: riders.filter(r => ["Assigned", "In Transit"].includes(r.status)).length,
    waitingAssignment: orders.filter(o => o.status === "Waiting Assignment").length,
    inTransit: orders.filter(o => o.status === "In Transit").length,
    completedDeliveries: 450, // mock high number
    delayedDeliveries: 12,
    avgDeliveryTime: "38 mins",
    successRate: "98.5%",
    satisfactionScore: "4.8/5"
  };

  const moveOrder = useCallback((orderId: string, newStatus: DispatchOrder["status"]) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  }, []);

  const assignRider = useCallback((orderId: string, riderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, riderId, status: "Assigned" } : o));
    setRiders(prev => prev.map(r => r.id === riderId ? { ...r, status: "Assigned" } : r));
  }, []);

  return {
    riders,
    orders,
    incidents,
    kpis,
    moveOrder,
    assignRider,
  };
}
