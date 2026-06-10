import { useState } from "react";

export type TicketStatus = "Open" | "Pending" | "In Progress" | "Resolved" | "Closed" | "Escalated";
export type TicketPriority = "Low" | "Medium" | "High" | "Critical";

export interface SupportTicket {
  id: string;
  customerName: string;
  category: string;
  priority: TicketPriority;
  status: TicketStatus;
  agent: string;
  created: string;
  updated: string;
}

export interface SupportAgent {
  id: string;
  name: string;
  ticketsAssigned: number;
  ticketsResolved: number;
  avgResolutionTime: string;
  rating: number;
  escalationRate: number;
}

export interface SupportEvent {
  id: string;
  title: string;
  time: string;
  type: "ticket" | "refund" | "escalation" | "satisfaction" | "resolution";
}

const mockTickets: SupportTicket[] = [
  { id: "SUP-2041", customerName: "Ahmadou Bello", category: "Delivery Issue", priority: "High", status: "Open", agent: "Unassigned", created: "10 mins ago", updated: "10 mins ago" },
  { id: "SUP-2040", customerName: "Marie Claire", category: "Refund Request", priority: "Medium", status: "In Progress", agent: "Sarah Ndi", created: "1 hour ago", updated: "15 mins ago" },
  { id: "SUP-2039", customerName: "John Doe", category: "Order Issue", priority: "Critical", status: "Escalated", agent: "Paul Biya", created: "2 hours ago", updated: "30 mins ago" },
  { id: "SUP-2038", customerName: "Fatima Yusuf", category: "Account Issue", priority: "Low", status: "Resolved", agent: "Grace Orock", created: "5 hours ago", updated: "1 hour ago" },
  { id: "SUP-2037", customerName: "Daniel Ek", category: "Payment Problem", priority: "High", status: "Pending", agent: "Sarah Ndi", created: "1 day ago", updated: "2 hours ago" },
  { id: "SUP-2036", customerName: "Eric Ngwa", category: "Technical Problem", priority: "Medium", status: "Closed", agent: "Paul Biya", created: "2 days ago", updated: "1 day ago" },
];

const mockAgents: SupportAgent[] = [
  { id: "AGT-1", name: "Sarah Ndi", ticketsAssigned: 12, ticketsResolved: 45, avgResolutionTime: "1h 15m", rating: 4.8, escalationRate: 2.5 },
  { id: "AGT-2", name: "Paul Biya", ticketsAssigned: 15, ticketsResolved: 38, avgResolutionTime: "1h 45m", rating: 4.5, escalationRate: 5.0 },
  { id: "AGT-3", name: "Grace Orock", ticketsAssigned: 8, ticketsResolved: 52, avgResolutionTime: "45m", rating: 4.9, escalationRate: 1.2 },
  { id: "AGT-4", name: "Jean Paul", ticketsAssigned: 10, ticketsResolved: 40, avgResolutionTime: "1h 30m", rating: 4.6, escalationRate: 3.8 },
];

const mockFeed: SupportEvent[] = [
  { id: "EV-1", title: "New ticket SUP-2041 created", time: "10 mins ago", type: "ticket" },
  { id: "EV-2", title: "Ticket SUP-2039 escalated to Level 2", time: "30 mins ago", type: "escalation" },
  { id: "EV-3", title: "Agent Grace Orock resolved SUP-2038", time: "1 hour ago", type: "resolution" },
  { id: "EV-4", title: "Customer satisfaction survey completed (5 Stars)", time: "2 hours ago", type: "satisfaction" },
  { id: "EV-5", title: "Refund request submitted for ORD-1029", time: "3 hours ago", type: "refund" },
];

export function useSupportIntelligence() {
  const [tickets] = useState<SupportTicket[]>(mockTickets);
  const [agents] = useState<SupportAgent[]>(mockAgents);
  const [feed] = useState<SupportEvent[]>(mockFeed);

  const kpis = {
    openTickets: 42,
    resolvedTickets: 156,
    pendingTickets: 18,
    escalatedTickets: 5,
    avgResolutionTime: "1h 24m",
    csatScore: 92,
    refundRequests: 14,
    activeConversations: 28,
    firstResponseTime: "4m 12s",
    reopenedTickets: 3,
    highPriorityCases: 8,
    agentWorkload: "85%"
  };

  return {
    tickets,
    agents,
    feed,
    kpis
  };
}
