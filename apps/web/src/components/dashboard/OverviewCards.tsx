import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Shield, TrendingUp, Coins } from "lucide-react";

const statsData = [
  {
    title: "Total Monitors",
    value: "24",
    description: "Active websites tracked",
    icon: Activity,
    trend: "+2 this week",
  },
  {
    title: "Validators Online",
    value: "127",
    description: "Connected validators",
    icon: Shield,
    trend: "98.4% uptime",
  },
  {
    title: "Aggregate Uptime",
    value: "99.2%",
    description: "30-day average",
    icon: TrendingUp,
    trend: "+0.3% from last month",
  },
  {
    title: "Tokens Distributed",
    value: "12,847",
    description: "SOL lifetime rewards",
    icon: Coins,
    trend: "+247 today",
  },
];

export function OverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <Card
          key={index}
          className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <p className="text-xs text-slate-400 mt-1">{stat.description}</p>
            <p className="text-xs text-emerald-400 mt-2">{stat.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
