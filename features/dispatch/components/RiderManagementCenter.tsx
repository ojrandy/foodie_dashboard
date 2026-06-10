import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatchOperations, Rider } from "../hooks/useDispatchOperations";
import { Search, User, Bike, Car, Truck, Filter, MapPin, CheckCircle, Activity, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function RiderManagementCenter() {
  const { riders } = useDispatchOperations();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);

  const filteredRiders = riders.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <User className="h-5 w-5 text-primary" /> Rider Management
        </h3>
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search rider, ID, region..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 h-9 text-xs glass bg-muted/20"
            />
          </div>
          <Button variant="outline" size="icon" className="h-9 w-9 shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRiders.map(rider => (
          <Card 
            key={rider.id} 
            className="glass hover:bg-muted/5 transition-colors cursor-pointer"
            onClick={() => setSelectedRider(rider)}
          >
            <CardContent className="p-4 flex gap-4">
              <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                {rider.vehicleType === "Motorcycle" ? <Bike className="h-6 w-6 text-accent" /> :
                 rider.vehicleType === "Car" ? <Car className="h-6 w-6 text-accent" /> :
                 <Truck className="h-6 w-6 text-accent" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-sm">{rider.name}</h4>
                  <Badge variant="outline" className={`text-[10px] ${
                    rider.status === "Available" ? "bg-success/10 text-success border-success/20" :
                    rider.status === "In Transit" || rider.status === "Assigned" ? "bg-primary/10 text-primary border-primary/20" :
                    rider.status === "Suspended" ? "bg-destructive/10 text-destructive border-destructive/20" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {rider.status}
                  </Badge>
                </div>
                <p className="text-[10px] text-muted-foreground font-bold mt-0.5">{rider.id}</p>
                
                <div className="grid grid-cols-3 gap-2 mt-4 text-[10px]">
                  <div>
                    <p className="text-muted-foreground">Region</p>
                    <p className="font-bold">{rider.region}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Rating</p>
                    <p className="font-bold text-yellow-500">{rider.rating} ⭐</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Deliveries</p>
                    <p className="font-bold text-primary">{rider.completedDeliveries}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredRiders.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground border border-dashed border-border/40 rounded-xl">
            No riders found.
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedRider && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} onClick={() => setSelectedRider(null)} className="fixed inset-0 bg-black z-[900]" />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-card border-l border-border/40 z-[950] p-6 shadow-2xl glass overflow-y-auto"
            >
              <div className="flex justify-between items-center border-b border-border/40 pb-4 mb-5">
                <h3 className="text-lg font-bold">Rider Profile</h3>
                <Button size="icon" variant="ghost" onClick={() => setSelectedRider(null)}><X className="h-4 w-4" /></Button>
              </div>
              
              <div className="flex flex-col items-center mb-6">
                <div className="h-20 w-20 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-3">
                  <User className="h-10 w-10" />
                </div>
                <h2 className="text-xl font-black">{selectedRider.name}</h2>
                <p className="text-xs text-muted-foreground font-bold">{selectedRider.id}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1 text-sm font-bold">{selectedRider.region}</div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <div className="flex-1 text-sm font-bold">{selectedRider.completedDeliveries} Lifetime Deliveries</div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                  <Activity className="h-4 w-4 text-primary" />
                  <div className="flex-1 text-sm font-bold">{selectedRider.status}</div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <Button className="w-full">View Full History</Button>
                <Button variant="outline" className="w-full text-destructive hover:text-destructive">Suspend Rider</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
