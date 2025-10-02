import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUserStatsForDashboard } from "@/lib/queries/user/get-user-stats";
import { Activity, Shield, TrendingUp, Coins } from "lucide-react";

export function OverviewCards() {
   const { data, isLoading, error } = useGetUserStatsForDashboard();

   // Format uptime change with proper sign and text
   const formatUptimeChange = (change: number) => {
      if (change > 0) return `+${change}% from last month`;
      if (change < 0) return `${change}% from last month`;
      return "No change from last month";
   };

   // Static data for the last card (SOL tokens)
   const tokensCard = {
      title: "Tokens Distributed",
      value: "12,847",
      description: "SOL lifetime rewards",
      icon: Coins,
      trend: "+247 today",
   };

   if (isLoading) {
      return (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
               <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <div className="h-4 w-20 bg-slate-600 rounded animate-pulse" />
                     <div className="h-4 w-4 bg-slate-600 rounded animate-pulse" />
                  </CardHeader>
                  <CardContent>
                     <div className="h-8 w-16 bg-slate-600 rounded animate-pulse mb-2" />
                     <div className="h-3 w-24 bg-slate-600 rounded animate-pulse mb-2" />
                     <div className="h-3 w-20 bg-slate-600 rounded animate-pulse" />
                  </CardContent>
               </Card>
            ))}
         </div>
      );
   }

   if (error) {
      return (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-red-900/20 border-red-700">
               <CardContent className="pt-6">
                  <p className="text-red-400 text-sm">
                     Failed to load dashboard stats
                  </p>
               </CardContent>
            </Card>
         </div>
      );
   }

   const stats = data?.data;
   if (!stats) return null;

   // Dynamic stats data from API
   const statsData = [
      {
         title: "Total Monitors",
         value: stats.totalMonitors.toString(),
         description: "Active websites tracked",
         icon: Activity,
         trend: `+${stats.monitorsThisWeek} this week`,
      },
      {
         title: "Validators Online",
         value: stats.validatorsOnline.toString(),
         description: "Connected validators",
         icon: Shield,
         trend: `${stats.validatorUptime}% uptime`,
      },
      {
         title: "Aggregate Uptime",
         value: `${stats.aggregateUptime}%`,
         description: "30-day average",
         icon: TrendingUp,
         trend: formatUptimeChange(stats.uptimeChange),
      },
      tokensCard, // Keep static for now
   ];

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
                  <div className="text-2xl font-bold text-white">
                     {stat.value}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                     {stat.description}
                  </p>
                  <p className="text-xs text-emerald-400 mt-2">{stat.trend}</p>
               </CardContent>
            </Card>
         ))}
      </div>
   );
}
