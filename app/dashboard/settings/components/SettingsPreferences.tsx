"use client";

import type { SystemConfig, NotificationPreference } from "../types";

interface SettingsPreferencesProps {
  config: SystemConfig;
  notifications: NotificationPreference;
  onConfigUpdate: (updates: Partial<SystemConfig>) => void;
  onNotificationUpdate: (updates: Partial<NotificationPreference>) => void;
}

export function SettingsPreferences({
  config,
  notifications,
  onConfigUpdate,
  onNotificationUpdate,
}: SettingsPreferencesProps) {
  return (
    <div className="space-y-4">
      <div className="p-5 rounded-xl border border-border/40 bg-card glass space-y-4">
        <h3 className="text-sm font-bold text-foreground">System Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Language</label>
            <select
              value={config.language}
              onChange={(e) => onConfigUpdate({ language: e.target.value })}
              className="bg-muted/30 border border-border/40 rounded-lg p-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 cursor-pointer"
            >
              <option>English</option>
              <option>French</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Currency</label>
            <select
              value={config.currency}
              onChange={(e) => onConfigUpdate({ currency: e.target.value })}
              className="bg-muted/30 border border-border/40 rounded-lg p-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 cursor-pointer"
            >
              <option>XAF (CFA Franc)</option>
              <option>USD (US Dollar)</option>
              <option>EUR (Euro)</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Date Format</label>
            <select
              value={config.dateFormat}
              onChange={(e) => onConfigUpdate({ dateFormat: e.target.value })}
              className="bg-muted/30 border border-border/40 rounded-lg p-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 cursor-pointer"
            >
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Theme</label>
            <select
              value={config.theme}
              onChange={(e) => onConfigUpdate({ theme: e.target.value as SystemConfig["theme"] })}
              className="bg-muted/30 border border-border/40 rounded-lg p-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 cursor-pointer"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-5 rounded-xl border border-border/40 bg-card glass space-y-4">
        <h3 className="text-sm font-bold text-foreground">Notification Preferences</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { key: "email", label: "Email Notifications", value: notifications.email },
            { key: "push", label: "Push Notifications", value: notifications.push },
            { key: "sms", label: "SMS Notifications", value: notifications.sms },
            { key: "orderUpdates", label: "Order Updates", value: notifications.orderUpdates },
            { key: "systemAlerts", label: "System Alerts", value: notifications.systemAlerts },
            { key: "marketing", label: "Marketing", value: notifications.marketing },
          ].map(({ key, label, value }) => (
            <label
              key={key}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border/20 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={value}
                onChange={() =>
                  onNotificationUpdate({ [key]: !value } as Partial<NotificationPreference>)
                }
                className="h-4 w-4 rounded border-border/60 accent-accent"
              />
              <span className="text-xs font-medium text-foreground">{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
