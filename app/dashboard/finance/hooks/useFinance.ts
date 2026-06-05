"use client";

import { useState, useMemo } from "react";
import type {
  Transaction,
  RevenueSummary,
  RevenueBreakdown,
} from "../types";

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "txn-001",
    description: "Egusi Soup Combo x4 - Molyko",
    amount: 12500,
    type: "income",
    date: "2026-06-03",
    status: "completed",
    category: "Food Orders",
    reference: "ORD-1024",
  },
  {
    id: "txn-002",
    description: "Ndole Plan Deluxe - Akwa",
    amount: 28000,
    type: "income",
    date: "2026-06-03",
    status: "completed",
    category: "Food Orders",
    reference: "ORD-1025",
  },
  {
    id: "txn-003",
    description: "Rider Fleet Fuel Reimbursement",
    amount: 45000,
    type: "expense",
    date: "2026-06-03",
    status: "completed",
    category: "Operations",
    reference: "EXP-789",
  },
  {
    id: "txn-004",
    description: "Kitchen Equipment Maintenance",
    amount: 120000,
    type: "expense",
    date: "2026-06-02",
    status: "pending",
    category: "Maintenance",
    reference: "EXP-790",
  },
  {
    id: "txn-005",
    description: "Achu Yellow Soup - Bastos",
    amount: 15500,
    type: "income",
    date: "2026-06-02",
    status: "completed",
    category: "Food Orders",
    reference: "ORD-1026",
  },
  {
    id: "txn-006",
    description: "Refund: Student Budget Cup",
    amount: 9500,
    type: "refund",
    date: "2026-06-01",
    status: "completed",
    category: "Refunds",
    reference: "ORD-1027",
  },
  {
    id: "txn-007",
    description: "Market Supply - Fresh Produce",
    amount: 85000,
    type: "expense",
    date: "2026-06-01",
    status: "completed",
    category: "Supplies",
    reference: "EXP-791",
  },
  {
    id: "txn-008",
    description: "Koki Wrap Plan x6 - Bonapriso",
    amount: 35000,
    type: "income",
    date: "2026-06-01",
    status: "completed",
    category: "Food Orders",
    reference: "ORD-1028",
  },
];

const BREAKDOWN: RevenueBreakdown[] = [
  { label: "Food Orders", value: 91000, percentage: 68 },
  { label: "Catering Events", value: 25000, percentage: 19 },
  { label: "Subscription Fees", value: 12000, percentage: 9 },
  { label: "Other Services", value: 5500, percentage: 4 },
];

export function useFinance() {
  const [transactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [filterType, setFilterType] = useState<string>("all");

  const summary: RevenueSummary = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((s, t) => s + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);
    const refunds = transactions
      .filter((t) => t.type === "refund")
      .reduce((s, t) => s + t.amount, 0);
    const net = income - expenses - refunds;
    return {
      totalRevenue: income,
      totalExpenses: expenses + refunds,
      netProfit: net,
      revenueChange: 15.3,
      expenseChange: -3.2,
      profitChange: 22.1,
    };
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    if (filterType === "all") return transactions;
    return transactions.filter((t) => t.type === filterType);
  }, [transactions, filterType]);

  const revenueBreakdown = BREAKDOWN;

  return {
    transactions: filteredTransactions,
    summary,
    revenueBreakdown,
    filterType,
    setFilterType,
  };
}
