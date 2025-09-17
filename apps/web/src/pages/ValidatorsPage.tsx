import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { Shield, Zap, ZapOff, Star, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const validatorsData = [
   {
      id: "val_001",
      name: "Validator Alpha Node",
      address: "7xKs...9mPq",
      status: "online",
      staked: "2,450 SOL",
      performance: 99.8,
      uptime: "99.2%",
      checksCompleted: 15847,
      lastSeen: "2 min ago",
      location: "US East",
   },
   {
      id: "val_002",
      name: "Validator Beta Prime",
      address: "3nRf...8kLm",
      status: "online",
      staked: "1,890 SOL",
      performance: 98.5,
      uptime: "98.7%",
      checksCompleted: 12324,
      lastSeen: "1 min ago",
      location: "EU West",
   },
   {
      id: "val_003",
      name: "Validator Gamma Hub",
      address: "9xTk...4jPs",
      status: "offline",
      staked: "3,100 SOL",
      performance: 95.2,
      uptime: "96.1%",
      checksCompleted: 8923,
      lastSeen: "45 min ago",
      location: "Asia",
   },
   {
      id: "val_004",
      name: "Validator Delta Core",
      address: "5mWx...7nQr",
      status: "online",
      staked: "4,250 SOL",
      performance: 99.9,
      uptime: "99.8%",
      checksCompleted: 18102,
      lastSeen: "30 sec ago",
      location: "US West",
   },
   {
      id: "val_005",
      name: "Validator Echo Network",
      address: "2pYh...6vBn",
      status: "online",
      staked: "1,750 SOL",
      performance: 97.3,
      uptime: "97.9%",
      checksCompleted: 9456,
      lastSeen: "5 min ago",
      location: "EU Central",
   },
   {
      id: "val_006",
      name: "Validator Foxtrot Labs",
      address: "8kJm...3xWl",
      status: "online",
      staked: "2,890 SOL",
      performance: 99.1,
      uptime: "99.0%",
      checksCompleted: 14567,
      lastSeen: "1 min ago",
      location: "Canada",
   },
   {
      id: "val_007",
      name: "Validator Golf Systems",
      address: "4rTn...9zXc",
      status: "offline",
      staked: "1,320 SOL",
      performance: 92.1,
      uptime: "94.3%",
      checksCompleted: 6789,
      lastSeen: "2 hours ago",
      location: "Australia",
   },
   {
      id: "val_008",
      name: "Validator Hotel Chain",
      address: "6vLp...5mKj",
      status: "online",
      staked: "5,670 SOL",
      performance: 99.7,
      uptime: "99.5%",
      checksCompleted: 21345,
      lastSeen: "45 sec ago",
      location: "Singapore",
   },
];

type FilterType = "all" | "online" | "offline";

export default function ValidatorsPage() {
   const [filter, setFilter] = useState<FilterType>("all");
   const [searchTerm, setSearchTerm] = useState("");

   const filteredValidators = validatorsData.filter(validator => {
      const matchesFilter = filter === "all" || validator.status === filter;
      const matchesSearch =
         validator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         validator.address.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
   });

   const getStatusIcon = (status: string) => {
      if (status === "online") {
         return <Zap className="h-4 w-4 text-emerald-400" />;
      }
      return <ZapOff className="h-4 w-4 text-red-400" />;
   };

   const getStatusBadge = (status: string) => {
      if (status === "online") {
         return (
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
               Online
            </Badge>
         );
      }
      return (
         <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            Offline
         </Badge>
      );
   };

   const getPerformanceColor = (score: number) => {
      if (score >= 99) return "text-emerald-400";
      if (score >= 97) return "text-yellow-400";
      if (score >= 95) return "text-orange-400";
      return "text-red-400";
   };

   const onlineValidators = validatorsData.filter(
      v => v.status === "online"
   ).length;
   const totalStaked = validatorsData.reduce(
      (sum, v) => sum + parseFloat(v.staked.replace(/[^0-9.]/g, "")),
      0
   );

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
                     <Shield className="h-8 w-8 text-emerald-400" />
                     Validator Network
                  </h1>
                  <p className="text-slate-400 mt-2">
                     Decentralized network of uptime validators
                  </p>
               </div>

               <div className="flex items-center gap-4">
                  <div className="bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
                     <p className="text-sm text-slate-400">Active Validators</p>
                     <p className="text-xl font-bold text-emerald-400">
                        {onlineValidators}/{validatorsData.length}
                     </p>
                  </div>
                  <div className="bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
                     <p className="text-sm text-slate-400">Total Staked</p>
                     <p className="text-xl font-bold text-white">
                        {totalStaked.toLocaleString()} SOL
                     </p>
                  </div>
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
                              placeholder="Search validators..."
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
                           All ({validatorsData.length})
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
                           Online ({onlineValidators})
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
                           Offline ({validatorsData.length - onlineValidators})
                        </Button>
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* Validators Table */}
            <Card className="bg-slate-800/50 border-slate-700">
               <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                     <Shield className="h-5 w-5 text-emerald-400" />
                     Validator Directory ({filteredValidators.length})
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  <Table>
                     <TableHeader>
                        <TableRow className="border-slate-700">
                           <TableHead className="text-slate-400">
                              Validator
                           </TableHead>
                           <TableHead className="text-slate-400">
                              Status
                           </TableHead>
                           <TableHead className="text-slate-400">
                              Staked Tokens
                           </TableHead>
                           <TableHead className="text-slate-400">
                              Performance
                           </TableHead>
                           <TableHead className="text-slate-400">
                              Uptime
                           </TableHead>
                           <TableHead className="text-slate-400">
                              Checks
                           </TableHead>
                           <TableHead className="text-slate-400">
                              Location
                           </TableHead>
                           <TableHead className="text-slate-400">
                              Last Seen
                           </TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {filteredValidators.map(validator => (
                           <TableRow
                              key={validator.id}
                              className="border-slate-700 hover:bg-slate-700/30"
                           >
                              <TableCell>
                                 <div>
                                    <p className="text-white font-medium">
                                       {validator.name}
                                    </p>
                                    <p className="text-slate-400 text-sm font-mono">
                                       {validator.address}
                                    </p>
                                 </div>
                              </TableCell>
                              <TableCell>
                                 <div className="flex items-center gap-2">
                                    {getStatusIcon(validator.status)}
                                    {getStatusBadge(validator.status)}
                                 </div>
                              </TableCell>
                              <TableCell className="text-slate-300 font-medium">
                                 {validator.staked}
                              </TableCell>
                              <TableCell>
                                 <div className="flex items-center gap-2">
                                    <Star
                                       className={`h-3 w-3 ${getPerformanceColor(validator.performance)}`}
                                    />
                                    <span
                                       className={getPerformanceColor(
                                          validator.performance
                                       )}
                                    >
                                       {validator.performance}%
                                    </span>
                                 </div>
                              </TableCell>
                              <TableCell className="text-slate-300">
                                 {validator.uptime}
                              </TableCell>
                              <TableCell className="text-slate-300">
                                 {validator.checksCompleted.toLocaleString()}
                              </TableCell>
                              <TableCell className="text-slate-400">
                                 {validator.location}
                              </TableCell>
                              <TableCell className="text-slate-400 text-sm">
                                 {validator.lastSeen}
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
