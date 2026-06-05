import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { AnimatedFoodBackground } from "@/components/theme/AnimatedFoodBackground";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex w-full bg-background">
      <AnimatedFoodBackground />

      <Sidebar />
      <div className="relative flex flex-col flex-1 min-w-0 z-10 bg-background">
        <Navbar />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
