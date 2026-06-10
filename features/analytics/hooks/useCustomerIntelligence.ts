import { useState } from "react";

export type CustomerStatus = "Active" | "Inactive" | "VIP" | "At Risk" | "New";

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  region: string;
  totalOrders: number;
  totalSpend: number;
  lastOrder: string;
  joinDate: string;
  status: CustomerStatus;
  favoriteMeals: string[];
  behavioralScore: number;
  engagementScore: number;
  loyaltyScore: number;
  retentionScore: number;
  paymentMethod: string;
}

const mockCustomers: Customer[] = [
  { id: "CUST-001", name: "Ahmadou Bello", phone: "677123456", email: "ahmadou@example.com", region: "Adamawa", totalOrders: 42, totalSpend: 250000, lastOrder: "2 days ago", joinDate: "12 Jan 2024", status: "VIP", favoriteMeals: ["Egusi Soup", "Jollof Rice"], behavioralScore: 92, engagementScore: 88, loyaltyScore: 95, retentionScore: 98, paymentMethod: "MTN Mobile Money" },
  { id: "CUST-002", name: "Marie Claire", phone: "699987654", email: "marie.c@example.com", region: "Centre", totalOrders: 5, totalSpend: 30000, lastOrder: "1 month ago", joinDate: "05 Mar 2024", status: "At Risk", favoriteMeals: ["Ndole", "Plantain"], behavioralScore: 45, engagementScore: 30, loyaltyScore: 40, retentionScore: 35, paymentMethod: "Orange Money" },
  { id: "CUST-003", name: "John Doe", phone: "675554433", email: "jdoe@example.com", region: "South West", totalOrders: 15, totalSpend: 85000, lastOrder: "1 week ago", joinDate: "20 Feb 2024", status: "Active", favoriteMeals: ["Eru", "Waterfufu"], behavioralScore: 78, engagementScore: 75, loyaltyScore: 80, retentionScore: 85, paymentMethod: "Card" },
  { id: "CUST-004", name: "Fatima Yusuf", phone: "688112233", email: "fyusuf@example.com", region: "North", totalOrders: 2, totalSpend: 15000, lastOrder: "3 days ago", joinDate: "01 Jun 2024", status: "New", favoriteMeals: ["Achu"], behavioralScore: 60, engagementScore: 85, loyaltyScore: 50, retentionScore: 90, paymentMethod: "MTN Mobile Money" },
  { id: "CUST-005", name: "Paul Biya", phone: "699555111", email: "p.biya@example.com", region: "Centre", totalOrders: 120, totalSpend: 1500000, lastOrder: "5 hours ago", joinDate: "01 Jan 2023", status: "VIP", favoriteMeals: ["Ndole", "Mbongo Tchobi"], behavioralScore: 99, engagementScore: 95, loyaltyScore: 99, retentionScore: 99, paymentMethod: "Bank Transfer" },
  { id: "CUST-006", name: "Sarah Ndi", phone: "670001122", email: "sndi@example.com", region: "North West", totalOrders: 0, totalSpend: 0, lastOrder: "Never", joinDate: "10 Apr 2024", status: "Inactive", favoriteMeals: [], behavioralScore: 10, engagementScore: 5, loyaltyScore: 0, retentionScore: 10, paymentMethod: "Cash" },
  { id: "CUST-007", name: "Daniel Ek", phone: "671239876", email: "dek@example.com", region: "Littoral", totalOrders: 28, totalSpend: 140000, lastOrder: "1 day ago", joinDate: "15 Nov 2023", status: "Active", favoriteMeals: ["Koki", "Plantain"], behavioralScore: 85, engagementScore: 82, loyaltyScore: 75, retentionScore: 90, paymentMethod: "Orange Money" },
  { id: "CUST-008", name: "Grace Orock", phone: "680998877", email: "graceo@example.com", region: "South West", totalOrders: 1, totalSpend: 8000, lastOrder: "2 weeks ago", joinDate: "20 May 2024", status: "At Risk", favoriteMeals: ["Beans & Plantain"], behavioralScore: 35, engagementScore: 40, loyaltyScore: 20, retentionScore: 45, paymentMethod: "MTN Mobile Money" }
];

export interface FeedEvent {
  id: string;
  title: string;
  time: string;
  type: "new" | "vip" | "review" | "refund" | "order";
}

const mockFeedEvents: FeedEvent[] = [
  { id: "FE-1", title: "New customer registered from Buea", time: "2 mins ago", type: "new" },
  { id: "FE-2", title: "VIP customer Paul placed an order of 45,000 F", time: "15 mins ago", type: "vip" },
  { id: "FE-3", title: "Customer submitted 5-star review for Egusi", time: "1 hour ago", type: "review" },
  { id: "FE-4", title: "Customer requested refund for delayed order", time: "2 hours ago", type: "refund" },
  { id: "FE-5", title: "Customer completed first order", time: "3 hours ago", type: "order" },
];

export function useCustomerIntelligence() {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [feed] = useState<FeedEvent[]>(mockFeedEvents);

  const kpis = {
    totalCustomers: 12450,
    activeCustomers: 8200,
    returningCustomers: 6400,
    newSignups: 450,
    retentionRate: 78,
    avgOrderValue: 8500,
    customerLTV: 145000,
    monthlyGrowth: 12.5
  };

  return {
    customers,
    feed,
    kpis
  };
}
