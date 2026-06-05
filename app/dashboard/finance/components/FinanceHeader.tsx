"use client";

import { Wallet } from "lucide-react";

export function FinanceHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          <Wallet className="h-8 w-8 text-accent" /> Financial Overview
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Revenue tracking, expense management, transaction history, and profitability analysis.
        </p>
      </div>
    </div>
  );
}
