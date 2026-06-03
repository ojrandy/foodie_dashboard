"use client";

import { ShieldCheck, Key, Users, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-accent" /> Security Center
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Access control, audit logs, session management, and platform security monitoring.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Active Sessions</span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">14</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <Activity className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">API Keys</span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">6 Active</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Key className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Admins</span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">5</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center text-warning">
              <Users className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Security Status</span>
              <div className="text-2xl font-extrabold mt-1 text-success">Secure</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center text-success">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border border-dashed border-border/40 p-12 text-center glass">
        <ShieldCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-bold text-foreground">Security Module</h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mt-2">
          Role-based access control, audit trail logs, API key management, and two-factor authentication settings coming soon.
        </p>
      </div>
    </div>
  );
}
