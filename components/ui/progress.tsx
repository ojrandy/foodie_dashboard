"use client";

import * as React from "react"
import { cn } from "@/lib/cn"
import { motion } from "framer-motion"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  indicatorClassName?: string
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, indicatorClassName, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-muted/40 border border-border/20",
        className
      )}
      {...props}
    >
      <motion.div
        className={cn("h-full w-full flex-1 bg-primary transition-all", indicatorClassName)}
        initial={{ transform: `translateX(-100%)` }}
        animate={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  )
)
Progress.displayName = "Progress"

export { Progress }
