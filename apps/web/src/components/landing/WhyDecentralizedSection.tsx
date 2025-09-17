import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Globe, Zap, TrendingUp, Users, Lock } from "lucide-react";

const benefits = [
   {
      icon: Shield,
      title: "No Single Point of Failure",
      description:
         "Traditional monitoring services can go down, leaving you blind. Our decentralized network ensures continuous monitoring even if individual nodes fail.",
      color: "emerald" as const,
   },
   {
      icon: Globe,
      title: "Global Coverage",
      description:
         "Validators distributed worldwide provide comprehensive uptime checks from multiple geographic locations and network providers.",
      color: "blue" as const,
   },
   {
      icon: Zap,
      title: "Censorship Resistant",
      description:
         "No central authority can shut down or manipulate your monitoring data. The network operates independently and transparently.",
      color: "purple" as const,
   },
   {
      icon: TrendingUp,
      title: "Economic Incentives",
      description:
         "Validators are economically incentivized to provide accurate, timely monitoring results through our SOL token reward system.",
      color: "orange" as const,
   },
   {
      icon: Users,
      title: "Community Driven",
      description:
         "Built and maintained by a global community of developers and validators who believe in decentralized infrastructure.",
      color: "pink" as const,
   },
   {
      icon: Lock,
      title: "Trustless Verification",
      description:
         "Smart contracts automatically verify monitoring results and distribute rewards without requiring trust in centralized parties.",
      color: "cyan" as const,
   },
];

const colorClasses = {
   emerald: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      text: "text-emerald-400",
      hover: "hover:border-emerald-500/50",
      shadow: "hover:shadow-emerald-500/10",
   },
   blue: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      text: "text-blue-400",
      hover: "hover:border-blue-500/50",
      shadow: "hover:shadow-blue-500/10",
   },
   purple: {
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      text: "text-purple-400",
      hover: "hover:border-purple-500/50",
      shadow: "hover:shadow-purple-500/10",
   },
   orange: {
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
      text: "text-orange-400",
      hover: "hover:border-orange-500/50",
      shadow: "hover:shadow-orange-500/10",
   },
   pink: {
      bg: "bg-pink-500/10",
      border: "border-pink-500/20",
      text: "text-pink-400",
      hover: "hover:border-pink-500/50",
      shadow: "hover:shadow-pink-500/10",
   },
   cyan: {
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
      text: "text-cyan-400",
      hover: "hover:border-cyan-500/50",
      shadow: "hover:shadow-cyan-500/10",
   },
};

export function WhyDecentralizedSection() {
   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            staggerChildren: 0.15,
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
      <section id="why-decentralized" className="py-24 px-6 bg-slate-950">
         <div className="max-w-7xl mx-auto">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="text-center mb-16"
            >
               <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Why{" "}
                  <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                     Decentralized?
                  </span>
               </h2>
               <p className="text-xl text-slate-400 max-w-4xl mx-auto">
                  Traditional monitoring services have fundamental limitations.
                  Our decentralized approach solves these problems by leveraging
                  blockchain technology and economic incentives.
               </p>
            </motion.div>

            {/* Comparison section */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="mb-20"
            >
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                  {/* Traditional Problems */}
                  <Card className="bg-red-900/10 border-red-500/20">
                     <CardContent className="p-8">
                        <div className="flex items-center mb-6">
                           <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center mr-4">
                              <span className="text-2xl">❌</span>
                           </div>
                           <h3 className="text-2xl font-bold text-white">
                              Traditional Monitoring
                           </h3>
                        </div>
                        <div className="space-y-4">
                           <div className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                              <p className="text-slate-300">
                                 Single points of failure can take entire
                                 monitoring offline
                              </p>
                           </div>
                           <div className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                              <p className="text-slate-300">
                                 Limited geographic coverage from few data
                                 centers
                              </p>
                           </div>
                           <div className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                              <p className="text-slate-300">
                                 Centralized control over data and service
                                 availability
                              </p>
                           </div>
                           <div className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                              <p className="text-slate-300">
                                 Opaque operations with limited transparency
                              </p>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Decentralized Solutions */}
                  <Card className="bg-emerald-900/10 border-emerald-500/20">
                     <CardContent className="p-8">
                        <div className="flex items-center mb-6">
                           <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mr-4">
                              <span className="text-2xl">✅</span>
                           </div>
                           <h3 className="text-2xl font-bold text-white">
                              Decent Uptime
                           </h3>
                        </div>
                        <div className="space-y-4">
                           <div className="flex items-start">
                              <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                              <p className="text-slate-300">
                                 Distributed network eliminates single points of
                                 failure
                              </p>
                           </div>
                           <div className="flex items-start">
                              <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                              <p className="text-slate-300">
                                 Global validator network provides worldwide
                                 coverage
                              </p>
                           </div>
                           <div className="flex items-start">
                              <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                              <p className="text-slate-300">
                                 Blockchain ensures transparent and
                                 censorship-resistant operations
                              </p>
                           </div>
                           <div className="flex items-start">
                              <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                              <p className="text-slate-300">
                                 Economic incentives align validator interests
                                 with users
                              </p>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </motion.div>

            {/* Benefits grid */}
            <motion.div
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
            >
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {benefits.map((benefit, index) => {
                     const colors = colorClasses[benefit.color];
                     return (
                        <motion.div key={index} variants={itemVariants}>
                           <Card
                              className={`bg-slate-800/50 border-slate-700 ${colors.hover} transition-all duration-500 h-full ${colors.shadow} hover:shadow-lg`}
                           >
                              <CardContent className="p-6">
                                 <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ duration: 0.3 }}
                                    className={`w-14 h-14 ${colors.bg} ${colors.border} rounded-xl flex items-center justify-center mb-6`}
                                 >
                                    <benefit.icon
                                       className={`h-7 w-7 ${colors.text}`}
                                    />
                                 </motion.div>

                                 <h3 className="text-xl font-bold text-white mb-4">
                                    {benefit.title}
                                 </h3>

                                 <p className="text-slate-400 leading-relaxed">
                                    {benefit.description}
                                 </p>
                              </CardContent>
                           </Card>
                        </motion.div>
                     );
                  })}
               </div>
            </motion.div>

            {/* Call to action */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="text-center mt-16"
            >
               <div className="bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-white mb-4">
                     Ready to Experience Decentralized Monitoring?
                  </h3>
                  <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
                     Join our growing network of validators and users building
                     the future of infrastructure monitoring.
                  </p>
               </div>
            </motion.div>
         </div>
      </section>
   );
}
