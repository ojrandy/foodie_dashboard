"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/feedback/empty-state";
import { Spinner, Skeleton } from "@/components/feedback/loaders";
import { ActivityFeed } from "@/components/data-display/lists";
import { LineChartCard } from "@/components/data-display/charts/LineChartCard";
import { BarChartCard } from "@/components/data-display/charts/BarChartCard";
import { PieChartCard } from "@/components/data-display/charts/PieChartCard";
import { DataTable } from "@/components/data-display/data-table";
import { Bell, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

export default function SandboxPage() {
  const chartData = [
    { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
  ];

  const columns = [
    {
      accessorKey: "id",
      header: "Order ID",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => {
        const status = row.getValue("status");
        return (
          <Badge variant={status === "Completed" ? "default" : "secondary"}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
  ];

  const tableData = [
    { id: "ORD-001", status: "Completed", amount: "$150.00" },
    { id: "ORD-002", status: "Pending", amount: "$85.50" },
    { id: "ORD-003", status: "In-Progress", amount: "$42.00" },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-4">UI Sandbox</h2>
        <p className="text-muted-foreground">
          Visual test environment for the Design System & Core UI.
        </p>
      </div>

      {/* Buttons */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Buttons</h3>
        <div className="flex gap-4 flex-wrap">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="destructive">Destructive Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button onClick={() => toast.success("This is a success toast!")}>Trigger Toast</Button>
        </div>
      </section>

      {/* Badges & Inputs */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Badges & Inputs</h3>
        <div className="flex gap-4 items-center flex-wrap">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
        <div className="max-w-sm mt-4">
          <Input placeholder="This is an input..." />
        </div>
      </section>

      {/* Loaders & Feedback */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Feedback & Loaders</h3>
        <div className="flex items-center gap-8">
          <Spinner />
          <Spinner size="lg" />
          <div className="space-y-2 flex-1 max-w-sm">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="mt-8">
          <EmptyState 
            icon={<ShoppingCart className="h-10 w-10 text-muted-foreground" />}
            title="No Orders Found"
            description="There are no orders matching your current filters."
            actionLabel="Clear Filters"
            onAction={() => toast.info("Filters cleared")}
          />
        </div>
      </section>

      {/* Data Display */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Data Display (Tables & Lists)</h3>
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={tableData} searchKey="id" />
          </CardContent>
        </Card>
        
        <Card className="max-w-md mt-4">
          <CardHeader>
            <CardTitle>Activity Feed</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityFeed items={[
              { id: "1", title: "New Order", description: "ORD-004 created", timestamp: "2 mins ago", icon: <Bell className="h-4 w-4" /> },
              { id: "2", title: "Order Completed", description: "ORD-001 delivered", timestamp: "1 hour ago", icon: <ShoppingCart className="h-4 w-4" /> },
            ]} />
          </CardContent>
        </Card>
      </section>

      {/* Charts */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Charts Wrapper System</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LineChartCard title="Revenue (Line)" data={chartData} xKey="name" yKey="total" />
          <BarChartCard title="Orders (Bar)" data={chartData} xKey="name" yKey="total" />
          <PieChartCard title="Sources (Pie)" data={chartData} dataKey="total" nameKey="name" />
        </div>
      </section>
    </div>
  );
}
