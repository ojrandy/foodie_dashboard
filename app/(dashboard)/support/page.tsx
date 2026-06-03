"use client";

import { LifeBuoy, MessageCircle, Phone, TicketCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <LifeBuoy className="h-8 w-8 text-accent" /> Support Center
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Ticket management, customer inquiries, and operational support hub.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Open Tickets</span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">12</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <TicketCheck className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Live Chats</span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">3 Active</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center text-success">
              <MessageCircle className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Avg Response</span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">4.2 Min</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Phone className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border border-dashed border-border/40 p-12 text-center glass">
        <LifeBuoy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-bold text-foreground">Support Module</h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mt-2">
          Complete support ticket system with live chat integration, customer history, and escalation management coming soon.
        </p>
      </div>
    </div>
  );
}
