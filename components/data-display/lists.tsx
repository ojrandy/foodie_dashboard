import { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface FeedItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  icon?: ReactNode;
  iconBg?: string;
}

interface ActivityFeedProps {
  items: FeedItem[];
  className?: string;
}

export function ActivityFeed({ items, className }: ActivityFeedProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item) => (
        <div key={item.id} className="flex items-start gap-4">
          {item.icon && (
            <div className={cn("flex h-8 w-8 items-center justify-center rounded-full", item.iconBg || "bg-muted")}>
              {item.icon}
            </div>
          )}
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
          <div className="text-xs text-muted-foreground">{item.timestamp}</div>
        </div>
      ))}
    </div>
  );
}
