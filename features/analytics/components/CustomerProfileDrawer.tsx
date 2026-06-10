import React, { useEffect } from "react";
import { Customer } from "../hooks/useCustomerIntelligence";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, MapPin, Calendar, CreditCard, ShoppingBag, Banknote, Clock, Award, Activity, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface CustomerProfileDrawerProps {
  customer: Customer | null;
  onClose: () => void;
}

export function CustomerProfileDrawer({ customer, onClose }: CustomerProfileDrawerProps) {
  
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {customer && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-full md:w-[450px] lg:w-[500px] bg-card border-l border-border/40 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/40 shrink-0 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10" />
              <div>
                <h2 className="text-xl font-black text-foreground">{customer.name}</h2>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <User className="h-3 w-3" /> {customer.id}
                </p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted/50 transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
              
              {/* Personal Summary */}
              <section>
                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-4">Personal Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/20 rounded-xl border border-border/40 flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">Region</p>
                      <p className="text-sm font-bold">{customer.region}</p>
                    </div>
                  </div>
                  <div className="p-3 bg-muted/20 rounded-xl border border-border/40 flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-emerald-500" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">Joined</p>
                      <p className="text-sm font-bold">{customer.joinDate}</p>
                    </div>
                  </div>
                  <div className="p-3 bg-muted/20 rounded-xl border border-border/40 flex items-center gap-3 col-span-2">
                    <CreditCard className="h-4 w-4 text-violet-500" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">Preferred Payment</p>
                      <p className="text-sm font-bold">{customer.paymentMethod}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Activity Summary */}
              <section>
                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-4">Activity Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/10 rounded-xl border border-border/40 text-center">
                    <ShoppingBag className="h-5 w-5 mx-auto mb-2 text-blue-500" />
                    <p className="text-2xl font-black">{customer.totalOrders}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-wider">Total Orders</p>
                  </div>
                  <div className="p-4 bg-muted/10 rounded-xl border border-border/40 text-center">
                    <Banknote className="h-5 w-5 mx-auto mb-2 text-emerald-500" />
                    <p className="text-xl font-black">{customer.totalSpend.toLocaleString()} F</p>
                    <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-wider">Lifetime Value</p>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-muted/10 rounded-xl border border-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-warning" />
                    <span className="text-sm font-bold">Last Order</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{customer.lastOrder}</span>
                </div>

                <div className="mt-4 p-4 bg-muted/10 rounded-xl border border-border/40">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-bold">Favorite Meals</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {customer.favoriteMeals.length > 0 ? customer.favoriteMeals.map(meal => (
                      <span key={meal} className="px-2 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-bold rounded-full border border-amber-500/20">
                        {meal}
                      </span>
                    )) : (
                      <span className="text-[10px] text-muted-foreground">No preferences recorded</span>
                    )}
                  </div>
                </div>
              </section>

              {/* Behavioral Intelligence */}
              <section>
                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-4">Behavioral Intelligence</h3>
                <div className="space-y-4">
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold flex items-center gap-1"><Activity className="h-3 w-3 text-primary" /> Engagement Score</span>
                      <span className="text-xs font-bold">{customer.engagementScore}/100</span>
                    </div>
                    <Progress value={customer.engagementScore} className="h-1.5" indicatorClassName={customer.engagementScore > 75 ? "bg-success" : customer.engagementScore > 40 ? "bg-warning" : "bg-destructive"} />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold flex items-center gap-1"><Award className="h-3 w-3 text-amber-500" /> Loyalty Score</span>
                      <span className="text-xs font-bold">{customer.loyaltyScore}/100</span>
                    </div>
                    <Progress value={customer.loyaltyScore} className="h-1.5" indicatorClassName={customer.loyaltyScore > 75 ? "bg-amber-500" : customer.loyaltyScore > 40 ? "bg-warning" : "bg-destructive"} />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold flex items-center gap-1"><HeartHandshake className="h-3 w-3 text-pink-500" /> Retention Probability</span>
                      <span className="text-xs font-bold">{customer.retentionScore}%</span>
                    </div>
                    <Progress value={customer.retentionScore} className="h-1.5" indicatorClassName={customer.retentionScore > 75 ? "bg-pink-500" : customer.retentionScore > 40 ? "bg-warning" : "bg-destructive"} />
                  </div>

                </div>
              </section>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Add this missing icon to local scope for convenience since it wasn't imported from lucide-react above
function HeartHandshake(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
      <path d="m18 15-2-2" />
      <path d="m15 18-2-2" />
    </svg>
  );
}
