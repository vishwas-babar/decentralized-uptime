import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, Coins, Zap } from "lucide-react";

const features = [
   {
      icon: CheckCircle,
      title: "Decentralized",
      description:
         "No single point of failure. Distributed validators ensure maximum reliability and uptime monitoring.",
      color: "emerald",
   },
   {
      icon: Shield,
      title: "Transparent",
      description:
         "All uptime proofs are anchored on the Solana blockchain, providing complete transparency and auditability.",
      color: "blue",
   },
   {
      icon: Coins,
      title: "Incentivized",
      description:
         "Validators earn SOL tokens for performing accurate uptime checks, ensuring quality and reliability.",
      color: "yellow",
   },
   {
      icon: Zap,
      title: "Fast & Scalable",
      description:
         "Powered by Solana's high-performance blockchain for lightning-fast checks and instant settlements.",
      color: "purple",
   },
];

const getColorClasses = (color: string) => {
   const colors = {
      emerald: {
         icon: "text-emerald-400",
         bg: "bg-emerald-500/10",
         border: "border-emerald-500/20",
         glow: "group-hover:shadow-emerald-500/20",
      },
      blue: {
         icon: "text-blue-400",
         bg: "bg-blue-500/10",
         border: "border-blue-500/20",
         glow: "group-hover:shadow-blue-500/20",
      },
      yellow: {
         icon: "text-yellow-400",
         bg: "bg-yellow-500/10",
         border: "border-yellow-500/20",
         glow: "group-hover:shadow-yellow-500/20",
      },
      purple: {
         icon: "text-purple-400",
         bg: "bg-purple-500/10",
         border: "border-purple-500/20",
         glow: "group-hover:shadow-purple-500/20",
      },
   };
   return colors[color as keyof typeof colors];
};

export function FeaturesSection() {
   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            staggerChildren: 0.2,
         },
      },
   };

   const itemVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: {
         opacity: 1,
         y: 0,
         transition: {
            duration: 0.6,
         },
      },
   };

   return (
      <section className="py-24 px-6">
         <div className="max-w-7xl mx-auto">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="text-center mb-16"
            >
               <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Why Choose{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                     Decentralized
                  </span>{" "}
                  Monitoring?
               </h2>
               <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                  Traditional uptime monitoring relies on centralized
                  infrastructure. We're building the future with blockchain
                  technology.
               </p>
            </motion.div>

            <motion.div
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
               {features.map((feature, index) => {
                  const colorClasses = getColorClasses(feature.color);
                  return (
                     <motion.div key={index} variants={itemVariants}>
                        <Card
                           className={`bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 group h-full ${colorClasses.glow} hover:shadow-lg`}
                        >
                           <CardContent className="p-8 text-center">
                              <motion.div
                                 whileHover={{ scale: 1.1 }}
                                 transition={{ duration: 0.2 }}
                                 className={`w-16 h-16 mx-auto mb-6 rounded-2xl ${colorClasses.bg} ${colorClasses.border} border flex items-center justify-center`}
                              >
                                 <feature.icon
                                    className={`h-8 w-8 ${colorClasses.icon}`}
                                 />
                              </motion.div>

                              <h3 className="text-xl font-bold text-white mb-4">
                                 {feature.title}
                              </h3>

                              <p className="text-slate-400 leading-relaxed">
                                 {feature.description}
                              </p>
                           </CardContent>
                        </Card>
                     </motion.div>
                  );
               })}
            </motion.div>

            {/* Additional Stats */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="mt-24 text-center"
            >
               <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-white mb-8">
                     Trusted by Developers Worldwide
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                     <div>
                        <div className="text-3xl font-bold text-emerald-400 mb-2">
                           24/7
                        </div>
                        <div className="text-slate-400 text-sm">Monitoring</div>
                     </div>
                     <div>
                        <div className="text-3xl font-bold text-emerald-400 mb-2">
                           &lt;100ms
                        </div>
                        <div className="text-slate-400 text-sm">
                           Response Time
                        </div>
                     </div>
                     <div>
                        <div className="text-3xl font-bold text-emerald-400 mb-2">
                           Global
                        </div>
                        <div className="text-slate-400 text-sm">Coverage</div>
                     </div>
                     <div>
                        <div className="text-3xl font-bold text-emerald-400 mb-2">
                           99.99%
                        </div>
                        <div className="text-slate-400 text-sm">
                           Reliability
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>
   );
}
