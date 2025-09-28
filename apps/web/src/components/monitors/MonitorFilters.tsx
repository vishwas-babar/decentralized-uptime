import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

type FilterType = "all" | "up" | "down";

interface MonitorFiltersProps {
   searchTerm: string;
   onSearchChange: (value: string) => void;
   filter: FilterType;
   onFilterChange: (filter: FilterType) => void;
   totalMonitors: number;
   upMonitors: number;
}

export function MonitorFilters({
   searchTerm,
   onSearchChange,
   filter,
   onFilterChange,
   totalMonitors,
   upMonitors,
}: MonitorFiltersProps) {
   return (
      <Card className="bg-slate-800/50 border-slate-700 mb-8">
         <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="relative">
                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                     <Input
                        placeholder="Search monitors..."
                        value={searchTerm}
                        onChange={e => onSearchChange(e.target.value)}
                        className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-emerald-400"
                     />
                  </div>
               </div>

               <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-slate-400" />
                  <Button
                     variant={filter === "all" ? "default" : "ghost"}
                     size="sm"
                     onClick={() => onFilterChange("all")}
                     className={
                        filter === "all"
                           ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                           : "text-slate-400 hover:text-white hover:bg-slate-700"
                     }
                  >
                     All ({totalMonitors})
                  </Button>
                  <Button
                     variant={filter === "up" ? "default" : "ghost"}
                     size="sm"
                     onClick={() => onFilterChange("up")}
                     className={
                        filter === "up"
                           ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                           : "text-slate-400 hover:text-white hover:bg-slate-700"
                     }
                  >
                     Online ({upMonitors})
                  </Button>
                  <Button
                     variant={filter === "down" ? "default" : "ghost"}
                     size="sm"
                     onClick={() => onFilterChange("down")}
                     className={
                        filter === "down"
                           ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                           : "text-slate-400 hover:text-white hover:bg-slate-700"
                     }
                  >
                     Offline ({totalMonitors - upMonitors})
                  </Button>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
