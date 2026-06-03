"use client";

import React, { useState, useMemo } from "react";
import { Zap, Sparkles, CheckCircle, X, BadgeCheck, Clock, Plus, Bolt } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export interface AutomationRule {
  id: string;
  name: string;
  trigger: string; // simple description
  action: string; // simple description
  enabled: boolean;
  lastRun: string;
}

const INITIAL_RULES: AutomationRule[] = [
  { id: "au-1", name: "Auto‑Confirm Paid Orders", trigger: "Order status becomes Paid", action: "Set status to Confirmed", enabled: true, lastRun: "5 mins ago" },
  { id: "au-2", name: "Low‑Stock Alert", trigger: "Inventory below 20%", action: "Send push notification to Ops", enabled: true, lastRun: "12 mins ago" },
  { id: "au-3", name: "Night‑Shift Dispatch", trigger: "Order placed after 22:00", action: "Assign to Night rider pool", enabled: false, lastRun: "N/A" }
];

export function AutomationWorkspace() {
  const [rules, setRules] = useState<AutomationRule[]>(INITIAL_RULES);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newTrigger, setNewTrigger] = useState("");
  const [newAction, setNewAction] = useState("");

  const filtered = useMemo(() => {
    return rules.filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.trigger.toLowerCase().includes(search.toLowerCase()));
  }, [rules, search]);

  const handleToggle = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
    toast.info(`Rule toggled`);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newTrigger.trim() || !newAction.trim()) {
      toast.error("All fields required");
      return;
    }
    const newRule: AutomationRule = {
      id: `au-${Date.now()}`,
      name: newName,
      trigger: newTrigger,
      action: newAction,
      enabled: true,
      lastRun: "Just now"
    };
    setRules(prev => [newRule, ...prev]);
    setIsAddOpen(false);
    toast.success("Automation rule added");
    setNewName(""); setNewTrigger(""); setNewAction("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <Zap className="h-8 w-8 text-accent" /> Automation Engine
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Define smart triggers & actions to accelerate SaaS operations.
          </p>
        </div>
        <Button onClick={() => setIsAddOpen(true)} className="gap-2 shadow-md">
          <Plus className="h-4 w-4" /> Add Rule
        </Button>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Total Rules</span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">{rules.length}</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Zap className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Enabled</span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">{rules.filter(r=>r.enabled).length}</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <BadgeCheck className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Last Run</span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">{rules.filter(r=>r.lastRun!=="N/A").length}</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center text-success">
              <Clock className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Recent Activity</span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">{rules.filter(r=>r.lastRun!="N/A").length}</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center bg-card/40 border border-border/40 p-4 rounded-xl glass shadow-sm">
        <div className="relative w-full sm:max-w-xs group">
          <Input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search rules..." className="pl-3 bg-muted/30 border-border/50 focus-visible:ring-accent/30" />
        </div>
      </div>

      {/* Rules List */}
      <div className="space-y-3">
        {filtered.map(rule => (
          <Card key={rule.id} className="glass">
            <CardHeader className="flex flex-col gap-1 p-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-bold text-foreground">{rule.name}</CardTitle>
                <Button size="icon" variant="ghost" onClick={()=>handleToggle(rule.id)}>
                  {rule.enabled ? <CheckCircle className="h-4 w-4 text-success" /> : <X className="h-4 w-4 text-muted-foreground" />}
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">{rule.trigger} → {rule.action}</div>
            </CardHeader>
            <CardContent className="flex items-center justify-between p-4 pt-0">
              <Badge variant={rule.enabled?"default":"secondary"}>{rule.enabled?"Enabled":"Disabled"}</Badge>
              <span className="text-xs text-muted-foreground">Last run: {rule.lastRun}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Rule Modal */}
      <AnimatePresence>{isAddOpen && (
        <>
          <motion.div initial={{opacity:0}} animate={{opacity:0.5}} exit={{opacity:0}} onClick={()=>setIsAddOpen(false)} className="fixed inset-0 bg-black z-[900]"/>
          <motion.div initial={{scale:0.95,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.95,opacity:0}} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-card border border-border/40 p-6 rounded-2xl glass shadow-2xl z-[950]">
            <div className="flex justify-between items-center border-b border-border/40 pb-4 mb-4">
              <h3 className="text-lg font-bold flex items-center gap-1.5"><Zap className="h-5 w-5 text-accent"/> New Automation Rule</h3>
              <Button size="icon" variant="ghost" onClick={()=>setIsAddOpen(false)}><X className="h-4 w-4"/></Button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4 text-xs">
              <div className="flex flex-col gap-1.5"><label className="font-semibold uppercase">Rule Name *</label><Input value={newName} onChange={e=>setNewName(e.target.value)} required/></div>
              <div className="flex flex-col gap-1.5"><label className="font-semibold uppercase">Trigger *</label><Input value={newTrigger} onChange={e=>setNewTrigger(e.target.value)} required/></div>
              <div className="flex flex-col gap-1.5"><label className="font-semibold uppercase">Action *</label><Input value={newAction} onChange={e=>setNewAction(e.target.value)} required/></div>
              <Button type="submit" className="w-full mt-2 gap-2"><Bolt className="h-4 w-4"/> Save Rule</Button>
            </form>
          </motion.div>
        </>
      )}</AnimatePresence>
    </div>
  );
}
