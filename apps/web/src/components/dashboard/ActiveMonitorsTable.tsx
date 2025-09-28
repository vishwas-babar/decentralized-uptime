import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Activity, Loader2, Clock } from "lucide-react";
import {
   useGetWebsiteStatus,
   type WebsiteWithStatus,
} from "@/lib/queries/website/get-website-status";

type FilterType = "all" | "online" | "offline";

// Component for rendering the last 50 status ticks from real data
const StatusTicks = ({
   ticks,
}: {
   ticks: Array<{ status: "UP" | "DOWN"; createdAt: string }>;
}) => {
   // Since ticks come in descending order (newest first), we need to reverse for display
   // We want to show the progression from oldest to newest (left to right)
   const sortedTicks = [...ticks].sort(
      (a, b) =>
         new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
   );

   // Helper function to format relative time
   const getRelativeTime = (timestamp: string) => {
      const now = new Date();
      const tickTime = new Date(timestamp);
      const diffInMinutes = Math.floor(
         (now.getTime() - tickTime.getTime()) / (1000 * 60)
      );

      if (diffInMinutes < 1) return "Just now";
      if (diffInMinutes === 1) return "1 minute ago";
      if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;

      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours === 1) return "1 hour ago";
      if (diffInHours < 24) return `${diffInHours} hours ago`;

      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays === 1) return "1 day ago";
      return `${diffInDays} days ago`;
   };

   // If we have fewer than 50 ticks, pad with unknown status
   const displayTicks = Array.from({ length: 50 }, (_, index) => {
      const tick = sortedTicks[index];
      if (!tick) {
         return {
            status: "UNKNOWN" as const,
            createdAt: "",
            isPlaceholder: true,
         };
      }
      return {
         ...tick,
         status: tick.status as "UP" | "DOWN",
         isPlaceholder: false,
      };
   });

   return (
      <div className="flex gap-0.5">
         {displayTicks.map((tick, index) => (
            <div
               key={index}
               className={`w-4 h-2 rounded-sm ${
                  tick.status === "UP"
                     ? "bg-emerald-400"
                     : tick.status === "DOWN"
                       ? "bg-red-400"
                       : "bg-gray-600"
               }`}
               title={
                  tick.isPlaceholder
                     ? "No monitoring data available"
                     : `Status: ${tick.status}\nTime: ${new Date(tick.createdAt).toLocaleString()}\n${getRelativeTime(tick.createdAt)}`
               }
            />
         ))}
      </div>
   );
};

// Component for individual monitor card
const MonitorCard = ({ monitor }: { monitor: WebsiteWithStatus }) => {
   const getStatusIcon = (status: string) => {
      if (status === "UP") {
         return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
      }
      return <XCircle className="h-4 w-4 text-red-400" />;
   };

   const formatLastChecked = (timestamp: string | null) => {
      if (!timestamp) return "Never";

      const now = new Date();
      const lastChecked = new Date(timestamp);
      const diffInMinutes = Math.floor(
         (now.getTime() - lastChecked.getTime()) / (1000 * 60)
      );

      if (diffInMinutes < 1) return "Just now";
      if (diffInMinutes === 1) return "1 minute ago";
      if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;

      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours === 1) return "1 hour ago";
      return `${diffInHours} hours ago`;
   };

   useEffect(() => {
      console.log(monitor.stats);

      return () => {};
   }, [monitor.stats]);

   return (
      <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 hover:bg-slate-800/50 transition-colors">
         <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
               {getStatusIcon(monitor.stats.currentStatus)}
               <div>
                  <h3 className="text-white font-medium text-sm">
                     {monitor.url}
                  </h3>
                  <p className="text-slate-400 text-xs flex items-center gap-1">
                     <Clock className="h-3 w-3" />
                     Last checked:{" "}
                     {formatLastChecked(monitor.stats.lastChecked)}
                  </p>
               </div>
            </div>
            <div className="text-right">
               <div className="text-white font-semibold text-lg">
                  {monitor.stats.uptimePercentage}% uptime
               </div>
               {monitor.stats.currentStatus === "UP" &&
                  monitor.stats.averageLatency > 0 && (
                     <div className="text-slate-400 text-xs">
                        ~{monitor.stats.averageLatency}ms avg
                     </div>
                  )}
            </div>
         </div>

         <div className="mb-2">
            <p className="text-slate-400 text-xs mb-1">
               Last 50 status checks:
            </p>
            <StatusTicks ticks={monitor.ticks} />
         </div>
      </div>
   );
};

export function ActiveMonitorsTable() {
   const [filter, setFilter] = useState<FilterType>("all");
   const { data: websites, isLoading, error } = useGetWebsiteStatus();

   const filteredMonitors =
      websites?.filter(monitor => {
         if (filter === "online") return monitor.stats.currentStatus === "UP";
         if (filter === "offline")
            return monitor.stats.currentStatus === "DOWN";
         return true;
      }) || [];

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
         <CardContent className="space-y-3">
            {isLoading && (
               <div className="flex items-center justify-center py-8 text-slate-400">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  Loading monitors...
               </div>
            )}

            {error && (
               <div className="text-center py-8 text-red-400">
                  Failed to load monitors. Please try again.
               </div>
            )}

            {!isLoading &&
               !error &&
               filteredMonitors.length > 0 &&
               filteredMonitors.map(monitor => (
                  <MonitorCard key={monitor.id} monitor={monitor} />
               ))}

            {!isLoading &&
               !error &&
               filteredMonitors.length === 0 &&
               websites &&
               websites.length > 0 && (
                  <div className="text-center py-8 text-slate-400">
                     No monitors found for the selected filter.
                  </div>
               )}

            {!isLoading && !error && (!websites || websites.length === 0) && (
               <div className="text-center py-8 text-slate-400">
                  No monitors configured yet. Create your first monitor to get
                  started.
               </div>
            )}
         </CardContent>
      </Card>
   );
}
