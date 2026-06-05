"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Transaction } from "../types";

interface FinanceTableProps {
  transactions: Transaction[];
  filterType: string;
  onFilterChange: (val: string) => void;
}

export function FinanceTable({
  transactions,
  filterType,
  onFilterChange,
}: FinanceTableProps) {
  return (
    <Card className="glass">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">Transaction History</CardTitle>
          <div className="flex gap-1.5">
            {["all", "income", "expense", "refund"].map((type) => (
              <Badge
                key={type}
                onClick={() => onFilterChange(type)}
                className={`cursor-pointer px-2.5 py-1 text-[10px] ${
                  filterType === type
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-border/40 bg-muted/20 text-muted-foreground uppercase font-bold tracking-wider">
                <th className="p-4">Description</th>
                <th className="p-4">Category</th>
                <th className="p-4">Amount</th>
                <th className="p-4 text-center">Type</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-muted/10 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-foreground">{txn.description}</div>
                    <div className="text-[9px] text-muted-foreground">{txn.reference}</div>
                  </td>
                  <td className="p-4 text-muted-foreground">{txn.category}</td>
                  <td className="p-4 font-extrabold text-foreground">
                    {txn.amount.toLocaleString()} XAF
                  </td>
                  <td className="p-4 text-center">
                    <Badge
                      variant="outline"
                      className={
                        txn.type === "income"
                          ? "border-success/30 text-success"
                          : txn.type === "expense"
                          ? "border-destructive/30 text-destructive"
                          : "border-warning/30 text-warning"
                      }
                    >
                      {txn.type}
                    </Badge>
                  </td>
                  <td className="p-4 text-center">
                    <Badge
                      className={
                        txn.status === "completed"
                          ? "bg-success/10 text-success border border-success/20 hover:bg-success/10"
                          : txn.status === "pending"
                          ? "bg-warning/10 text-warning border border-warning/20 hover:bg-warning/10"
                          : "bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/10"
                      }
                    >
                      {txn.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right text-muted-foreground">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
