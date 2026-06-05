import { cn } from "@/lib/cn";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted/60", className)}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm p-6 space-y-4">
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-10 w-1/2" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full space-y-3 rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
      <div className="space-y-4 pt-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <Skeleton className="h-4 w-[15%]" />
            <Skeleton className="h-4 w-[25%]" />
            <Skeleton className="h-4 w-[20%]" />
            <Skeleton className="h-4 w-[10%] rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm p-6 space-y-4 flex flex-col h-full min-h-[350px]">
      <Skeleton className="h-5 w-1/4" />
      <Skeleton className="h-4 w-2/4 mb-4" />
      <div className="flex-1 w-full mt-4 flex items-end gap-2 justify-between px-2">
        {[40, 70, 45, 90, 65, 55, 80].map((height, i) => (
          <Skeleton 
            key={i} 
            className="w-full bg-accent/20 rounded-t-sm rounded-b-none" 
            style={{ height: `${height}%` }} 
          />
        ))}
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-6 w-full max-w-2xl rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm p-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-24 w-full" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <div className="flex justify-end mt-6 pt-4 border-t border-border/40">
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}
