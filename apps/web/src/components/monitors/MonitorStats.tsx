import { Activity } from "lucide-react";
import { CreateMonitorDialog } from "./CreateMonitorDialog";

interface MonitorStatsProps {
   upMonitors: number;
   totalMonitors: number;
   avgUptime: number;
   isDialogOpen: boolean;
   onDialogOpenChange: (open: boolean) => void;
}

export function MonitorStats({
   upMonitors,
   totalMonitors,
   avgUptime,
   isDialogOpen,
   onDialogOpenChange,
}: MonitorStatsProps) {
   return (
      <div className="flex items-center justify-between mb-8">
         <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
               <Activity className="h-8 w-8 text-emerald-400" />
               Website Monitors
            </h1>
            <p className="text-slate-400 mt-2">
               Track the uptime and performance of your services
            </p>
         </div>

         <div className="flex items-center gap-4">
            <div className="bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
               <p className="text-sm text-slate-400">Active Monitors</p>
               <p className="text-xl font-bold text-emerald-400">
                  {upMonitors}/{totalMonitors}
               </p>
            </div>
            <div className="bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
               <p className="text-sm text-slate-400">Avg Uptime</p>
               <p className="text-xl font-bold text-white">
                  {avgUptime.toFixed(1)}%
               </p>
            </div>

            <CreateMonitorDialog
               isOpen={isDialogOpen}
               onOpenChange={onDialogOpenChange}
            />
         </div>
      </div>
   );
}
