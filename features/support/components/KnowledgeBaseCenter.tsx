import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Search, FileText, ChevronRight, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

export function KnowledgeBaseCenter() {
  const categories = [
    { name: "Ordering Help", articles: 24, icon: HelpCircle },
    { name: "Delivery FAQs", articles: 18, icon: FileText },
    { name: "Payment & Refunds", articles: 32, icon: BookOpen },
  ];

  const popularArticles = [
    "How to cancel an order after payment",
    "Understanding the delivery time estimates",
    "Adding a new delivery address",
    "What to do if an item is missing",
  ];

  return (
    <Card className="glass h-full flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
      <CardHeader className="pb-4 shrink-0">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-amber-500" /> Knowledge Base
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-6 overflow-hidden relative z-10">
        
        <div className="relative shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search help articles..." className="pl-9 bg-background/50 border-border/40" />
        </div>

        <div className="space-y-3 shrink-0">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Categories</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {categories.map((cat, i) => (
              <div key={i} className="p-3 bg-muted/10 border border-border/40 rounded-xl hover:bg-muted/30 transition-colors flex items-center gap-3 cursor-pointer group">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                  <cat.icon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{cat.name}</h4>
                  <p className="text-[10px] text-muted-foreground">{cat.articles} articles</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Popular Articles</h4>
          <div className="space-y-2">
            {popularArticles.map((article, i) => (
              <div key={i} className="p-3 bg-muted/5 border border-border/20 rounded-lg hover:bg-muted/20 hover:border-primary/30 transition-colors flex justify-between items-center cursor-pointer group">
                <span className="text-sm text-foreground">{article}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
