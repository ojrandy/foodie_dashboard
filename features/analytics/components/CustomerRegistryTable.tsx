import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCustomerIntelligence, Customer } from "../hooks/useCustomerIntelligence";
import { Search, Filter, Users, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CustomerProfileDrawer } from "./CustomerProfileDrawer";

export function CustomerRegistryTable() {
  const { customers } = useCustomerIntelligence();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Customer>("totalSpend");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const itemsPerPage = 8;

  const handleSort = (field: keyof Customer) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
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
      case "Active": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "VIP": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "New": return "bg-violet-500/10 text-violet-500 border-violet-500/20";
      case "At Risk": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      default: return "bg-neutral-500/10 text-neutral-500 border-neutral-500/20";
    }
  };

  return (
    <>
      <Card className="glass h-full flex flex-col">
        <CardHeader className="pb-4 shrink-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" /> Customer Directory
            </CardTitle>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search customers..." 
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
                  <th className="px-4 py-3 font-bold cursor-pointer hover:text-foreground" onClick={() => handleSort("name")}>
                    <div className="flex items-center gap-1">Customer <ArrowUpDown className="h-3 w-3" /></div>
                  </th>
                  <th className="px-4 py-3 font-bold cursor-pointer hover:text-foreground" onClick={() => handleSort("status")}>
                    <div className="flex items-center gap-1">Status <ArrowUpDown className="h-3 w-3" /></div>
                  </th>
                  <th className="px-4 py-3 font-bold cursor-pointer hover:text-foreground hidden md:table-cell" onClick={() => handleSort("region")}>
                    <div className="flex items-center gap-1">Region <ArrowUpDown className="h-3 w-3" /></div>
                  </th>
                  <th className="px-4 py-3 font-bold cursor-pointer hover:text-foreground" onClick={() => handleSort("totalOrders")}>
                    <div className="flex items-center gap-1 text-right justify-end">Orders <ArrowUpDown className="h-3 w-3" /></div>
                  </th>
                  <th className="px-4 py-3 font-bold cursor-pointer hover:text-foreground" onClick={() => handleSort("totalSpend")}>
                    <div className="flex items-center gap-1 text-right justify-end">Total Spend (F) <ArrowUpDown className="h-3 w-3" /></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.length > 0 ? paginated.map((cust) => (
                  <tr 
                    key={cust.id} 
                    onClick={() => setSelectedCustomer(cust)}
                    className="border-b border-border/20 hover:bg-muted/30 transition-colors group cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <p className="font-bold text-foreground">{cust.name}</p>
                      <p className="text-[10px] text-muted-foreground font-normal">{cust.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(cust.status)}`}>
                        {cust.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{cust.region}</td>
                    <td className="px-4 py-3 text-foreground text-right">{cust.totalOrders}</td>
                    <td className="px-4 py-3 text-foreground font-mono text-right font-bold">
                      {cust.totalSpend.toLocaleString()}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground text-sm">
                      No customers found matching &quot;{searchTerm}&quot;
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

      <CustomerProfileDrawer 
        customer={selectedCustomer} 
        onClose={() => setSelectedCustomer(null)} 
      />
    </>
  );
}
