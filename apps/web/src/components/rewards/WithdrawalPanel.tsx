import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, ArrowRight, CheckCircle, Clock, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type TransactionStatus = "idle" | "pending" | "success" | "error";

export function WithdrawalPanel() {
   const [transactionStatus, setTransactionStatus] =
      useState<TransactionStatus>("idle");
   const [txHash, setTxHash] = useState<string>("");

   // Mock wallet address (in real app, this would come from wallet connection)
   const walletAddress = "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU";
   const availableBalance: number = 2.8;

   const handleWithdraw = async () => {
      setTransactionStatus("pending");

      // Mock transaction process
      setTimeout(() => {
         const mockTxHash =
            "5J4Kq9ot9nEQWMDWWhpZLkHtfNEtBBe8Y6hV4rTuB8FGp3cD2sX9mK1wQz7RyNvL";
         setTxHash(mockTxHash);
         setTransactionStatus("success");

         // Reset after 5 seconds
         setTimeout(() => {
            setTransactionStatus("idle");
            setTxHash("");
         }, 5000);
      }, 2000);
   };

   const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text);
   };

   return (
      <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
         <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
               <Wallet className="h-5 w-5 text-emerald-400" />
               Withdrawal Panel
            </CardTitle>
         </CardHeader>
         <CardContent className="space-y-6">
            {/* Connected Wallet */}
            <div className="space-y-2">
               <label className="text-sm font-medium text-slate-400">
                  Connected Wallet
               </label>
               <div className="flex items-center gap-2 p-3 bg-slate-900/50 rounded-lg border border-slate-600">
                  <span className="text-sm text-white font-mono">
                     {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
                  </span>
                  <Button
                     variant="ghost"
                     size="sm"
                     className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                     onClick={() => copyToClipboard(walletAddress)}
                  >
                     <Copy className="h-3 w-3" />
                  </Button>
               </div>
            </div>

            {/* Available Balance */}
            <div className="space-y-2">
               <label className="text-sm font-medium text-slate-400">
                  Available Balance
               </label>
               <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">
                     {availableBalance}
                  </span>
                  <span className="text-lg font-semibold text-slate-400">
                     ◎ SOL
                  </span>
               </div>
            </div>

            {/* Withdrawal Button */}
            <motion.div whileTap={{ scale: 0.98 }} className="space-y-4">
               <Button
                  onClick={handleWithdraw}
                  disabled={
                     transactionStatus === "pending" || availableBalance === 0
                  }
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-600 disabled:text-slate-400 transition-all duration-300"
               >
                  {transactionStatus === "pending" ? (
                     <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 animate-spin" />
                        Processing...
                     </div>
                  ) : (
                     <div className="flex items-center gap-2">
                        <span>Withdraw {availableBalance} SOL</span>
                        <ArrowRight className="h-4 w-4" />
                     </div>
                  )}
               </Button>

               <AnimatePresence>
                  {transactionStatus !== "idle" && (
                     <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3"
                     >
                        {/* Transaction Status */}
                        <div className="flex items-center gap-2">
                           <Badge
                              variant={
                                 transactionStatus === "success"
                                    ? "default"
                                    : "secondary"
                              }
                              className={`${
                                 transactionStatus === "success"
                                    ? "bg-emerald-600 text-white"
                                    : transactionStatus === "pending"
                                      ? "bg-yellow-600 text-white"
                                      : "bg-red-600 text-white"
                              }`}
                           >
                              {transactionStatus === "success" && (
                                 <CheckCircle className="h-3 w-3 mr-1" />
                              )}
                              {transactionStatus === "pending" && (
                                 <Clock className="h-3 w-3 mr-1 animate-spin" />
                              )}
                              {transactionStatus === "success"
                                 ? "Success ✅"
                                 : "Pending ⏳"}
                           </Badge>
                        </div>

                        {/* Mock Transaction Result */}
                        {transactionStatus === "success" && (
                           <div className="p-3 bg-emerald-900/20 border border-emerald-600/30 rounded-lg">
                              <p className="text-sm text-emerald-400 mb-2">
                                 {availableBalance} SOL sent to Phantom wallet
                              </p>
                              {txHash && (
                                 <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-400">
                                       Tx Hash:
                                    </span>
                                    <button
                                       onClick={() => copyToClipboard(txHash)}
                                       className="text-xs text-emerald-400 hover:text-emerald-300 font-mono flex items-center gap-1 transition-colors"
                                    >
                                       {txHash.slice(0, 8)}...{txHash.slice(-8)}
                                       <Copy className="h-3 w-3" />
                                    </button>
                                 </div>
                              )}
                           </div>
                        )}
                     </motion.div>
                  )}
               </AnimatePresence>
            </motion.div>
         </CardContent>
      </Card>
   );
}
