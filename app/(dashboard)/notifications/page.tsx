"use client";

import { Bell, BellRing, BellOff, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <Bell className="h-8 w-8 text-accent" /> Notifications
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            System alerts, push notifications, and communication preferences.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Unread</span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">24</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
              <BellRing className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Sent Today</span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">142</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <Bell className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Muted Channels</span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">2</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground">
              <BellOff className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border border-dashed border-border/40 p-12 text-center glass">
        <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-bold text-foreground">Notifications Center</h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mt-2">
          Full notification management with real-time alerts, customizable channels, and delivery preferences.
        </p>
      </div>
    </div>
  );
}
