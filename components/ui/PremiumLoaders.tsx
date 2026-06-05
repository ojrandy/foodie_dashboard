"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function TableLoader({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full border border-border/40 rounded-xl overflow-hidden glass bg-card/20">
      <div className="p-4 border-b border-border/40 flex justify-between items-center">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
      <div className="p-0">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 border-b border-border/20 last:border-0">
            <Skeleton className="h-10 w-10 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/4 opacity-70" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardGridLoader({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl border border-border/40 p-5 glass bg-card/20 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <div className="space-y-2 mt-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}
