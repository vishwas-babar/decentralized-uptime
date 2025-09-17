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
import { Shield, Zap, ZapOff, Star } from "lucide-react";

const validatorsData = [
   {
      id: "val_001",
      name: "Validator Alpha",
      status: "online",
      stake: "1,250 SOL",
      performance: 98.7,
      checksCompleted: 2847,
   },
   {
      id: "val_002",
      name: "Validator Beta",
      status: "online",
      stake: "890 SOL",
      performance: 99.2,
      checksCompleted: 3124,
   },
   {
      id: "val_003",
      name: "Validator Gamma",
      status: "offline",
      stake: "1,100 SOL",
      performance: 95.4,
      checksCompleted: 1923,
   },
   {
      id: "val_004",
      name: "Validator Delta",
      status: "online",
      stake: "2,150 SOL",
      performance: 99.8,
      checksCompleted: 4102,
   },
   {
      id: "val_005",
      name: "Validator Echo",
      status: "online",
      stake: "750 SOL",
      performance: 97.9,
      checksCompleted: 2456,
   },
];

export function ValidatorStatusSection() {
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
      return "text-red-400";
   };

   return (
      <Card className="bg-slate-800/50 border-slate-700">
         <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
               <Shield className="h-5 w-5 text-emerald-400" />
               Validator Network
            </CardTitle>
         </CardHeader>
         <CardContent>
            <Table>
               <TableHeader>
                  <TableRow className="border-slate-700">
                     <TableHead className="text-slate-400">Validator</TableHead>
                     <TableHead className="text-slate-400">Status</TableHead>
                     <TableHead className="text-slate-400">Stake</TableHead>
                     <TableHead className="text-slate-400">
                        Performance
                     </TableHead>
                     <TableHead className="text-slate-400">Checks</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {validatorsData.map(validator => (
                     <TableRow
                        key={validator.id}
                        className="border-slate-700 hover:bg-slate-700/30"
                     >
                        <TableCell className="text-white font-medium">
                           {validator.name}
                        </TableCell>
                        <TableCell>
                           <div className="flex items-center gap-2">
                              {getStatusIcon(validator.status)}
                              {getStatusBadge(validator.status)}
                           </div>
                        </TableCell>
                        <TableCell className="text-slate-300">
                           {validator.stake}
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
                           {validator.checksCompleted.toLocaleString()}
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </CardContent>
      </Card>
   );
}
