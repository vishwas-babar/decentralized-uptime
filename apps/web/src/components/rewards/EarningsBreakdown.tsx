import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
   PieChart,
   Pie,
   Cell,
   ResponsiveContainer,
   BarChart,
   Bar,
   XAxis,
   YAxis,
   Tooltip,
} from "recharts";
import { TrendingUp, Activity, Shield } from "lucide-react";
import { motion } from "framer-motion";

const pieData = [
   { name: "Validator Activity", value: 65, color: "#10b981" },
   { name: "Uptime Rewards", value: 25, color: "#3b82f6" },
   { name: "Accuracy Bonus", value: 10, color: "#8b5cf6" },
];

const weeklyData = [
   { day: "Mon", tokens: 0.8 },
   { day: "Tue", tokens: 1.2 },
   { day: "Wed", tokens: 0.9 },
   { day: "Thu", tokens: 1.5 },
   { day: "Fri", tokens: 1.1 },
   { day: "Sat", tokens: 0.7 },
   { day: "Sun", tokens: 1.3 },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
   cx,
   cy,
   midAngle,
   innerRadius,
   outerRadius,
   percent,
}: any) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
   const x = cx + radius * Math.cos(-midAngle * RADIAN);
   const y = cy + radius * Math.sin(-midAngle * RADIAN);

   return (
      <text
         x={x}
         y={y}
         fill="white"
         textAnchor={x > cx ? "start" : "end"}
         dominantBaseline="central"
         fontSize={12}
         fontWeight="600"
      >
         {`${(percent * 100).toFixed(0)}%`}
      </text>
   );
};

export function EarningsBreakdown() {
   const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
         return (
            <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-lg">
               <p className="text-slate-300 font-medium">{label}</p>
               <p className="text-emerald-400 font-semibold">
                  {`${payload[0].value} SOL`}
               </p>
            </div>
         );
      }
      return null;
   };

   return (
      <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
         <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
               <TrendingUp className="h-5 w-5 text-emerald-400" />
               Earnings Breakdown
            </CardTitle>
         </CardHeader>
         <CardContent className="space-y-6">
            {/* Earnings by Activity Type */}
            <div>
               <h3 className="text-lg font-semibold text-white mb-4">
                  Earnings by Activity
               </h3>
               <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                           data={pieData}
                           cx="50%"
                           cy="50%"
                           labelLine={false}
                           label={renderCustomizedLabel}
                           outerRadius={80}
                           fill="#8884d8"
                           dataKey="value"
                        >
                           {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                           ))}
                        </Pie>
                        <Tooltip
                           contentStyle={{
                              backgroundColor: "#1e293b",
                              border: "1px solid #475569",
                              borderRadius: "0.5rem",
                              color: "#f1f5f9",
                           }}
                        />
                     </PieChart>
                  </ResponsiveContainer>
               </div>

               {/* Legend */}
               <div className="grid grid-cols-1 gap-2 mt-4">
                  {pieData.map((item, index) => (
                     <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center gap-3"
                     >
                        <div
                           className="w-3 h-3 rounded-full"
                           style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-slate-300">
                           {item.name}
                        </span>
                        <span className="text-sm text-slate-400 ml-auto">
                           {item.value}%
                        </span>
                     </motion.div>
                  ))}
               </div>
            </div>

            {/* 7-Day Earnings Chart */}
            <div>
               <h3 className="text-lg font-semibold text-white mb-4">
                  Last 7 Days
               </h3>
               <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart
                        data={weeklyData}
                        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                     >
                        <XAxis
                           dataKey="day"
                           axisLine={false}
                           tickLine={false}
                           tick={{ fill: "#94a3b8", fontSize: 12 }}
                        />
                        <YAxis
                           axisLine={false}
                           tickLine={false}
                           tick={{ fill: "#94a3b8", fontSize: 12 }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar
                           dataKey="tokens"
                           fill="#10b981"
                           radius={[4, 4, 0, 0]}
                        />
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
               <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-600">
                  <div className="flex items-center gap-2 mb-2">
                     <Activity className="h-4 w-4 text-blue-400" />
                     <span className="text-sm text-slate-400">Avg Daily</span>
                  </div>
                  <span className="text-lg font-bold text-white">1.07 SOL</span>
               </div>
               <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-600">
                  <div className="flex items-center gap-2 mb-2">
                     <Shield className="h-4 w-4 text-purple-400" />
                     <span className="text-sm text-slate-400">Best Day</span>
                  </div>
                  <span className="text-lg font-bold text-white">1.5 SOL</span>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
