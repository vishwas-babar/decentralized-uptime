import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, LogOut, User } from "lucide-react";

export function DashboardHeader() {
   return (
      <div className="flex items-center justify-between mb-8">
         <div>
            <h1 className="text-3xl font-bold text-white">
               UptimeRobot Dashboard
            </h1>
            <p className="text-slate-400 mt-2">
               Monitor your services and track validator performance
            </p>
         </div>

         <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <Button
               variant="ghost"
               size="icon"
               className="text-slate-400 hover:text-white hover:bg-slate-700"
            >
               <Bell className="h-5 w-5" />
            </Button>

            {/* Settings */}
            <Button
               variant="ghost"
               size="icon"
               className="text-slate-400 hover:text-white hover:bg-slate-700"
            >
               <Settings className="h-5 w-5" />
            </Button>

            {/* User Profile */}
            <div className="flex items-center gap-3 bg-slate-700/50 px-4 py-2 rounded-lg">
               <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-400" />
                  <span className="text-white text-sm">admin@uptime.com</span>
               </div>
               <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                  Pro
               </Badge>
            </div>

            {/* Logout */}
            <Button
               variant="ghost"
               size="icon"
               className="text-slate-400 hover:text-red-400 hover:bg-slate-700"
            >
               <LogOut className="h-5 w-5" />
            </Button>
         </div>
      </div>
   );
}
