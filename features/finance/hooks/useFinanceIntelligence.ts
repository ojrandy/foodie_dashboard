import { useState } from "react";

export type TransactionStatus = "Pending" | "Completed" | "Failed" | "Refunded" | "Reversed";
export type PayoutStatus = "Pending" | "Processing" | "Paid" | "Failed";
export type RefundStatus = "Pending" | "Approved" | "Rejected" | "Completed";

export interface Transaction {
  id: string;
  orderId: string;
  customer: string;
  amount: number;
  method: string;
  status: TransactionStatus;
  date: string;
  region: string;
}

export interface RiderPayout {
  id: string;
  riderName: string;
  deliveries: number;
  earnings: number;
  bonuses: number;
  adjustments: number;
  status: PayoutStatus;
}

export interface Refund {
  id: string;
  orderId: string;
  reason: string;
  amount: number;
  status: RefundStatus;
  date: string;
}

export interface FinanceFeedEvent {
  id: string;
  title: string;
  time: string;
  type: "transaction" | "refund" | "payout" | "milestone" | "alert";
}

const mockTransactions: Transaction[] = [
  { id: "TXN-84920", orderId: "ORD-1029", customer: "Ahmadou Bello", amount: 15000, method: "MTN MoMo", status: "Completed", date: "Today, 14:30", region: "Adamawa" },
  { id: "TXN-84921", orderId: "ORD-1030", customer: "Marie Claire", amount: 8500, method: "Orange Money", status: "Pending", date: "Today, 14:15", region: "Centre" },
  { id: "TXN-84922", orderId: "ORD-1031", customer: "John Doe", amount: 45000, method: "Credit Card", status: "Completed", date: "Today, 13:45", region: "Littoral" },
  { id: "TXN-84923", orderId: "ORD-1032", customer: "Fatima Yusuf", amount: 12000, method: "MTN MoMo", status: "Failed", date: "Today, 12:20", region: "North" },
  { id: "TXN-84924", orderId: "ORD-1033", customer: "Paul Biya", amount: 150000, method: "Bank Transfer", status: "Completed", date: "Yesterday, 18:00", region: "Centre" },
  { id: "TXN-84925", orderId: "ORD-1034", customer: "Sarah Ndi", amount: 6000, method: "Cash on Delivery", status: "Refunded", date: "Yesterday, 16:30", region: "North West" },
  { id: "TXN-84926", orderId: "ORD-1035", customer: "Daniel Ek", amount: 24000, method: "Orange Money", status: "Completed", date: "Yesterday, 15:10", region: "Littoral" },
  { id: "TXN-84927", orderId: "ORD-1036", customer: "Grace Orock", amount: 9500, method: "MTN MoMo", status: "Reversed", date: "Yesterday, 14:05", region: "South West" },
];

const mockPayouts: RiderPayout[] = [
  { id: "PAY-101", riderName: "Jean Paul", deliveries: 45, earnings: 67500, bonuses: 5000, adjustments: 0, status: "Paid" },
  { id: "PAY-102", riderName: "Moussa Ali", deliveries: 38, earnings: 57000, bonuses: 2000, adjustments: -1500, status: "Processing" },
  { id: "PAY-103", riderName: "Kevin Njoh", deliveries: 52, earnings: 78000, bonuses: 10000, adjustments: 0, status: "Pending" },
  { id: "PAY-104", riderName: "Amadou Toure", deliveries: 20, earnings: 30000, bonuses: 0, adjustments: -500, status: "Paid" },
  { id: "PAY-105", riderName: "Eric Ngwa", deliveries: 15, earnings: 22500, bonuses: 0, adjustments: 0, status: "Failed" },
];

const mockRefunds: Refund[] = [
  { id: "REF-501", orderId: "ORD-0988", reason: "Order delayed by 2 hours", amount: 15000, status: "Approved", date: "Today" },
  { id: "REF-502", orderId: "ORD-0992", reason: "Missing items (Plantain)", amount: 2000, status: "Pending", date: "Today" },
  { id: "REF-503", orderId: "ORD-0950", reason: "Customer changed mind", amount: 8500, status: "Rejected", date: "Yesterday" },
  { id: "REF-504", orderId: "ORD-0934", reason: "Wrong meal delivered", amount: 12000, status: "Completed", date: "Yesterday" },
];

const mockFeedEvents: FinanceFeedEvent[] = [
  { id: "FF-1", title: "New transaction completed: 15,000 F", time: "2 mins ago", type: "transaction" },
  { id: "FF-2", title: "Refund REF-501 approved", time: "15 mins ago", type: "refund" },
  { id: "FF-3", title: "Rider payout PAY-101 processed successfully", time: "1 hour ago", type: "payout" },
  { id: "FF-4", title: "Milestone: Daily revenue crossed 500,000 F", time: "3 hours ago", type: "milestone" },
  { id: "FF-5", title: "Large order received: 150,000 F", time: "5 hours ago", type: "alert" },
];

export function useFinanceIntelligence() {
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [payouts] = useState<RiderPayout[]>(mockPayouts);
  const [refunds] = useState<Refund[]>(mockRefunds);
  const [feed] = useState<FinanceFeedEvent[]>(mockFeedEvents);

  const kpis = {
    totalRevenue: 45000000,
    netRevenue: 38500000,
    grossRevenue: 45000000,
    todayRevenue: 520000,
    weeklyRevenue: 3450000,
    monthlyRevenue: 14500000,
    totalTransactions: 15420,
    avgOrderValue: 8500,
    deliveryRevenue: 4500000,
    refundAmount: 250000,
    riderPayouts: 3800000,
    operatingCosts: 2400000,
    profitMargin: 24.5,
    outstandingPayments: 450000
  };

  return {
    transactions,
    payouts,
    refunds,
    feed,
    kpis
  };
}
