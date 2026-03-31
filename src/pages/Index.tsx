import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { StatsCard } from "@/components/StatsCard";
import { AttendanceTable } from "@/components/AttendanceTable";
import { AnalyticsCharts } from "@/components/AnalyticsCharts";
import { AIInsights } from "@/components/AIInsights";
import { DashboardFilters } from "@/components/DashboardFilters";
import { Users, CheckCircle, XCircle, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface IndexProps {
  staffName?: string;
  onLogout?: () => void;
}

const Index = ({ staffName, onLogout }: IndexProps) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({ total: 0, present: 0, notPresent: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await supabase.from("staff_attendance").select("status");
      if (data) {
        const total = data.length;
        const present = data.filter(r => r.status === "Present").length;
        setStats({ total, present, notPresent: total - present });
      }
    };
    fetchStats();
  }, []);

  const presentPercent = stats.total > 0 ? ((stats.present / stats.total) * 100).toFixed(1) : "0";

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-4 fade-in">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Total Staff"
                value={stats.total}
                icon={Users}
                trend="All registered staff"
                trendUp={true}
                color="hsl(210, 30%, 40%)"
              />
              <StatsCard
                title="Present Today"
                value={stats.present}
                icon={CheckCircle}
                trend={`${presentPercent}% attendance`}
                trendUp={true}
                color="hsl(142, 71%, 45%)"
              />
              <StatsCard
                title="Not Present"
                value={stats.notPresent}
                icon={XCircle}
                trend={`${(100 - parseFloat(presentPercent)).toFixed(1)}% absent`}
                trendUp={false}
                color="hsl(0, 84%, 60%)"
              />
              <StatsCard
                title="Departments"
                value="15"
                icon={Clock}
                trend="Active departments"
                trendUp={true}
                color="hsl(170, 65%, 45%)"
              />
            </div>
            <DashboardFilters
              departmentFilter={departmentFilter}
              setDepartmentFilter={setDepartmentFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <AttendanceTable
              departmentFilter={departmentFilter}
              statusFilter={statusFilter}
              searchQuery={searchQuery}
            />
          </div>
        );
      case "analytics":
        return (
          <div className="space-y-4 fade-in">
            <h2 className="text-xl font-bold">Analytics & Reports</h2>
            <AnalyticsCharts />
          </div>
        );
      case "ai-insights":
        return (
          <div className="space-y-4 fade-in">
            <h2 className="text-xl font-bold">AI Insights & Automation</h2>
            <AIInsights />
          </div>
        );
      default:
        return (
          <div className="flex h-96 items-center justify-center fade-in">
            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">This section is under development</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar staffName={staffName} onLogout={onLogout} />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground">
                {activeTab === "dashboard" ? "Staff Attendance Dashboard" : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
              <p className="text-xs text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
          {renderContent()}
          <footer className="mt-8 border-t pt-4 text-center text-xs text-muted-foreground">
            <p>© 2025 SCSVMV University | Automated Staff Monitoring System</p>
            <p className="mt-0.5">Powered by AI — Inspired by Zoho Interface</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
