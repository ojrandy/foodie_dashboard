"use client";

import { User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Rider } from "../types";

interface DispatchTableProps {
  riders: Rider[];
  onSelectRider: (rider: Rider) => void;
}

export function DispatchTable({ riders, onSelectRider }: DispatchTableProps) {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <User className="h-5 w-5 text-accent" /> Rider Fleet Status Board
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-border/40 bg-muted/20 text-muted-foreground uppercase font-bold tracking-wider">
                <th className="p-4">Rider</th>
                <th className="p-4">Zone Coverage</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Completed</th>
                <th className="p-4 text-center">Avg ETA</th>
                <th className="p-4 text-center">Rating</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {riders.map((r) => (
                <tr key={r.id} className="hover:bg-muted/10 transition-colors">
                  <td className="p-4 font-extrabold text-foreground">{r.name}</td>
                  <td className="p-4 text-muted-foreground">{r.zone}</td>
                  <td className="p-4 text-center">
                    <Badge
                      className={
                        r.status === "Active"
                          ? "bg-success/10 text-success border border-success/20 hover:bg-success/10"
                          : r.status === "Idle"
                          ? "bg-warning/10 text-warning border border-warning/20 hover:bg-warning/10"
                          : "bg-muted text-muted-foreground border border-border/20 hover:bg-muted"
                      }
                    >
                      {r.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-center font-bold text-foreground">{r.deliveriesCompleted}</td>
                  <td className="p-4 text-center font-bold text-foreground">{r.avgEta} min</td>
                  <td className="p-4 text-center font-bold text-accent">{r.rating} ⭐</td>
                  <td className="p-4 text-center">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-[10px] h-7"
                      onClick={() => onSelectRider(r)}
                    >
                      Dispatch
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
