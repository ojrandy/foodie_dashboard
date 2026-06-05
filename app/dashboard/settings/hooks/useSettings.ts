"use client";

import { useState, useCallback } from "react";
import type { UserProfile, SystemConfig, NotificationPreference } from "../types";

const DEFAULT_PROFILE: UserProfile = {
  name: "Admin User",
  email: "admin@foodops.cm",
  role: "Operations Manager",
  phone: "+237 6XX XXX XXX",
  timezone: "Africa/Douala (WAT)",
};

const DEFAULT_CONFIG: SystemConfig = {
  language: "English",
  currency: "XAF (CFA Franc)",
  dateFormat: "DD/MM/YYYY",
  theme: "dark",
  notificationsEnabled: true,
};

const DEFAULT_NOTIFICATIONS: NotificationPreference = {
  email: true,
  push: true,
  sms: false,
  orderUpdates: true,
  systemAlerts: true,
  marketing: false,
};

export function useSettings() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [config, setConfig] = useState<SystemConfig>(DEFAULT_CONFIG);
  const [notifications, setNotifications] = useState<NotificationPreference>(DEFAULT_NOTIFICATIONS);
  const [saved, setSaved] = useState(false);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
    setSaved(false);
  }, []);

  const updateConfig = useCallback((updates: Partial<SystemConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
    setSaved(false);
  }, []);

  const updateNotifications = useCallback(
    (updates: Partial<NotificationPreference>) => {
      setNotifications((prev) => ({ ...prev, ...updates }));
      setSaved(false);
    },
    []
  );

  const saveAll = useCallback(() => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }, []);

  return {
    profile,
    config,
    notifications,
    saved,
    updateProfile,
    updateConfig,
    updateNotifications,
    saveAll,
  };
}
