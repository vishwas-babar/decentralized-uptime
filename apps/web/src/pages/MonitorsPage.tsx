import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { MonitorStats } from "../components/monitors/MonitorStats";
import { MonitorFilters } from "../components/monitors/MonitorFilters";
import { MonitorTable } from "../components/monitors/MonitorTable";

const monitorsData = [
   {
      id: "mon_001",
      name: "Main Website",
      url: "https://example.com",
      status: "up",
      interval: "60s",
      lastChecked: "2 minutes ago",
      uptime7d: "99.8%",
      uptime30d: "99.5%",
      responseTime: "145ms",
      location: "Global",
      alertsEnabled: true,
   },
   {
      id: "mon_002",
      name: "API Endpoint",
      url: "https://api.myservice.com/health",
      status: "up",
      interval: "30s",
      lastChecked: "1 minute ago",
      uptime7d: "100%",
      uptime30d: "99.9%",
      responseTime: "89ms",
      location: "US East",
      alertsEnabled: true,
   },
   {
      id: "mon_003",
      name: "User Dashboard",
      url: "https://dashboard.app.io",
      status: "down",
      interval: "120s",
      lastChecked: "5 minutes ago",
      uptime7d: "97.2%",
      uptime30d: "98.1%",
      responseTime: "timeout",
      location: "EU West",
      alertsEnabled: true,
   },
   {
      id: "mon_004",
      name: "CDN Assets",
      url: "https://cdn.assets.com/status",
      status: "up",
      interval: "300s",
      lastChecked: "3 minutes ago",
      uptime7d: "99.9%",
      uptime30d: "99.7%",
      responseTime: "67ms",
      location: "Global",
      alertsEnabled: false,
   },
   {
      id: "mon_005",
      name: "Authentication Service",
      url: "https://auth.service.net/ping",
      status: "up",
      interval: "60s",
      lastChecked: "1 minute ago",
      uptime7d: "98.5%",
      uptime30d: "99.2%",
      responseTime: "234ms",
      location: "Asia",
      alertsEnabled: true,
   },
   {
      id: "mon_006",
      name: "Payment Gateway",
      url: "https://payments.gateway.com/status",
      status: "up",
      interval: "30s",
      lastChecked: "30 seconds ago",
      uptime7d: "99.6%",
      uptime30d: "99.4%",
      responseTime: "178ms",
      location: "US West",
      alertsEnabled: true,
   },
];

type FilterType = "all" | "up" | "down";

export default function MonitorsPage() {
   const [filter, setFilter] = useState<FilterType>("all");
   const [searchTerm, setSearchTerm] = useState("");
   const [isDialogOpen, setIsDialogOpen] = useState(false);

   const filteredMonitors = monitorsData.filter(monitor => {
      const matchesFilter = filter === "all" || monitor.status === filter;
      const matchesSearch =
         monitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         monitor.url.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
   });

   const upMonitors = monitorsData.filter(m => m.status === "up").length;
   const avgUptime =
      monitorsData.reduce(
         (sum, m) => sum + parseFloat(m.uptime30d.replace("%", "")),
         0
      ) / monitorsData.length;


   return (
      <div className="min-h-screen">
         {/* Fixed background that covers entire viewport */}
         <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 -z-10" />
         {/* Background decoration */}
         <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,197,94,0.1),transparent)] pointer-events-none -z-10" />

         <Navigation />

         <div className="relative max-w-7xl mx-auto p-6">
            <MonitorStats
               upMonitors={upMonitors}
               totalMonitors={monitorsData.length}
               avgUptime={avgUptime}
               isDialogOpen={isDialogOpen}
               onDialogOpenChange={setIsDialogOpen}
            />

            <MonitorFilters
               searchTerm={searchTerm}
               onSearchChange={setSearchTerm}
               filter={filter}
               onFilterChange={setFilter}
               totalMonitors={monitorsData.length}
               upMonitors={upMonitors}
            />

            <MonitorTable monitors={filteredMonitors} />
         </div>
      </div>
   );
}
