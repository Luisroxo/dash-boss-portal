import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: LucideIcon;
}

export default function StatsCard({ title, value, change, changeType = "neutral", icon: Icon }: StatsCardProps) {
  const changeColor = {
    positive: "text-success",
    negative: "text-destructive",
    neutral: "text-muted-foreground",
  }[changeType];

  const TrendIcon = changeType === "positive" ? TrendingUp : changeType === "negative" ? TrendingDown : null;

  return (
    <Card className="p-6 bg-gradient-card shadow-card hover:shadow-elevated transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {Icon && (
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        )}
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {change && (
            <div className={`flex items-center gap-1 mt-2 ${changeColor}`}>
              {TrendIcon && <TrendIcon className="w-4 h-4" />}
              <span className="text-sm font-medium">{change}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
