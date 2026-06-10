import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Clock, MessageSquare, AlertCircle } from "lucide-react";
import { useDispatchOperations } from "../hooks/useDispatchOperations";

export function DeliveryIncidentCenter() {
  const { incidents } = useDispatchOperations();

  const getIcon = (type: string) => {
    switch (type) {
      case "Traffic Delay": return <Clock className="h-4 w-4 text-warning" />;
      case "Customer Complaint": return <MessageSquare className="h-4 w-4 text-accent" />;
      case "Failed Delivery": return <AlertCircle className="h-4 w-4 text-destructive" />;
      default: return <AlertTriangle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High": return "bg-destructive/10 text-destructive border-destructive/20";
      case "Medium": return "bg-warning/10 text-warning border-warning/20";
      case "Low": return "bg-muted text-muted-foreground border-border/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive animate-pulse" /> Incident Log
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {incidents.map(inc => (
          <div key={inc.id} className="p-3 border border-border/40 rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                {getIcon(inc.type)}
                <span className="text-xs font-bold">{inc.type}</span>
              </div>
              <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold border ${getSeverityColor(inc.severity)}`}>
                {inc.severity}
              </span>
            </div>
            <p className="text-xs text-foreground mt-1 leading-relaxed">
              {inc.description}
            </p>
            <div className="flex justify-between items-center mt-3 text-[10px] text-muted-foreground font-bold">
              <span>Order: <span className="text-primary">{inc.orderId}</span></span>
              <span>{inc.timestamp}</span>
            </div>
          </div>
        ))}
        {incidents.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm italic">
            No active incidents.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
