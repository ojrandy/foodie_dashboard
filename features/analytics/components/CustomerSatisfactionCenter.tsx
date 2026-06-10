import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smile, Frown, Meh, MessageSquare, ThumbsUp } from "lucide-react";

export function CustomerSatisfactionCenter() {
  const reviews = [
    { name: "Marie C.", rating: 5, text: "The Egusi soup was perfectly made! Fast delivery.", sentiment: "positive" },
    { name: "John D.", rating: 4, text: "Good food but arrived a bit cold.", sentiment: "neutral" },
    { name: "Ahmadou B.", rating: 5, text: "Excellent customer service and great portions.", sentiment: "positive" },
    { name: "Grace O.", rating: 2, text: "Missing plantain in my order.", sentiment: "negative" },
  ];

  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <ThumbsUp className="h-5 w-5 text-blue-500" /> Satisfaction Center
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center justify-center p-3 bg-success/10 border border-success/20 rounded-xl text-success">
            <Smile className="h-6 w-6 mb-1" />
            <span className="text-xl font-black">78%</span>
            <span className="text-[9px] uppercase font-bold">Promoters</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-warning/10 border border-warning/20 rounded-xl text-warning">
            <Meh className="h-6 w-6 mb-1" />
            <span className="text-xl font-black">15%</span>
            <span className="text-[9px] uppercase font-bold">Passives</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive">
            <Frown className="h-6 w-6 mb-1" />
            <span className="text-xl font-black">7%</span>
            <span className="text-[9px] uppercase font-bold">Detractors</span>
          </div>
        </div>

        <div className="p-4 bg-muted/10 rounded-xl border border-border/40 text-center">
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Net Promoter Score (NPS)</p>
          <div className="text-4xl font-black text-foreground">71</div>
          <p className="text-[10px] text-success mt-1">Excellent (Top 10% Industry)</p>
        </div>

        <div>
          <h4 className="text-xs font-bold flex items-center gap-1 mb-3">
            <MessageSquare className="h-3 w-3" /> Recent Feedback
          </h4>
          <div className="space-y-2">
            {reviews.map((rev, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-muted/10 border border-border/40 flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-foreground">{rev.name}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`h-2.5 w-2.5 ${j < rev.rating ? "fill-amber-500 text-amber-500" : "text-muted-foreground/30"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground">{rev.text}</p>
              </div>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}

// Missing icon fix
function Star(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={props.fill || "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
