import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bike, AlertTriangle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DeliveryIssueResolution() {
  const deliveryIssues = [
    { id: "DEL-4091", issue: "Rider Late > 30m", rider: "Jean Paul", status: "Critical", time: "10m ago" },
    { id: "DEL-4089", issue: "Spilled Drink reported", rider: "Moussa Ali", status: "Reviewing", time: "25m ago" },
    { id: "DEL-4082", issue: "Customer unreachable", rider: "Kevin Njoh", status: "Action Required", time: "1h ago" },
  ];

  return (
    <Card className="glass h-full flex flex-col border-orange-500/20">
      <CardHeader className="pb-4 shrink-0">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Bike className="h-5 w-5 text-orange-500" /> Delivery Issues
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto custom-scrollbar pr-2 space-y-4">
        
        <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-foreground">Active Disruption</h4>
            <p className="text-[10px] text-muted-foreground mt-1">Traffic accident reported on Bonaberi Bridge. Expect delays for 4 active orders.</p>
          </div>
        </div>

        <div className="space-y-3">
          {deliveryIssues.map(issue => (
            <div key={issue.id} className="p-3 bg-muted/10 border border-border/40 rounded-xl hover:bg-muted/20 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono">{issue.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                      issue.status === 'Critical' ? 'bg-destructive/10 text-destructive border-destructive/20' : 
                      issue.status === 'Reviewing' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
                      'bg-warning/10 text-warning border-warning/20'
                    }`}>
                      {issue.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">{issue.issue}</p>
                </div>
                <span className="text-[9px] text-muted-foreground font-bold">{issue.time}</span>
              </div>
              
              <div className="flex justify-between items-center mt-3 pt-2 border-t border-border/20">
                <span className="text-[10px] font-bold flex items-center gap-1">
                  <Bike className="h-3 w-3 text-muted-foreground" /> {issue.rider}
                </span>
                <Button size="sm" variant="ghost" className="h-6 text-[10px] hover:text-primary transition-colors">
                  Contact <MessageSquare className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  );
}
