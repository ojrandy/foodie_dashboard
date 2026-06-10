import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFinanceIntelligence, Transaction } from "../hooks/useFinanceIntelligence";
import { Search, Filter, CreditCard, ChevronLeft, ChevronRight, ArrowUpDown, X, User, MapPin, Calendar, Smartphone, Building, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function TransactionRegistry() {
  const { transactions } = useFinanceIntelligence();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Transaction>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);

  const itemsPerPage = 8;

  const handleSort = (field: keyof Transaction) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const filtered = transactions.filter(t => 
    t.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    if (valA < valB) return sortDir === "asc" ? -1 : 1;
    if (valA > valB) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Pending": return "bg-warning/10 text-warning border-warning/20";
      case "Failed": return "bg-destructive/10 text-destructive border-destructive/20";
      case "Refunded": return "bg-violet-500/10 text-violet-500 border-violet-500/20";
      case "Reversed": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      default: return "bg-neutral-500/10 text-neutral-500 border-neutral-500/20";
    }
  };

  return (
    <>
      <Card className="glass h-full flex flex-col">
        <CardHeader className="pb-4 shrink-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" /> Transaction Registry
            </CardTitle>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search txns, orders..." 
                  className="pl-9 bg-background/50 border-border/40 text-sm"
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                />
              </div>
              <Button variant="outline" size="icon" className="shrink-0 bg-background/50">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden flex flex-col">
          <div className="overflow-x-auto rounded-lg border border-border/40 bg-card/30 flex-1">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] uppercase tracking-wider text-muted-foreground bg-muted/30 border-b border-border/40 sticky top-0 z-10 backdrop-blur-md">
                <tr>
                  <th className="px-4 py-3 font-bold cursor-pointer hover:text-foreground" onClick={() => handleSort("id")}>
                    <div className="flex items-center gap-1">Transaction <ArrowUpDown className="h-3 w-3" /></div>
                  </th>
                  <th className="px-4 py-3 font-bold cursor-pointer hover:text-foreground" onClick={() => handleSort("customer")}>
                    <div className="flex items-center gap-1">Customer <ArrowUpDown className="h-3 w-3" /></div>
                  </th>
                  <th className="px-4 py-3 font-bold cursor-pointer hover:text-foreground hidden md:table-cell" onClick={() => handleSort("method")}>
                    <div className="flex items-center gap-1">Method <ArrowUpDown className="h-3 w-3" /></div>
                  </th>
                  <th className="px-4 py-3 font-bold cursor-pointer hover:text-foreground" onClick={() => handleSort("status")}>
                    <div className="flex items-center gap-1">Status <ArrowUpDown className="h-3 w-3" /></div>
                  </th>
                  <th className="px-4 py-3 font-bold cursor-pointer hover:text-foreground" onClick={() => handleSort("amount")}>
                    <div className="flex items-center gap-1 text-right justify-end">Amount (F) <ArrowUpDown className="h-3 w-3" /></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.length > 0 ? paginated.map((txn) => (
                  <tr 
                    key={txn.id} 
                    onClick={() => setSelectedTxn(txn)}
                    className="border-b border-border/20 hover:bg-muted/30 transition-colors group cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <p className="font-bold text-foreground font-mono text-xs">{txn.id}</p>
                      <p className="text-[10px] text-muted-foreground font-normal">{txn.date}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-bold text-foreground">{txn.customer}</p>
                      <p className="text-[10px] text-muted-foreground font-normal">{txn.orderId}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-xs font-bold text-muted-foreground">{txn.method}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(txn.status)}`}>
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-foreground font-mono text-right font-black">
                      {txn.amount.toLocaleString()}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground text-sm">
                      No transactions found matching &quot;{searchTerm}&quot;
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between mt-4 shrink-0">
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
              Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, sorted.length)} of {sorted.length}
            </p>
            <div className="flex items-center gap-1">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-7 w-7 bg-background/50" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              >
                <ChevronLeft className="h-3 w-3" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-7 w-7 bg-background/50"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              >
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Details Drawer */}
      <AnimatePresence>
        {selectedTxn && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTxn(null)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-card border-l border-border/40 shadow-2xl z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/40 shrink-0 relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl -mr-10 -mt-10 ${
                  selectedTxn.status === 'Completed' ? 'bg-emerald-500/10' : 
                  selectedTxn.status === 'Failed' ? 'bg-destructive/10' : 'bg-primary/10'
                }`} />
                <div>
                  <h2 className="text-xl font-black text-foreground font-mono">{selectedTxn.id}</h2>
                  <p className="text-sm text-muted-foreground mt-1">Transaction Details</p>
                </div>
                <button onClick={() => setSelectedTxn(null)} className="p-2 rounded-full hover:bg-muted/50 transition-colors">
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                <div className="text-center">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Amount</p>
                  <p className="text-4xl font-black font-mono">{selectedTxn.amount.toLocaleString()} F</p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(selectedTxn.status)}`}>
                    {selectedTxn.status}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-border/20">
                    <span className="text-xs font-bold text-muted-foreground flex items-center gap-2"><User className="h-4 w-4" /> Customer</span>
                    <span className="text-sm font-bold">{selectedTxn.customer}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border/20">
                    <span className="text-xs font-bold text-muted-foreground flex items-center gap-2"><Building className="h-4 w-4" /> Order Ref</span>
                    <span className="text-sm font-bold text-primary hover:underline cursor-pointer">{selectedTxn.orderId}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border/20">
                    <span className="text-xs font-bold text-muted-foreground flex items-center gap-2"><Smartphone className="h-4 w-4" /> Method</span>
                    <span className="text-sm font-bold">{selectedTxn.method}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border/20">
                    <span className="text-xs font-bold text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4" /> Region</span>
                    <span className="text-sm font-bold">{selectedTxn.region}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border/20">
                    <span className="text-xs font-bold text-muted-foreground flex items-center gap-2"><Calendar className="h-4 w-4" /> Date</span>
                    <span className="text-sm font-bold">{selectedTxn.date}</span>
                  </div>
                </div>

                {selectedTxn.status === 'Completed' && (
                  <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                    <RotateCcw className="h-4 w-4 mr-2" /> Issue Refund
                  </Button>
                )}
                
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
