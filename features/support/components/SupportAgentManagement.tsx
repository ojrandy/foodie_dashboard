import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Star, Clock, Activity, Target } from "lucide-react";
import { useSupportIntelligence } from "../hooks/useSupportIntelligence";
import { Progress } from "@/components/ui/progress";

export function SupportAgentManagement() {
  const { agents } = useSupportIntelligence();

  return (
    <Card className="glass h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Users className="h-5 w-5 text-indigo-500" /> Agent Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="p-3 bg-muted/10 border border-border/40 rounded-xl">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1 flex items-center gap-1"><Target className="h-3 w-3" /> Top Agent</p>
            <p className="text-lg font-black text-foreground">Grace Orock</p>
            <p className="text-[10px] text-emerald-500 font-bold mt-1">52 Tickets Resolved</p>
          </div>
          <div className="p-3 bg-muted/10 border border-border/40 rounded-xl">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1 flex items-center gap-1"><Activity className="h-3 w-3" /> Avg CSAT</p>
            <p className="text-lg font-black text-amber-500">4.7 / 5.0</p>
            <p className="text-[10px] text-muted-foreground font-bold mt-1">Across all agents</p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Team Performance</h4>
          <div className="space-y-3">
            {agents.sort((a, b) => b.ticketsResolved - a.ticketsResolved).map((agent) => (
              <div key={agent.id} className="p-3 bg-muted/10 border border-border/40 rounded-xl hover:bg-muted/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center font-bold text-xs">
                      {agent.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{agent.name}</h4>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {agent.avgResolutionTime}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black flex items-center justify-end gap-1">
                      <Star className="h-3 w-3 text-amber-500 fill-amber-500" /> {agent.rating}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{agent.ticketsAssigned} assigned</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                  <Progress value={(agent.ticketsResolved / 60) * 100} className="h-1.5 flex-1 bg-muted/30" indicatorClassName="bg-emerald-500" />
                  <span className="text-[10px] font-bold text-muted-foreground">{agent.ticketsResolved} done</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
