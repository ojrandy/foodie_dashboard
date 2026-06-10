import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupportIntelligence } from "../hooks/useSupportIntelligence";
import { AlertTriangle, Clock, ShieldAlert, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EscalationManagement() {
  const { tickets } = useSupportIntelligence();

  const escalated = tickets.filter(t => t.status === 'Escalated' || t.priority === 'Critical');

  return (
    <Card className="glass h-full flex flex-col border-destructive/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
      <CardHeader className="pb-4 shrink-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" /> Escalation Queue
          </CardTitle>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-destructive/10 text-destructive border border-destructive/20">
            {escalated.length} Critical
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto custom-scrollbar pr-2 space-y-3 relative z-10">
        
        {escalated.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
            <ShieldAlert className="h-10 w-10 text-success mb-2" />
            <p className="text-sm font-bold">No Escalations</p>
            <p className="text-xs text-muted-foreground">All queues are healthy</p>
          </div>
        ) : (
          escalated.map(ticket => (
            <div key={ticket.id} className="p-3 bg-destructive/5 border border-destructive/20 rounded-xl hover:bg-destructive/10 transition-colors group relative overflow-hidden">
              <div className="absolute left-0 top-0 w-1 h-full bg-destructive" />
              
              <div className="flex justify-between items-start mb-2 pl-2">
                <div>
                  <h4 className="text-sm font-bold text-foreground">{ticket.id}</h4>
                  <p className="text-[10px] text-muted-foreground">{ticket.customerName}</p>
                </div>
                <div className="text-right">
                  <span className="flex items-center justify-end gap-1 text-[10px] font-bold text-destructive">
                    <Clock className="h-3 w-3" /> SLA breached
                  </span>
                  <span className="text-[9px] text-muted-foreground">2 hours ago</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pl-2 mt-3">
                <span className="text-xs font-bold px-2 py-0.5 bg-background/50 rounded border border-border/40">
                  {ticket.category}
                </span>
                <Button size="sm" variant="outline" className="h-7 text-[10px] border-destructive/30 text-destructive hover:bg-destructive text-destructive-foreground hover:text-white transition-colors">
                  Take Action <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          ))
        )}

      </CardContent>
    </Card>
  );
}
