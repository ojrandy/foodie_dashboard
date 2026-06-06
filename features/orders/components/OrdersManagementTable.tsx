"use client";

import React, { useState } from "react";
import { useOrdersOperations } from "../hooks/useOrdersOperations";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Download, Eye } from "lucide-react";

export function OrdersManagementTable() {
  const { orders, setSelectedOrder } = useOrdersOperations();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.recipe.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-warning/10 text-warning border-warning/30";
      case "Confirmed": return "bg-primary/10 text-primary border-primary/30";
      case "Preparing": return "bg-accent/10 text-accent border-accent/30";
      case "Assigned": return "bg-purple-500/10 text-purple-500 border-purple-500/30";
      case "Transit": return "bg-sky-500/10 text-sky-500 border-sky-500/30";
      case "Delivered": return "bg-success/10 text-success border-success/30";
      case "Cancelled": return "bg-destructive/10 text-destructive border-destructive/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPaymentColor = (status: string) => {
    switch (status) {
      case "Paid": return "text-success";
      case "Pending": return "text-warning";
      case "Failed": return "text-destructive";
      case "Refunded": return "text-muted-foreground line-through";
      default: return "text-foreground";
    }
  };

  return (
    <Card className="glass border-border/40">
      <CardContent className="p-0">
        
        {/* Table Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 p-4 border-b border-border/40">
          <div className="relative w-full sm:max-w-xs group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ID, Customer, Recipe..." 
              className="pl-9 bg-muted/30 border-border/50 focus-visible:ring-primary/30"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2 text-xs">
              <SlidersHorizontal className="h-3 w-3" /> Filters
            </Button>
            <Button variant="outline" size="sm" className="gap-2 text-xs">
              <Download className="h-3 w-3" /> Export CSV
            </Button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-muted/10 text-[10px] uppercase font-bold text-muted-foreground border-b border-border/40">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Recipe</th>
                <th className="px-6 py-4">Region</th>
                <th className="px-6 py-4">Total Cost</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-muted/5 transition-colors cursor-default">
                  <td className="px-6 py-4 font-bold text-primary">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-foreground">{order.customerName}</div>
                    <div className="text-[10px] text-muted-foreground">{order.createdAt}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-semibold">{order.recipe}</div>
                    <div className="text-[10px] text-muted-foreground">{order.itemsCount} items</div>
                  </td>
                  <td className="px-6 py-4 text-xs text-muted-foreground">{order.region}</td>
                  <td className="px-6 py-4 font-black text-foreground">{order.totalCost.toLocaleString()} XAF</td>
                  <td className={`px-6 py-4 text-xs font-bold ${getPaymentColor(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={`text-[10px] ${getStatusColor(order.status)}`}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 gap-1 text-xs text-muted-foreground hover:text-primary"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye className="h-3 w-3" /> View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredOrders.length === 0 && (
            <div className="p-8 text-center text-muted-foreground text-sm">
              No orders found matching your search criteria.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
