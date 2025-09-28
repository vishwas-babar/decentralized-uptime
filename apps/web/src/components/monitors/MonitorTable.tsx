import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { CheckCircle2, XCircle, Clock, Globe } from "lucide-react";
import { useGetUserWebsites } from "@/lib/queries/website/get-user-websites";
import { useEffect } from "react";

interface Monitor {
   id: string;
   name: string;
   url: string;
   status: string;
   interval: string;
   lastChecked: string;
   uptime7d: string;
   uptime30d: string;
   responseTime: string;
   location: string;
   alertsEnabled: boolean;
}

interface MonitorTableProps {
   monitors: Monitor[];
}

export function MonitorTable({ monitors }: MonitorTableProps) {
   const { data, isLoading, isError } = useGetUserWebsites();

   useEffect(() => {
      console.log("Websites data:", data, isLoading, isError);

      return () => {};
   }, [data, isLoading, isError]);

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

   if (isLoading) {
      return (
         <Card className="bg-slate-800/50 border-slate-700">
            <CardContent>
               <p className="text-slate-400">Loading...</p>
            </CardContent>
         </Card>
      );
   }

   if (isError) {
      return (
         <Card className="bg-slate-800/50 border-slate-700">
            <CardContent>
               <p className="text-red-400">Error loading websites</p>
            </CardContent>
         </Card>
      );
   }

   return (
      <Card className="bg-slate-800/50 border-slate-700">
         <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
               <Globe className="h-5 w-5 text-emerald-400" />
               Monitor Directory ({monitors.length})
            </CardTitle>
         </CardHeader>
         <CardContent>
            <Table>
               <TableHeader>
                  <TableRow className="border-slate-700">
                     <TableHead className="text-slate-400">Monitor</TableHead>
                     <TableHead className="text-slate-400">Status</TableHead>
                     <TableHead className="text-slate-400">
                        Response Time
                     </TableHead>
                     <TableHead className="text-slate-400">
                        Last Checked
                     </TableHead>
                     <TableHead className="text-slate-400">7d Uptime</TableHead>
                     <TableHead className="text-slate-400">
                        30d Uptime
                     </TableHead>
                     <TableHead className="text-slate-400">Location</TableHead>
                     <TableHead className="text-slate-400">Alerts</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {data.map((monitor: any) => (
                     <TableRow
                        key={monitor.id}
                        className="border-slate-700 hover:bg-slate-700/30"
                     >
                        <TableCell>
                           <div>
                              <p className="text-white font-medium">
                                 {monitor.name}
                              </p>
                              <p className="text-slate-400 text-sm">
                                 {monitor.url}
                              </p>
                              <p className="text-slate-500 text-xs">
                                 Every {monitor.checkInterval}
                              </p>
                           </div>
                        </TableCell>
                        <TableCell>
                           <div className="flex items-center gap-2">
                              {getStatusIcon(monitor.status)}
                              {getStatusBadge(monitor.status)}
                           </div>
                        </TableCell>
                        <TableCell className="text-slate-300">
                           {monitor.responseTime}
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
                        <TableCell className="text-slate-400">
                           {monitor.location}
                        </TableCell>
                        <TableCell>
                           {monitor.alertsEnabled ? (
                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                 Enabled
                              </Badge>
                           ) : (
                              <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">
                                 Disabled
                              </Badge>
                           )}
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </CardContent>
      </Card>
   );
}
