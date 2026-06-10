"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Ticket, AlertOctagon, MessageSquare, BarChart3 } from "lucide-react";

// Tab 1: Command Center
import { SupportExecutiveDashboard } from "./components/SupportExecutiveDashboard";
import { SupportActivityFeed } from "./components/SupportActivityFeed";
import { SupportAgentManagement } from "./components/SupportAgentManagement";

// Tab 2: Ticket & Resolution
import { SupportTicketManagement } from "./components/SupportTicketManagement";
import { EscalationManagement } from "./components/EscalationManagement";

// Tab 3: Complaints & Issues
import { ComplaintManagement } from "./components/ComplaintManagement";
import { DeliveryIssueResolution } from "./components/DeliveryIssueResolution";
import { RefundRequestCenter } from "./components/RefundRequestCenter";

// Tab 4: Communication & Knowledge
import { CustomerCommunicationHub } from "./components/CustomerCommunicationHub";
import { KnowledgeBaseCenter } from "./components/KnowledgeBaseCenter";

// Tab 5: Analytics & Health
import { SupportAnalytics } from "./components/SupportAnalytics";
import { RegionalSupportIntelligence } from "./components/RegionalSupportIntelligence";
import { CustomerSatisfaction } from "./components/CustomerSatisfaction";
import { AISupportInsights } from "./components/AISupportInsights";

export function CustomerSupportWorkspace() {
  const [activeTab, setActiveTab] = useState("command-center");

  const tabs = [
    { id: "command-center", label: "Support Command Center", icon: LayoutDashboard },
    { id: "tickets", label: "Ticket Management", icon: Ticket },
    { id: "complaints", label: "Complaints & Refunds", icon: AlertOctagon },
    { id: "comms", label: "Communications", icon: MessageSquare },
    { id: "analytics", label: "Analytics & Health", icon: BarChart3 },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] overflow-hidden max-w-[1600px] mx-auto w-full gap-4">
      
      {/* Header & Navigation */}
      <header className="shrink-0 space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Customer Support Center
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Enterprise Helpdesk, Ticketing & Communication Engine
            </p>
          </div>
        </div>

        <div className="flex overflow-x-auto custom-scrollbar pb-2">
          <div className="flex p-1 bg-muted/20 border border-border/40 rounded-xl">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                    isActive ? "text-indigo-500 shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="support-tab-indicator"
                      className="absolute inset-0 bg-background border border-border/50 rounded-lg shadow-sm"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <tab.icon className={`h-4 w-4 relative z-10 ${isActive ? "text-indigo-500" : ""}`} />
                  <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto custom-scrollbar pb-6 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {activeTab === "command-center" && (
              <div className="flex flex-col gap-4 h-full">
                <div className="shrink-0">
                  <SupportExecutiveDashboard />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-[400px]">
                  <div className="lg:col-span-2">
                    <SupportAgentManagement />
                  </div>
                  <div className="lg:col-span-1">
                    <SupportActivityFeed />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "tickets" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
                <div className="lg:col-span-2 h-[500px] lg:h-full">
                  <SupportTicketManagement />
                </div>
                <div className="lg:col-span-1 h-[400px] lg:h-full">
                  <EscalationManagement />
                </div>
              </div>
            )}

            {activeTab === "complaints" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
                <div className="lg:col-span-1 flex flex-col gap-4 h-full">
                  <div className="flex-1 min-h-[300px]">
                    <ComplaintManagement />
                  </div>
                </div>
                <div className="lg:col-span-1 h-[400px] lg:h-full">
                  <DeliveryIssueResolution />
                </div>
                <div className="lg:col-span-1 h-[400px] lg:h-full">
                  <RefundRequestCenter />
                </div>
              </div>
            )}

            {activeTab === "comms" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
                <div className="lg:col-span-2 h-[500px] lg:h-full">
                  <CustomerCommunicationHub />
                </div>
                <div className="lg:col-span-1 h-[400px] lg:h-full">
                  <KnowledgeBaseCenter />
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
                <div className="lg:col-span-2 flex flex-col gap-4 h-full">
                  <div className="flex-1 min-h-[350px]">
                    <SupportAnalytics />
                  </div>
                  <div className="shrink-0 h-[500px]">
                    <RegionalSupportIntelligence />
                  </div>
                </div>
                <div className="lg:col-span-1 flex flex-col gap-4 h-full">
                  <div className="flex-1 min-h-[250px]">
                    <CustomerSatisfaction />
                  </div>
                  <div className="shrink-0 min-h-[250px]">
                    <AISupportInsights />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
