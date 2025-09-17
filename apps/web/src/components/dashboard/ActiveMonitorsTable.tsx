import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { CheckCircle2, XCircle, Clock, Activity } from "lucide-react";

const monitorsData = [
   {
      id: 1,
      website: "example.com",
      status: "up",
      lastChecked: "2 minutes ago",
      uptime7d: "99.8%",
      uptime30d: "99.5%",
   },
   {
      id: 2,
      website: "api.myservice.com",
      status: "up",
      lastChecked: "1 minute ago",
      uptime7d: "100%",
      uptime30d: "99.9%",
   },
   {
      id: 3,
      website: "dashboard.app.io",
      status: "down",
      lastChecked: "5 minutes ago",
      uptime7d: "97.2%",
      uptime30d: "98.1%",
   },
   {
      id: 4,
      website: "cdn.assets.com",
      status: "up",
      lastChecked: "3 minutes ago",
      uptime7d: "99.9%",
      uptime30d: "99.7%",
   },
   {
      id: 5,
      website: "auth.service.net",
      status: "up",
      lastChecked: "1 minute ago",
      uptime7d: "98.5%",
      uptime30d: "99.2%",
   },
];

type FilterType = "all" | "online" | "offline";

export function ActiveMonitorsTable() {
   const [filter, setFilter] = useState<FilterType>("all");

   const filteredMonitors = monitorsData.filter(monitor => {
      if (filter === "online") return monitor.status === "up";
      if (filter === "offline") return monitor.status === "down";
      return true;
   });

   const getStatusIcon = (status: string) => {
      if (status === "up") {
         return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
      }
      return <XCircle className="h-4 w-4 text-red-400" />;
   };

   const getStatusBadge = (status: string) => {
      if (status === "up") {
         return (
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
               Up
            </Badge>
         );
      }
      return (
         <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            Down
         </Badge>
      );
   };

   return (
      <Card className="bg-slate-800/50 border-slate-700">
         <CardHeader>
            <div className="flex items-center justify-between">
               <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="h-5 w-5 text-emerald-400" />
                  Active Monitors
               </CardTitle>
               <div className="flex gap-2">
                  <Button
                     variant={filter === "all" ? "default" : "ghost"}
                     size="sm"
                     onClick={() => setFilter("all")}
                     className={
                        filter === "all"
                           ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                           : "text-slate-400 hover:text-white hover:bg-slate-700"
                     }
                  >
                     All
                  </Button>
                  <Button
                     variant={filter === "online" ? "default" : "ghost"}
                     size="sm"
                     onClick={() => setFilter("online")}
                     className={
                        filter === "online"
                           ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                           : "text-slate-400 hover:text-white hover:bg-slate-700"
                     }
                  >
                     Online
                  </Button>
                  <Button
                     variant={filter === "offline" ? "default" : "ghost"}
                     size="sm"
                     onClick={() => setFilter("offline")}
                     className={
                        filter === "offline"
                           ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                           : "text-slate-400 hover:text-white hover:bg-slate-700"
                     }
                  >
                     Offline
                  </Button>
               </div>
            </div>
         </CardHeader>
         <CardContent>
            <Table>
               <TableHeader>
                  <TableRow className="border-slate-700">
                     <TableHead className="text-slate-400">Website</TableHead>
                     <TableHead className="text-slate-400">Status</TableHead>
                     <TableHead className="text-slate-400">
                        Last Checked
                     </TableHead>
                     <TableHead className="text-slate-400">7d Uptime</TableHead>
                     <TableHead className="text-slate-400">
                        30d Uptime
                     </TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {filteredMonitors.map(monitor => (
                     <TableRow
                        key={monitor.id}
                        className="border-slate-700 hover:bg-slate-700/30"
                     >
                        <TableCell className="text-white font-medium">
                           {monitor.website}
                        </TableCell>
                        <TableCell>
                           <div className="flex items-center gap-2">
                              {getStatusIcon(monitor.status)}
                              {getStatusBadge(monitor.status)}
                           </div>
                        </TableCell>
                        <TableCell className="text-slate-400 flex items-center gap-1">
                           <Clock className="h-3 w-3" />
                           {monitor.lastChecked}
                        </TableCell>
                        <TableCell className="text-slate-300">
                           {monitor.uptime7d}
                        </TableCell>
                        <TableCell className="text-slate-300">
                           {monitor.uptime30d}
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </CardContent>
      </Card>
   );
}
