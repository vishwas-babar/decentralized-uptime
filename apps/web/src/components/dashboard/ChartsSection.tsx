import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
   LineChart,
   Line,
   XAxis,
   YAxis,
   CartesianGrid,
   ResponsiveContainer,
   BarChart,
   Bar,
} from "recharts";
import { TrendingUp, BarChart3 } from "lucide-react";

const uptimeData = [
   { name: "Jan", uptime: 98.2 },
   { name: "Feb", uptime: 99.1 },
   { name: "Mar", uptime: 98.8 },
   { name: "Apr", uptime: 99.5 },
   { name: "May", uptime: 99.2 },
   { name: "Jun", uptime: 99.8 },
   { name: "Jul", uptime: 99.3 },
];

const tokenData = [
   { name: "Week 1", tokens: 180 },
   { name: "Week 2", tokens: 220 },
   { name: "Week 3", tokens: 190 },
   { name: "Week 4", tokens: 280 },
   { name: "Week 5", tokens: 240 },
   { name: "Week 6", tokens: 320 },
   { name: "Week 7", tokens: 290 },
];

export function ChartsSection() {
   return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Uptime Trend Chart */}
         <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
               <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                  Uptime Trend (7 Months)
               </CardTitle>
            </CardHeader>
            <CardContent>
               <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={uptimeData}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                     <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                     <YAxis stroke="#9CA3AF" fontSize={12} domain={[95, 100]} />
                     <Line
                        type="monotone"
                        dataKey="uptime"
                        stroke="#10B981"
                        strokeWidth={2}
                        dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: "#10B981", strokeWidth: 2 }}
                     />
                  </LineChart>
               </ResponsiveContainer>
            </CardContent>
         </Card>

         {/* Token Distribution Chart */}
         <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
               <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-emerald-400" />
                  Token Distribution (Weekly)
               </CardTitle>
            </CardHeader>
            <CardContent>
               <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={tokenData}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                     <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                     <YAxis stroke="#9CA3AF" fontSize={12} />
                     <Bar
                        dataKey="tokens"
                        fill="#10B981"
                        radius={[4, 4, 0, 0]}
                     />
                  </BarChart>
               </ResponsiveContainer>
            </CardContent>
         </Card>
      </div>
   );
}
