"use client";

import { useFinance } from "../hooks/useFinance";
import { FinanceHeader } from "./FinanceHeader";
import { FinanceCard } from "./FinanceCard";
import { FinanceTable } from "./FinanceTable";

export function FinanceMain() {
  const { transactions, summary, filterType, setFilterType } = useFinance();

  return (
    <div className="space-y-6">
      <FinanceHeader />
      <FinanceCard summary={summary} />
      <FinanceTable
        transactions={transactions}
        filterType={filterType}
        onFilterChange={setFilterType}
      />
    </div>
  );
}
