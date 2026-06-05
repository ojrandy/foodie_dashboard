"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { CommodityPrice } from "../types";

interface PricingTableProps {
  commodities: CommodityPrice[];
}

export function PricingTable({ commodities }: PricingTableProps) {
  return (
    <Card className="glass overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/40 bg-muted/20 text-muted-foreground uppercase font-bold tracking-wider">
                <th className="p-4">Commodity / Unit</th>
                <th className="p-4">Buea Market</th>
                <th className="p-4">Douala Market</th>
                <th className="p-4">Yaounde Market</th>
                <th className="p-4 text-center">Spreads / Volatility</th>
                <th className="p-4 text-center">Trend Indicator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {commodities.map((c) => {
                const maxPrice = Math.max(c.bueaPrice, c.doualaPrice, c.yaoundePrice);
                const minPrice = Math.min(c.bueaPrice, c.doualaPrice, c.yaoundePrice);
                const spread = maxPrice - minPrice;

                return (
                  <tr
                    key={c.id}
                    className="transition-colors text-foreground hover:bg-muted/10 cursor-pointer"
                  >
                    <td className="p-4">
                      <div className="font-extrabold text-sm">{c.name}</div>
                      <div className="text-[10px] text-muted-foreground">
                        {c.unit} | {c.category}
                      </div>
                    </td>
                    <td className="p-4 font-semibold">
                      <span
                        className={
                          c.bueaPrice === minPrice
                            ? "text-emerald-500 font-extrabold"
                            : c.bueaPrice === maxPrice
                            ? "text-destructive"
                            : ""
                        }
                      >
                        {c.bueaPrice.toLocaleString()} XAF
                      </span>
                      {c.bueaPrice === minPrice && (
                        <Badge className="ml-1.5 text-[8px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/10">
                          Cheapest
                        </Badge>
                      )}
                    </td>
                    <td className="p-4 font-semibold">
                      <span
                        className={
                          c.doualaPrice === minPrice
                            ? "text-emerald-500 font-extrabold"
                            : c.doualaPrice === maxPrice
                            ? "text-destructive"
                            : ""
                        }
                      >
                        {c.doualaPrice.toLocaleString()} XAF
                      </span>
                      {c.doualaPrice === minPrice && (
                        <Badge className="ml-1.5 text-[8px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/10">
                          Cheapest
                        </Badge>
                      )}
                    </td>
                    <td className="p-4 font-semibold">
                      <span
                        className={
                          c.yaoundePrice === minPrice
                            ? "text-emerald-500 font-extrabold"
                            : c.yaoundePrice === maxPrice
                            ? "text-destructive"
                            : ""
                        }
                      >
                        {c.yaoundePrice.toLocaleString()} XAF
                      </span>
                      {c.yaoundePrice === minPrice && (
                        <Badge className="ml-1.5 text-[8px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/10">
                          Cheapest
                        </Badge>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <div className="font-extrabold text-accent">
                        +{spread.toLocaleString()} XAF Spread
                      </div>
                      <div className="text-[9px] text-muted-foreground font-semibold uppercase mt-0.5">
                        Spread Index
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1.5">
                        {c.trend === "up" ? (
                          <Badge className="bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/10 flex gap-1 items-center">
                            <TrendingUp className="h-3 w-3" /> Inflationary
                          </Badge>
                        ) : c.trend === "down" ? (
                          <Badge className="bg-success/10 text-success border border-success/20 hover:bg-success/10 flex gap-1 items-center">
                            <TrendingDown className="h-3 w-3" /> Deflationary
                          </Badge>
                        ) : (
                          <Badge className="bg-muted text-muted-foreground border border-border/20 hover:bg-muted flex gap-1 items-center">
                            Stable
                          </Badge>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
