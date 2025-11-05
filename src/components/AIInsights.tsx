import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const insights = [
  {
    id: 1,
    type: "success",
    icon: CheckCircle,
    title: "Excellent Attendance Pattern",
    description: "Computer Science department maintains 95% attendance rate this week.",
    priority: "Low",
  },
  {
    id: 2,
    type: "warning",
    icon: AlertTriangle,
    title: "Late Entry Trend Detected",
    description: "5 staff members consistently arriving 15+ minutes late in the past week.",
    priority: "Medium",
  },
  {
    id: 3,
    type: "info",
    icon: TrendingUp,
    title: "Working Hours Analysis",
    description: "Average working hours increased by 0.5 hours compared to last month.",
    priority: "Low",
  },
];

const automationStatus = [
  { label: "Daily Data Sync", status: "Active", lastRun: "5 mins ago" },
  { label: "Anomaly Detection", status: "Active", lastRun: "1 hour ago" },
  { label: "Report Generation", status: "Scheduled", lastRun: "Tomorrow 9:00 AM" },
];

export const AIInsights = () => {
  const getIconColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-success";
      case "warning":
        return "text-warning";
      case "info":
        return "text-info";
      default:
        return "text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-destructive/10 text-destructive";
      case "Medium":
        return "bg-warning/10 text-warning";
      case "Low":
        return "bg-success/10 text-success";
      default:
        return "";
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="card-shadow col-span-2">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            <CardTitle>AI-Powered Insights</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight) => {
            const Icon = insight.icon;
            return (
              <div
                key={insight.id}
                className="flex items-start gap-4 rounded-lg border p-4 hover:bg-secondary/50 transition-colors"
              >
                <div className={`rounded-lg bg-primary/10 p-2 ${getIconColor(insight.type)}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{insight.title}</h4>
                    <Badge className={getPriorityColor(insight.priority)}>
                      {insight.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="card-shadow col-span-2">
        <CardHeader>
          <CardTitle>Automation Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {automationStatus.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">Last run: {item.lastRun}</p>
                </div>
                <Badge
                  className={
                    item.status === "Active"
                      ? "bg-success/10 text-success"
                      : "bg-info/10 text-info"
                  }
                >
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
