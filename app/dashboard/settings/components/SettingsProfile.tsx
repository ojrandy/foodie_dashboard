"use client";

import { Input } from "@/components/ui/input";
import type { UserProfile } from "../types";

interface SettingsProfileProps {
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
}

export function SettingsProfile({ profile, onUpdate }: SettingsProfileProps) {
  return (
    <div className="p-5 rounded-xl border border-border/40 bg-card glass space-y-4">
      <h3 className="text-sm font-bold text-foreground">Profile Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Full Name</label>
          <Input
            value={profile.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            className="bg-muted/30 border-border/50"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Email</label>
          <Input
            value={profile.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
            className="bg-muted/30 border-border/50"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Role</label>
          <Input
            value={profile.role}
            onChange={(e) => onUpdate({ role: e.target.value })}
            className="bg-muted/30 border-border/50"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Phone</label>
          <Input
            value={profile.phone || ""}
            onChange={(e) => onUpdate({ phone: e.target.value })}
            className="bg-muted/30 border-border/50"
          />
        </div>
      </div>
    </div>
  );
}
