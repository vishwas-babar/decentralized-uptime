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
import { Coins, Wallet, ArrowUpRight, ArrowDownLeft } from "lucide-react";

const transactionsData = [
   {
      id: "tx_001",
      type: "earned",
      amount: "12.5 SOL",
      description: "Uptime rewards",
      timestamp: "2 hours ago",
      status: "completed",
   },
   {
      id: "tx_002",
      type: "withdraw",
      amount: "50.0 SOL",
      description: "Reward withdrawal",
      timestamp: "1 day ago",
      status: "completed",
   },
   {
      id: "tx_003",
      type: "earned",
      amount: "8.3 SOL",
      description: "Validator bonus",
      timestamp: "2 days ago",
      status: "completed",
   },
   {
      id: "tx_004",
      type: "earned",
      amount: "15.2 SOL",
      description: "Daily rewards",
      timestamp: "3 days ago",
      status: "completed",
   },
];

export function RewardsTokenPanel() {
   const getTransactionIcon = (type: string) => {
      if (type === "earned") {
         return <ArrowDownLeft className="h-4 w-4 text-emerald-400" />;
      }
      return <ArrowUpRight className="h-4 w-4 text-blue-400" />;
   };

   const getTransactionColor = (type: string) => {
      if (type === "earned") {
         return "text-emerald-400";
      }
      return "text-blue-400";
   };

   return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Rewards Summary */}
         <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
               <CardTitle className="text-white flex items-center gap-2">
                  <Coins className="h-5 w-5 text-emerald-400" />
                  Token Rewards
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/30 p-4 rounded-lg">
                     <p className="text-sm text-slate-400">Pending Rewards</p>
                     <p className="text-2xl font-bold text-emerald-400">
                        247.8 SOL
                     </p>
                  </div>
                  <div className="bg-slate-700/30 p-4 rounded-lg">
                     <p className="text-sm text-slate-400">Total Earned</p>
                     <p className="text-2xl font-bold text-white">12,847 SOL</p>
                  </div>
               </div>

               <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  Connect Wallet & Withdraw
               </Button>

               <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Wallet Connected:</span>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                     Not Connected
                  </Badge>
               </div>
            </CardContent>
         </Card>

         {/* Recent Transactions */}
         <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
               <CardTitle className="text-white">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
               <Table>
                  <TableHeader>
                     <TableRow className="border-slate-700">
                        <TableHead className="text-slate-400">Type</TableHead>
                        <TableHead className="text-slate-400">Amount</TableHead>
                        <TableHead className="text-slate-400">Time</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {transactionsData.map(tx => (
                        <TableRow
                           key={tx.id}
                           className="border-slate-700 hover:bg-slate-700/30"
                        >
                           <TableCell>
                              <div className="flex items-center gap-2">
                                 {getTransactionIcon(tx.type)}
                                 <div>
                                    <p className="text-white text-sm">
                                       {tx.description}
                                    </p>
                                    <p className="text-slate-400 text-xs capitalize">
                                       {tx.type}
                                    </p>
                                 </div>
                              </div>
                           </TableCell>
                           <TableCell
                              className={`font-medium ${getTransactionColor(tx.type)}`}
                           >
                              {tx.type === "earned" ? "+" : "-"}
                              {tx.amount}
                           </TableCell>
                           <TableCell className="text-slate-400 text-sm">
                              {tx.timestamp}
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </CardContent>
         </Card>
      </div>
   );
}
