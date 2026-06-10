import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Printer, FileSpreadsheet, FileIcon as FilePdf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFinanceIntelligence } from "../hooks/useFinanceIntelligence";

export function ExecutiveFinanceReporting() {
  const { kpis, transactions, payouts, refunds } = useFinanceIntelligence();

  const reports = [
    { title: "Daily Financial Report", period: "Today", size: "Real-time", type: "daily" },
    { title: "Weekly Revenue Analytics", period: "This Week", size: "Real-time", type: "weekly" },
    { title: "Monthly P&L Statement", period: "May 2024", size: "Real-time", type: "monthly" },
    { title: "Rider Earnings Report", period: "This Month", size: "Real-time", type: "riders" },
  ];

  const generateCSV = (type: string) => {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    if (type === "daily" || type === "weekly" || type === "monthly" || type === "excel") {
      csvContent += "=== FINANCIAL KPIs ===\n";
      csvContent += `Total Revenue,${kpis.totalRevenue} F\n`;
      csvContent += `Net Revenue,${kpis.netRevenue} F\n`;
      csvContent += `Profit Margin,${kpis.profitMargin}%\n`;
      csvContent += `Total Transactions,${kpis.totalTransactions}\n\n`;

      csvContent += "=== RECENT TRANSACTIONS ===\n";
      csvContent += "Transaction ID,Order ID,Customer,Amount (F),Method,Status,Date,Region\n";
      transactions.forEach(t => {
        csvContent += `${t.id},${t.orderId},${t.customer},${t.amount},${t.method},${t.status},"${t.date}",${t.region}\n`;
      });
      
      csvContent += "\n=== REFUNDS ===\n";
      csvContent += "Refund ID,Order ID,Reason,Amount (F),Status,Date\n";
      refunds.forEach(r => {
        csvContent += `${r.id},${r.orderId},"${r.reason}",${r.amount},${r.status},${r.date}\n`;
      });
    }

    if (type === "riders" || type === "excel") {
      csvContent += "\n=== RIDER PAYOUTS ===\n";
      csvContent += "Payout ID,Rider Name,Deliveries,Earnings (F),Bonuses (F),Adjustments (F),Total (F),Status\n";
      payouts.forEach(p => {
        const total = p.earnings + p.bonuses + p.adjustments;
        csvContent += `${p.id},${p.riderName},${p.deliveries},${p.earnings},${p.bonuses},${p.adjustments},${total},${p.status}\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `foodops_${type}_report_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    // In a real app, this would route to a dedicated print-friendly /reports/pdf page.
    // For now, we trigger the browser print window which allows "Save as PDF".
    window.print();
  };

  return (
    <Card className="glass h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-500" /> Executive Reporting
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        <div className="grid grid-cols-3 gap-2 mb-6">
          <Button onClick={handlePrint} variant="outline" className="h-16 flex flex-col items-center justify-center gap-1 bg-background/50 hover:border-red-500/50 hover:text-red-500 transition-colors">
            <FilePdf className="h-5 w-5 text-red-500" />
            <span className="text-[10px] font-bold">Export PDF</span>
          </Button>
          <Button onClick={() => generateCSV("excel")} variant="outline" className="h-16 flex flex-col items-center justify-center gap-1 bg-background/50 hover:border-emerald-500/50 hover:text-emerald-500 transition-colors">
            <FileSpreadsheet className="h-5 w-5 text-emerald-500" />
            <span className="text-[10px] font-bold">Export Excel</span>
          </Button>
          <Button onClick={handlePrint} variant="outline" className="h-16 flex flex-col items-center justify-center gap-1 bg-background/50 hover:border-primary/50 transition-colors">
            <Printer className="h-5 w-5 text-muted-foreground" />
            <span className="text-[10px] font-bold">Print Report</span>
          </Button>
        </div>

        <div>
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Generated Reports</h4>
          <div className="space-y-2">
            {reports.map((report, i) => (
              <div key={i} className="p-3 bg-muted/10 border border-border/40 rounded-xl hover:bg-muted/30 transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{report.title}</h4>
                    <p className="text-[10px] text-muted-foreground">{report.period} • {report.size}</p>
                  </div>
                </div>
                <Button 
                  onClick={() => generateCSV(report.type)}
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
