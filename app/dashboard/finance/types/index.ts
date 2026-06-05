export type TransactionType = "income" | "expense" | "refund";
export type TransactionStatus = "completed" | "pending" | "failed";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  status: TransactionStatus;
  category: string;
  reference: string;
}

export interface RevenueSummary {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  revenueChange: number;
  expenseChange: number;
  profitChange: number;
}

export interface RevenueBreakdown {
  label: string;
  value: number;
  percentage: number;
}
