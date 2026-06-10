import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupportIntelligence, SupportTicket } from "../hooks/useSupportIntelligence";
import { Search, Filter, Ticket, X, User, AlertTriangle, Send, Phone, Mail, Building, MapPin, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function SupportTicketManagement() {
  const { tickets } = useSupportIntelligence();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  const filtered = tickets.filter(t => 
    t.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.agent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "In Progress": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Resolved": return "bg-success/10 text-success border-success/20";
      case "Closed": return "bg-muted/10 text-muted-foreground border-border/20";
      case "Pending": return "bg-warning/10 text-warning border-warning/20";
      case "Escalated": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-neutral-500/10 text-neutral-500 border-neutral-500/20";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "text-destructive flex items-center gap-1";
      case "High": return "text-orange-500 flex items-center gap-1";
      case "Medium": return "text-amber-500 flex items-center gap-1";
      case "Low": return "text-emerald-500 flex items-center gap-1";
      default: return "text-muted-foreground";
    }
  };

  return (
    <>
      <Card className="glass h-full flex flex-col">
        <CardHeader className="pb-4 shrink-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Ticket className="h-5 w-5 text-indigo-500" /> Ticket Management
            </CardTitle>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search tickets, customers, agents..." 
                  className="pl-9 bg-background/50 border-border/40 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="shrink-0 bg-background/50">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden flex flex-col">
          <div className="overflow-auto rounded-lg border border-border/40 bg-card/30 flex-1 custom-scrollbar">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] uppercase tracking-wider text-muted-foreground bg-muted/30 border-b border-border/40 sticky top-0 z-10 backdrop-blur-md">
                <tr>
                  <th className="px-4 py-3 font-bold">Ticket ID</th>
                  <th className="px-4 py-3 font-bold">Customer</th>
                  <th className="px-4 py-3 font-bold">Category</th>
                  <th className="px-4 py-3 font-bold">Priority</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                  <th className="px-4 py-3 font-bold">Assigned Agent</th>
                  <th className="px-4 py-3 font-bold text-right">Updated</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((ticket) => (
                  <tr 
                    key={ticket.id} 
                    onClick={() => setSelectedTicket(ticket)}
                    className="border-b border-border/20 hover:bg-muted/30 transition-colors group cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <p className="font-bold text-foreground font-mono text-xs group-hover:text-primary transition-colors">{ticket.id}</p>
                    </td>
                    <td className="px-4 py-3 font-bold text-foreground">{ticket.customerName}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{ticket.category}</td>
                    <td className="px-4 py-3 text-xs font-bold">
                      <span className={getPriorityColor(ticket.priority)}>
                        {ticket.priority === 'Critical' || ticket.priority === 'High' ? <AlertTriangle className="h-3 w-3" /> : null}
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {ticket.agent === 'Unassigned' ? (
                        <span className="text-muted-foreground italic">Unassigned</span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-5 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center font-bold text-[9px]">
                            {ticket.agent.charAt(0)}
                          </div>
                          {ticket.agent}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[10px] text-muted-foreground text-right">{ticket.updated}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground text-sm">
                      No tickets found matching &quot;{searchTerm}&quot;
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Ticket Details Drawer */}
      <AnimatePresence>
        {selectedTicket && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTicket(null)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-card border-l border-border/40 shadow-2xl z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/40 shrink-0 relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl -mr-10 -mt-10 ${
                  selectedTicket.status === 'Resolved' ? 'bg-success/10' : 
                  selectedTicket.status === 'Escalated' ? 'bg-destructive/10' : 'bg-primary/10'
                }`} />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-black text-foreground font-mono">{selectedTicket.id}</h2>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor(selectedTicket.status)}`}>
                      {selectedTicket.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Created {selectedTicket.created}</p>
                </div>
                <button onClick={() => setSelectedTicket(null)} className="p-2 rounded-full hover:bg-muted/50 transition-colors z-10 relative">
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                
                {/* Customer Info Box */}
                <div className="p-4 bg-muted/10 border border-border/40 rounded-xl space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-border/20">
                    <div className="h-10 w-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg">
                      {selectedTicket.customerName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-lg">{selectedTicket.customerName}</h3>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Customer ID: CUST-9824</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Phone className="h-3 w-3" /> +237 671 234 567
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" /> customer@email.com
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> Buea, South West
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Building className="h-3 w-3" /> 14 Lifetime Orders
                    </div>
                  </div>
                </div>

                {/* Ticket Meta */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Ticket Details</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted/10 border border-border/20 rounded-lg">
                      <p className="text-[10px] text-muted-foreground mb-1 flex items-center gap-1"><Tag className="h-3 w-3" /> Category</p>
                      <p className="text-sm font-bold">{selectedTicket.category}</p>
                    </div>
                    <div className="p-3 bg-muted/10 border border-border/20 rounded-lg">
                      <p className="text-[10px] text-muted-foreground mb-1 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Priority</p>
                      <p className={`text-sm font-bold ${getPriorityColor(selectedTicket.priority)}`}>{selectedTicket.priority}</p>
                    </div>
                  </div>
                </div>

                {/* Internal Notes / Timeline */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Communication Timeline</h4>
                  
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border/40 before:to-transparent">
                    
                    <div className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-xl border border-border/40 bg-muted/10 shadow-sm">
                        <p className="text-[10px] text-muted-foreground mb-1">Customer • {selectedTicket.created}</p>
                        <p className="text-sm">&quot;My delivery is 45 minutes late and the rider is not picking up.&quot;</p>
                      </div>
                    </div>

                    <div className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border/40 bg-muted shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                        <span className="text-[10px] font-bold">BOT</span>
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-xl border border-border/40 bg-background shadow-sm">
                        <p className="text-[10px] text-muted-foreground mb-1">Auto-Reply • {selectedTicket.created}</p>
                        <p className="text-sm">&quot;We apologize for the delay. An agent will be with you shortly.&quot;</p>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* Reply Box */}
              <div className="p-4 border-t border-border/40 bg-muted/10 shrink-0">
                <div className="flex gap-2">
                  <Input placeholder="Type internal note or reply..." className="bg-background" />
                  <Button size="icon" className="shrink-0"><Send className="h-4 w-4" /></Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
