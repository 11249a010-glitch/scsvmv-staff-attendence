import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { StatsCard } from "@/components/StatsCard";
import { AttendanceTable } from "@/components/AttendanceTable";
import { AnalyticsCharts } from "@/components/AnalyticsCharts";
import { AIInsights } from "@/components/AIInsights";
import { DashboardFilters } from "@/components/DashboardFilters";
import { Users, Clock, TrendingUp, AlertCircle } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6 fade-in">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Total Staff"
                value="52"
                icon={Users}
                trend="+2 from last month"
                trendUp={true}
              />
              <StatsCard
                title="Present Today"
                value="47"
                icon={TrendingUp}
                trend="90.4% attendance"
                trendUp={true}
              />
              <StatsCard
                title="Late Arrivals"
                value="5"
                icon={Clock}
                trend="-2 from yesterday"
                trendUp={true}
              />
              <StatsCard
                title="Absent"
                value="2"
                icon={AlertCircle}
                trend="3.8% absence rate"
                trendUp={false}
              />
            </div>

            <DashboardFilters />
            <AttendanceTable />
          </div>
        );
      case "analytics":
        return (
          <div className="space-y-6 fade-in">
            <h2 className="text-2xl font-bold">Analytics & Reports</h2>
            <AnalyticsCharts />
          </div>
        );
      case "ai-insights":
        return (
          <div className="space-y-6 fade-in">
            <h2 className="text-2xl font-bold">AI Insights & Automation</h2>
            <AIInsights />
          </div>
        );
      default:
        return (
          <div className="flex h-96 items-center justify-center fade-in">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
              <p className="mt-2 text-muted-foreground">This section is under development</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6">
          {renderContent()}
          
          <footer className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
            <p>© 2025 SCSVMV University | Automated Staff Monitoring System</p>
            <p className="mt-1">Powered by AI — Inspired by Zoho Interface</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
