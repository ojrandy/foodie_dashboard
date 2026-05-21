"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useThemeVariant, type ThemeVariant } from "@/components/theme/ThemeVariantProvider";

const variantPreview: Record<ThemeVariant, string> = {
  indigo: "bg-gradient-to-br from-violet-600 to-indigo-500",
  orange: "bg-gradient-to-br from-orange-500 to-amber-400",
  emerald: "bg-gradient-to-br from-emerald-500 to-teal-400",
  crimson: "bg-gradient-to-br from-rose-600 to-pink-500",
};

export function ThemeVariantSwitcher() {
  const { variant, setVariant, variants } = useThemeVariant();

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-foreground">Theme Variant</h3>
      <p className="text-xs text-muted-foreground">
        Choose the visual atmosphere for your dashboard
      </p>
      <div className="grid grid-cols-2 gap-3">
        {variants.map((v) => (
          <motion.button
            key={v.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setVariant(v.id)}
            className={cn(
              "relative flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition-all duration-200",
              variant === v.id
                ? "border-accent bg-accent/5 shadow-[0_0_12px_var(--glow-1)]"
                : "border-border/60 bg-card hover:border-border"
            )}
          >
            <div className={cn("h-8 w-full rounded-lg", variantPreview[v.id])} />
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold text-foreground">{v.label}</span>
              <span className="text-[10px] text-muted-foreground">{v.description}</span>
            </div>
            {variant === v.id && (
              <motion.div
                layoutId="variant-check"
                className="absolute top-2 right-2 h-4 w-4 rounded-full bg-accent flex items-center justify-center"
                initial={false}
              >
                <svg className="h-2.5 w-2.5 text-accent-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
