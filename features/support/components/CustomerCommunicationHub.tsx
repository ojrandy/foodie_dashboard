import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Phone, Mail, Smartphone, Globe, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CustomerCommunicationHub() {
  const channels = [
    { name: "In-App Chat", icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-500/10", active: true },
    { name: "WhatsApp", icon: Smartphone, color: "text-emerald-500", bg: "bg-emerald-500/10", active: false },
    { name: "Email", icon: Mail, color: "text-amber-500", bg: "bg-amber-500/10", active: false },
    { name: "SMS", icon: Phone, color: "text-indigo-500", bg: "bg-indigo-500/10", active: false },
    { name: "Web Support", icon: Globe, color: "text-violet-500", bg: "bg-violet-500/10", active: false },
  ];

  return (
    <Card className="glass h-full flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
      <CardHeader className="pb-4 shrink-0">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-500" /> Omnichannel Hub
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden relative z-10">
        
        <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2 shrink-0">
          {channels.map((ch, i) => (
            <button key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold whitespace-nowrap transition-colors ${
              ch.active ? `border-primary/50 bg-primary/10 text-primary` : `border-border/40 bg-muted/10 text-muted-foreground hover:bg-muted/30 hover:text-foreground`
            }`}>
              <ch.icon className={`h-3 w-3 ${ch.active ? 'text-primary' : ch.color}`} />
              {ch.name}
            </button>
          ))}
        </div>

        <div className="flex-1 border border-border/40 rounded-xl bg-muted/5 flex flex-col overflow-hidden">
          <div className="p-3 border-b border-border/40 bg-muted/10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">C</div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Ahmadou Bello</h4>
                <p className="text-[9px] text-muted-foreground flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-success"></span> Online via App
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            <div className="flex justify-center">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Today, 10:42 AM</span>
            </div>
            
            <div className="flex gap-3 justify-start">
              <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0">C</div>
              <div className="p-3 bg-muted/20 border border-border/40 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">
                Hi, my order ORD-1029 is showing delivered but I haven&apos;t received it yet.
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <div className="p-3 bg-primary/20 border border-primary/20 text-primary-foreground rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
                Hello Ahmadou! Let me check the rider&apos;s GPS location right away. Please hold on for a minute.
              </div>
            </div>

          </div>
          
          <div className="p-3 border-t border-border/40 bg-muted/10">
            <div className="flex gap-2">
              <Input placeholder="Type message..." className="bg-background border-border/40" />
              <Button size="icon" className="shrink-0"><Send className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
