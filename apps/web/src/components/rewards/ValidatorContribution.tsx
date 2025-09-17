import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, Target, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const validatorStats = [
   {
      title: "Checks Performed",
      value: "2,847",
      description: "Total validations",
      icon: CheckCircle,
      color: "text-emerald-400",
      trend: "+127 today",
   },
   {
      title: "Accuracy Score",
      value: "98.7%",
      description: "Correct results",
      icon: Target,
      color: "text-blue-400",
      trend: "Above average",
   },
   {
      title: "Tokens Earned",
      value: "9.8",
      suffix: "SOL",
      description: "From validation",
      icon: TrendingUp,
      color: "text-purple-400",
      trend: "+0.3 SOL today",
   },
];

const recentValidations = [
   {
      id: "1",
      website: "example.com",
      status: "up",
      timestamp: "2 min ago",
      reward: 0.005,
   },
   {
      id: "2",
      website: "testsite.org",
      status: "up",
      timestamp: "5 min ago",
      reward: 0.005,
   },
   {
      id: "3",
      website: "demo.app",
      status: "down",
      timestamp: "8 min ago",
      reward: 0.003,
   },
   {
      id: "4",
      website: "service.io",
      status: "up",
      timestamp: "12 min ago",
      reward: 0.005,
   },
];

export function ValidatorContribution() {
   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5, delay: 0.3 }}
      >
         <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
            <CardHeader>
               <CardTitle className="flex items-center gap-2 text-white">
                  <Shield className="h-5 w-5 text-emerald-400" />
                  Validator Contribution
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               {/* Validator Stats */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {validatorStats.map((stat, index) => (
                     <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-4 bg-slate-900/50 rounded-lg border border-slate-600"
                     >
                        <div className="flex items-center justify-between mb-2">
                           <stat.icon className={`h-5 w-5 ${stat.color}`} />
                           <Badge
                              variant="secondary"
                              className="text-xs bg-slate-700 text-slate-300"
                           >
                              {stat.trend}
                           </Badge>
                        </div>
                        <div className="space-y-1">
                           <div className="flex items-baseline gap-1">
                              <span className="text-xl font-bold text-white">
                                 {stat.value}
                              </span>
                              {stat.suffix && (
                                 <span className="text-sm font-semibold text-slate-400">
                                    ◎ {stat.suffix}
                                 </span>
                              )}
                           </div>
                           <p className="text-xs text-slate-400">
                              {stat.description}
                           </p>
                        </div>
                     </motion.div>
                  ))}
               </div>

               {/* Recent Validations */}
               <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                     Recent Validations
                  </h3>
                  <div className="space-y-3">
                     {recentValidations.map((validation, index) => (
                        <motion.div
                           key={validation.id}
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ duration: 0.3, delay: index * 0.1 }}
                           className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg border border-slate-600"
                        >
                           <div className="flex items-center gap-3">
                              <div
                                 className={`w-2 h-2 rounded-full ${
                                    validation.status === "up"
                                       ? "bg-emerald-400"
                                       : "bg-red-400"
                                 }`}
                              />
                              <div>
                                 <span className="text-white font-medium">
                                    {validation.website}
                                 </span>
                                 <p className="text-xs text-slate-400">
                                    {validation.timestamp}
                                 </p>
                              </div>
                           </div>
                           <div className="flex items-center gap-3">
                              <Badge
                                 variant={
                                    validation.status === "up"
                                       ? "default"
                                       : "destructive"
                                 }
                                 className={
                                    validation.status === "up"
                                       ? "bg-emerald-600 text-white"
                                       : "bg-red-600 text-white"
                                 }
                              >
                                 {validation.status.toUpperCase()}
                              </Badge>
                              <div className="text-right">
                                 <div className="flex items-baseline gap-1">
                                    <span className="text-sm font-semibold text-white">
                                       +{validation.reward}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                       ◎
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>

               {/* Performance Metrics */}
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 rounded-lg border border-emerald-600/30">
                     <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-400">
                           A+
                        </div>
                        <div className="text-sm text-slate-400 mt-1">
                           Performance Grade
                        </div>
                     </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-lg border border-blue-600/30">
                     <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">
                           #12
                        </div>
                        <div className="text-sm text-slate-400 mt-1">
                           Network Ranking
                        </div>
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>
      </motion.div>
   );
}
