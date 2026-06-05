"use client";

import { Button } from "@/components/ui/button";
import { useSettings } from "../hooks/useSettings";
import { SettingsHeader } from "./SettingsHeader";
import { SettingsProfile } from "./SettingsProfile";
import { SettingsPreferences } from "./SettingsPreferences";

export function SettingsMain() {
  const {
    profile,
    config,
    notifications,
    saved,
    updateProfile,
    updateConfig,
    updateNotifications,
    saveAll,
  } = useSettings();

  return (
    <div className="space-y-6">
      <SettingsHeader />
      <SettingsProfile profile={profile} onUpdate={updateProfile} />
      <SettingsPreferences
        config={config}
        notifications={notifications}
        onConfigUpdate={updateConfig}
        onNotificationUpdate={updateNotifications}
      />
      <div className="flex justify-end">
        <Button onClick={saveAll} className="gap-2">
          {saved ? "✓ Saved" : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
