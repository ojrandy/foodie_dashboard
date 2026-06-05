"use client";

import { Settings } from "lucide-react";

export function SettingsHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          <Settings className="h-8 w-8 text-accent" /> System Settings
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your profile, configure system preferences, and control notification settings.
        </p>
      </div>
    </div>
  );
}
