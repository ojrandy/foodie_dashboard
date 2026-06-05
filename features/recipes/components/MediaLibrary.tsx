import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";

export function MediaLibrary() {
  return (
    <div className="space-y-6">
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            Media & Asset Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex flex-col items-center justify-center border border-dashed border-border/40 rounded-xl bg-muted/10">
            <h3 className="font-bold text-foreground">CDN Sync in Progress...</h3>
            <p className="text-sm text-muted-foreground mt-2 text-center max-w-sm">
              Fetching high-resolution image and video assets for recipe preview modals.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
