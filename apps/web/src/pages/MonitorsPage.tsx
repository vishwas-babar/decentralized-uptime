import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import {
   Activity,
   Plus,
   CheckCircle2,
   XCircle,
   Clock,
   Globe,
   Search,
   Filter,
} from "lucide-react";

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
   const [formData, setFormData] = useState({
      name: "",
      url: "",
      interval: "60",
      description: "",
      location: "global",
      alertsEnabled: true,
   });

   const filteredMonitors = monitorsData.filter(monitor => {
      const matchesFilter = filter === "all" || monitor.status === filter;
      const matchesSearch =
         monitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         monitor.url.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
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

   const upMonitors = monitorsData.filter(m => m.status === "up").length;
   const avgUptime =
      monitorsData.reduce(
         (sum, m) => sum + parseFloat(m.uptime30d.replace("%", "")),
         0
      ) / monitorsData.length;

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Creating monitor:", formData);
      // Here you would typically send the data to your backend
      setIsDialogOpen(false);
      // Reset form
      setFormData({
         name: "",
         url: "",
         interval: "60",
         description: "",
         location: "global",
         alertsEnabled: true,
      });
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
         {/* Background decoration */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,197,94,0.1),transparent)] pointer-events-none" />

         <Navigation />

         <div className="relative max-w-7xl mx-auto p-6">
            {/* Header */}
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
                        {upMonitors}/{monitorsData.length}
                     </p>
                  </div>
                  <div className="bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
                     <p className="text-sm text-slate-400">Avg Uptime</p>
                     <p className="text-xl font-bold text-white">
                        {avgUptime.toFixed(1)}%
                     </p>
                  </div>

                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                     <DialogTrigger asChild>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                           <Plus className="h-4 w-4 mr-2" />
                           Create Monitor
                        </Button>
                     </DialogTrigger>
                     <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
                        <DialogHeader>
                           <DialogTitle className="text-white">
                              Create New Monitor
                           </DialogTitle>
                           <DialogDescription className="text-slate-400">
                              Add a new website or service to monitor for uptime
                              and performance.
                           </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                           <div>
                              <Label htmlFor="name" className="text-slate-300">
                                 Monitor Name
                              </Label>
                              <Input
                                 id="name"
                                 value={formData.name}
                                 onChange={e =>
                                    setFormData({
                                       ...formData,
                                       name: e.target.value,
                                    })
                                 }
                                 placeholder="My Website"
                                 className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                                 required
                              />
                           </div>

                           <div>
                              <Label htmlFor="url" className="text-slate-300">
                                 Website URL
                              </Label>
                              <Input
                                 id="url"
                                 type="url"
                                 value={formData.url}
                                 onChange={e =>
                                    setFormData({
                                       ...formData,
                                       url: e.target.value,
                                    })
                                 }
                                 placeholder="https://example.com"
                                 className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                                 required
                              />
                           </div>

                           <div className="grid grid-cols-2 gap-4">
                              <div>
                                 <Label
                                    htmlFor="interval"
                                    className="text-slate-300"
                                 >
                                    Check Interval
                                 </Label>
                                 <Select
                                    value={formData.interval}
                                    onValueChange={value =>
                                       setFormData({
                                          ...formData,
                                          interval: value,
                                       })
                                    }
                                 >
                                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                                       <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-700 border-slate-600">
                                       <SelectItem value="30">
                                          30 seconds
                                       </SelectItem>
                                       <SelectItem value="60">
                                          1 minute
                                       </SelectItem>
                                       <SelectItem value="300">
                                          5 minutes
                                       </SelectItem>
                                       <SelectItem value="600">
                                          10 minutes
                                       </SelectItem>
                                    </SelectContent>
                                 </Select>
                              </div>

                              <div>
                                 <Label
                                    htmlFor="location"
                                    className="text-slate-300"
                                 >
                                    Monitor From
                                 </Label>
                                 <Select
                                    value={formData.location}
                                    onValueChange={value =>
                                       setFormData({
                                          ...formData,
                                          location: value,
                                       })
                                    }
                                 >
                                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                                       <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-700 border-slate-600">
                                       <SelectItem value="global">
                                          Global
                                       </SelectItem>
                                       <SelectItem value="us-east">
                                          US East
                                       </SelectItem>
                                       <SelectItem value="us-west">
                                          US West
                                       </SelectItem>
                                       <SelectItem value="eu-west">
                                          EU West
                                       </SelectItem>
                                       <SelectItem value="asia">
                                          Asia
                                       </SelectItem>
                                    </SelectContent>
                                 </Select>
                              </div>
                           </div>

                           <div>
                              <Label
                                 htmlFor="description"
                                 className="text-slate-300"
                              >
                                 Description (Optional)
                              </Label>
                              <Textarea
                                 id="description"
                                 value={formData.description}
                                 onChange={e =>
                                    setFormData({
                                       ...formData,
                                       description: e.target.value,
                                    })
                                 }
                                 placeholder="Brief description of what this monitor tracks..."
                                 className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                                 rows={3}
                              />
                           </div>

                           <div className="flex justify-end gap-3 pt-4">
                              <Button
                                 type="button"
                                 variant="ghost"
                                 onClick={() => setIsDialogOpen(false)}
                                 className="text-slate-400 hover:text-white"
                              >
                                 Cancel
                              </Button>
                              <Button
                                 type="submit"
                                 className="bg-emerald-600 hover:bg-emerald-700 text-white"
                              >
                                 Create Monitor
                              </Button>
                           </div>
                        </form>
                     </DialogContent>
                  </Dialog>
               </div>
            </div>

            {/* Filters and Search */}
            <Card className="bg-slate-800/50 border-slate-700 mb-8">
               <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="relative">
                           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                           <Input
                              placeholder="Search monitors..."
                              value={searchTerm}
                              onChange={e => setSearchTerm(e.target.value)}
                              className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-emerald-400"
                           />
                        </div>
                     </div>

                     <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-slate-400" />
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
                           All ({monitorsData.length})
                        </Button>
                        <Button
                           variant={filter === "up" ? "default" : "ghost"}
                           size="sm"
                           onClick={() => setFilter("up")}
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
                           onClick={() => setFilter("down")}
                           className={
                              filter === "down"
                                 ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                 : "text-slate-400 hover:text-white hover:bg-slate-700"
                           }
                        >
                           Offline ({monitorsData.length - upMonitors})
                        </Button>
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* Monitors Table */}
            <Card className="bg-slate-800/50 border-slate-700">
               <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                     <Globe className="h-5 w-5 text-emerald-400" />
                     Monitor Directory ({filteredMonitors.length})
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  <Table>
                     <TableHeader>
                        <TableRow className="border-slate-700">
                           <TableHead className="text-slate-400">
                              Monitor
                           </TableHead>
                           <TableHead className="text-slate-400">
                              Status
                           </TableHead>
                           <TableHead className="text-slate-400">
                              Response Time
                           </TableHead>
                           <TableHead className="text-slate-400">
                              Last Checked
                           </TableHead>
                           <TableHead className="text-slate-400">
                              7d Uptime
                           </TableHead>
                           <TableHead className="text-slate-400">
                              30d Uptime
                           </TableHead>
                           <TableHead className="text-slate-400">
                              Location
                           </TableHead>
                           <TableHead className="text-slate-400">
                              Alerts
                           </TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {filteredMonitors.map(monitor => (
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
                                       Every {monitor.interval}
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
         </div>
      </div>
   );
}
