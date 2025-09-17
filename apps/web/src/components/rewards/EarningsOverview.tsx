import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, TrendingUp, CreditCard, Wallet } from "lucide-react";
import { motion } from "framer-motion";

const earningsData = [
   {
      title: "Total Earned",
      value: "15.2",
      suffix: "SOL",
      description: "All-time earnings",
      icon: Coins,
      trend: "+2.1 SOL this month",
      color: "text-emerald-400",
   },
   {
      title: "Pending Rewards",
      value: "3.0",
      suffix: "SOL",
      description: "Not yet withdrawn",
      icon: TrendingUp,
      trend: "+0.5 SOL today",
      color: "text-yellow-400",
   },
   {
      title: "Withdrawn Rewards",
      value: "12.2",
      suffix: "SOL",
      description: "Lifetime withdrawals",
      icon: CreditCard,
      trend: "Last: 2 days ago",
      color: "text-blue-400",
   },
   {
      title: "Current Balance",
      value: "2.8",
      suffix: "SOL",
      description: "Available to withdraw",
      icon: Wallet,
      trend: "Ready for withdrawal",
      color: "text-purple-400",
   },
];

export function EarningsOverview() {
   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {earningsData.map((stat, index) => (
            <motion.div
               key={index}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: index * 0.1 }}
            >
               <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:border-emerald-500/50">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium text-slate-400">
                        {stat.title}
                     </CardTitle>
                     <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                     <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-white">
                           {stat.value}
                        </span>
                        <span className="text-lg font-semibold text-slate-400">
                           ◎ {stat.suffix}
                        </span>
                     </div>
                     <p className="text-xs text-slate-400 mt-1">
                        {stat.description}
                     </p>
                     <p className={`text-xs mt-2 ${stat.color}`}>
                        {stat.trend}
                     </p>
                  </CardContent>
               </Card>
            </motion.div>
         ))}
      </div>
   );
}
