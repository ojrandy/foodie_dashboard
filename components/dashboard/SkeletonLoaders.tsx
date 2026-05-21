"use client";

import { motion } from "framer-motion";

export function StatCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
      </div>
      <div className="mt-4">
        <div className="h-8 w-32 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-4 w-40 animate-pulse rounded bg-muted" />
      </div>
      <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-muted/10 blur-2xl" />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-border/50 pb-4">
        <div>
          <div className="h-5 w-40 animate-pulse rounded bg-muted" />
          <div className="mt-1.5 h-3.5 w-60 animate-pulse rounded bg-muted" />
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-16 animate-pulse rounded bg-muted" />
          <div className="h-8 w-16 animate-pulse rounded bg-muted" />
        </div>
      </div>
      <div className="mt-6 flex h-[280px] items-end justify-between gap-4">
        {[60, 40, 80, 50, 90, 70, 85, 45, 95, 60].map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div 
              className="w-full animate-pulse rounded bg-muted/60" 
              style={{ height: `${h}%` }}
            />
            <div className="h-3 w-8 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ActivityFeedSkeleton() {
  return (
    <div className="rounded-xl border border-border/50 bg-card shadow-sm flex flex-col overflow-hidden h-full">
      <div className="p-6 border-b border-border/50">
        <div className="h-5 w-36 animate-pulse rounded bg-muted" />
      </div>
      <div className="p-4 flex flex-col gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-border/10 last:border-0">
            <div className="flex gap-3 items-center">
              <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
              <div className="flex flex-col gap-1.5">
                <div className="h-3.5 w-32 animate-pulse rounded bg-muted" />
                <div className="h-3 w-20 animate-pulse rounded bg-muted" />
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <div className="h-4 w-16 animate-pulse rounded bg-muted" />
              <div className="h-3 w-12 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AIInsightsSkeleton() {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-border/50 pb-4">
        <div className="h-5 w-48 animate-pulse rounded bg-muted" />
        <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
      </div>
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 rounded-lg border border-border/30 bg-muted/10 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-pulse rounded bg-muted" />
              <div className="h-4 w-32 animate-pulse rounded bg-muted" />
            </div>
            <div className="h-3.5 w-full animate-pulse rounded bg-muted" />
            <div className="h-3 w-40 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
