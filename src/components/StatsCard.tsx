import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color?: string;
}

export const StatsCard = ({ title, value, icon: Icon, trend, trendUp, color = "hsl(var(--accent-teal))" }: StatsCardProps) => {
  return (
    <Card className="hover-lift card-shadow overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-stretch">
          <div className="w-1.5" style={{ backgroundColor: color }} />
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
                <p className="text-2xl font-bold text-foreground">{value}</p>
                {trend && (
                  <p className={`text-xs font-medium ${trendUp ? 'text-[hsl(var(--success))]' : 'text-destructive'}`}>
                    {trend}
                  </p>
                )}
              </div>
              <div className="rounded-lg p-2.5" style={{ backgroundColor: `${color}15` }}>
                <Icon className="h-5 w-5" style={{ color }} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
