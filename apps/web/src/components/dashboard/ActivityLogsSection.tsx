import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, CheckCircle2, XCircle, Clock } from "lucide-react";

const activityData = [
   {
      id: 1,
      timestamp: "21:45",
      validator: "Validator Alpha",
      action: "checked",
      target: "example.com",
      status: "up",
      time: "2 min ago",
   },
   {
      id: 2,
      timestamp: "21:43",
      validator: "Validator Beta",
      action: "checked",
      target: "api.myservice.com",
      status: "up",
      time: "4 min ago",
   },
   {
      id: 3,
      timestamp: "21:41",
      validator: "Validator Gamma",
      action: "checked",
      target: "dashboard.app.io",
      status: "down",
      time: "6 min ago",
   },
   {
      id: 4,
      timestamp: "21:40",
      validator: "Validator Delta",
      action: "checked",
      target: "cdn.assets.com",
      status: "up",
      time: "7 min ago",
   },
   {
      id: 5,
      timestamp: "21:38",
      validator: "Validator Echo",
      action: "checked",
      target: "auth.service.net",
      status: "up",
      time: "9 min ago",
   },
   {
      id: 6,
      timestamp: "21:36",
      validator: "Validator Alpha",
      action: "checked",
      target: "example.com",
      status: "up",
      time: "11 min ago",
   },
   {
      id: 7,
      timestamp: "21:35",
      validator: "Validator Beta",
      action: "checked",
      target: "api.myservice.com",
      status: "up",
      time: "12 min ago",
   },
   {
      id: 8,
      timestamp: "21:33",
      validator: "Validator Gamma",
      action: "checked",
      target: "dashboard.app.io",
      status: "down",
      time: "14 min ago",
   },
];

export function ActivityLogsSection() {
   const getStatusIcon = (status: string) => {
      if (status === "up") {
         return <CheckCircle2 className="h-3 w-3 text-emerald-400" />;
      }
      return <XCircle className="h-3 w-3 text-red-400" />;
   };

   const getStatusBadge = (status: string) => {
      if (status === "up") {
         return (
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
               UP
            </Badge>
         );
      }
      return (
         <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
            DOWN
         </Badge>
      );
   };

   return (
      <Card className="bg-slate-800/50 border-slate-700">
         <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
               <Activity className="h-5 w-5 text-emerald-400" />
               Live Activity Feed
            </CardTitle>
         </CardHeader>
         <CardContent>
            <div className="space-y-4 max-h-80 overflow-y-auto">
               {activityData.map(activity => (
                  <div
                     key={activity.id}
                     className="flex items-start justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                  >
                     <div className="flex items-start gap-3 flex-1">
                        <div className="flex items-center gap-2 mt-0.5">
                           {getStatusIcon(activity.status)}
                        </div>
                        <div className="flex-1">
                           <p className="text-white text-sm">
                              <span className="text-emerald-400 font-medium">
                                 {activity.validator}
                              </span>{" "}
                              {activity.action}{" "}
                              <span className="text-blue-400 font-medium">
                                 {activity.target}
                              </span>
                           </p>
                           <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1 text-xs text-slate-400">
                                 <Clock className="h-3 w-3" />
                                 {activity.timestamp}
                              </div>
                              {getStatusBadge(activity.status)}
                           </div>
                        </div>
                     </div>
                     <div className="text-xs text-slate-400 whitespace-nowrap">
                        {activity.time}
                     </div>
                  </div>
               ))}
            </div>
         </CardContent>
      </Card>
   );
}
