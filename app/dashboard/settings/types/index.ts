export interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatar?: string;
  phone?: string;
  timezone: string;
}

export interface SystemConfig {
  language: string;
  currency: string;
  dateFormat: string;
  theme: "light" | "dark" | "system";
  notificationsEnabled: boolean;
}

export interface NotificationPreference {
  email: boolean;
  push: boolean;
  sms: boolean;
  orderUpdates: boolean;
  systemAlerts: boolean;
  marketing: boolean;
}
