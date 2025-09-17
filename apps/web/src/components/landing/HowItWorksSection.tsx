import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Monitor, Users, Coins, ArrowRight } from "lucide-react";

const steps = [
   {
      icon: Monitor,
      title: "Create Monitors",
      description:
         "Users create uptime monitors for their websites and services through our intuitive dashboard.",
      details: [
         "Add website URLs",
         "Set check intervals",
         "Configure alerts",
         "Define monitoring regions",
      ],
   },
   {
      icon: Users,
      title: "Validators Check Uptime",
      description:
         "Decentralized validators perform uptime checks from multiple locations around the globe.",
      details: [
         "Global validator network",
         "Consensus-based verification",
         "Real-time monitoring",
         "Proof generation",
      ],
   },
   {
      icon: Coins,
      title: "Rewards Distributed",
      description:
         "Validators earn SOL tokens for accurate uptime checks, while users get reliable monitoring data.",
      details: [
         "Automatic SOL distribution",
         "Performance-based rewards",
         "Transparent payouts",
         "Stake-weighted incentives",
      ],
   },
];

export function HowItWorksSection() {
   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            staggerChildren: 0.3,
         },
      },
   };

   const itemVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: {
         opacity: 1,
         y: 0,
         transition: {
            duration: 0.8,
         },
      },
   };

   return (
      <section id="how-it-works" className="py-24 px-6 bg-slate-900/50">
         <div className="max-w-7xl mx-auto">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="text-center mb-16"
            >
               <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  How It{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                     Works
                  </span>
               </h2>
               <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                  Our decentralized architecture ensures reliable uptime
                  monitoring through a simple three-step process.
               </p>
            </motion.div>

            <motion.div
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="relative"
            >
               {/* Connection lines */}
               <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent transform -translate-y-1/2 z-0" />

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                  {steps.map((step, index) => (
                     <motion.div
                        key={index}
                        variants={itemVariants}
                        className="relative"
                     >
                        <Card className="bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition-all duration-500 group h-full hover:shadow-lg hover:shadow-emerald-500/10">
                           <CardContent className="p-8 text-center">
                              {/* Step number */}
                              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm z-20">
                                 {index + 1}
                              </div>

                              {/* Icon */}
                              <motion.div
                                 whileHover={{ scale: 1.1, rotate: 5 }}
                                 transition={{ duration: 0.3 }}
                                 className="w-16 h-16 mx-auto mb-6 mt-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"
                              >
                                 <step.icon className="h-8 w-8 text-emerald-400" />
                              </motion.div>

                              <h3 className="text-2xl font-bold text-white mb-4">
                                 {step.title}
                              </h3>

                              <p className="text-slate-400 mb-6 leading-relaxed">
                                 {step.description}
                              </p>

                              {/* Details list */}
                              <div className="space-y-2">
                                 {step.details.map((detail, detailIndex) => (
                                    <motion.div
                                       key={detailIndex}
                                       initial={{ opacity: 0, x: -10 }}
                                       whileInView={{ opacity: 1, x: 0 }}
                                       viewport={{ once: true }}
                                       transition={{
                                          duration: 0.5,
                                          delay: detailIndex * 0.1,
                                       }}
                                       className="flex items-center text-sm text-slate-300"
                                    >
                                       <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3 flex-shrink-0" />
                                       {detail}
                                    </motion.div>
                                 ))}
                              </div>
                           </CardContent>
                        </Card>

                        {/* Arrow for desktop */}
                        {index < steps.length - 1 && (
                           <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: 0.5 }}
                              className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-20"
                           >
                              <div className="w-8 h-8 bg-slate-800 border border-slate-600 rounded-full flex items-center justify-center">
                                 <ArrowRight className="h-4 w-4 text-emerald-400" />
                              </div>
                           </motion.div>
                        )}
                     </motion.div>
                  ))}
               </div>
            </motion.div>

            {/* Architecture diagram placeholder */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="mt-20"
            >
               <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">
                     Distributed Architecture
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                     <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center">
                           <Monitor className="h-10 w-10 text-blue-400" />
                        </div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                           Monitoring Requests
                        </h4>
                        <p className="text-sm text-slate-400">
                           Users submit monitoring jobs
                        </p>
                     </div>

                     <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center">
                           <Users className="h-10 w-10 text-emerald-400" />
                        </div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                           Validator Network
                        </h4>
                        <p className="text-sm text-slate-400">
                           Distributed validation consensus
                        </p>
                     </div>

                     <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center">
                           <Coins className="h-10 w-10 text-purple-400" />
                        </div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                           Solana Blockchain
                        </h4>
                        <p className="text-sm text-slate-400">
                           Transparent reward distribution
                        </p>
                     </div>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>
   );
}
