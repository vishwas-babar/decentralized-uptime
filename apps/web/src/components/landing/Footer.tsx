import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Github,
  Twitter,
  MessageCircle,
  Mail,
  ExternalLink,
} from "lucide-react";

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Pricing", href: "#" },
    { name: "API Docs", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press Kit", href: "#" },
  ],
  developers: [
    { name: "Documentation", href: "#" },
    { name: "GitHub", href: "#" },
    { name: "Validator Guide", href: "#" },
    { name: "Smart Contracts", href: "#" },
  ],
  community: [
    { name: "Discord", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "Telegram", href: "#" },
    { name: "Forum", href: "#" },
  ],
};

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: MessageCircle, href: "#", label: "Discord" },
  { icon: Mail, href: "#", label: "Email" },
];

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      {/* Newsletter section */}
      <div className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-emerald-900/20 via-blue-900/20 to-purple-900/20 border border-slate-700 rounded-2xl p-8 md:p-12 text-center mb-16"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
              Get the latest updates on network upgrades, new features, and
              validator opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <Button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12"
          >
            {/* Brand section */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DU</span>
                </div>
                <span className="text-xl font-bold text-white">
                  Decent Uptime
                </span>
              </div>
              <p className="text-slate-400 mb-6 max-w-sm">
                Decentralized uptime monitoring powered by Solana blockchain.
                Reliable, transparent, and censorship-resistant monitoring for
                the modern web.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center hover:border-emerald-500/50 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4 text-slate-400 hover:text-emerald-400" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Product links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center"
                    >
                      {link.name}
                      {link.href.startsWith("http") && (
                        <ExternalLink className="h-3 w-3 ml-1" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center"
                    >
                      {link.name}
                      {link.href.startsWith("http") && (
                        <ExternalLink className="h-3 w-3 ml-1" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Developers links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-white font-semibold mb-4">Developers</h4>
              <ul className="space-y-3">
                {footerLinks.developers.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center"
                    >
                      {link.name}
                      {link.href.startsWith("http") && (
                        <ExternalLink className="h-3 w-3 ml-1" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Community links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-white font-semibold mb-4">Community</h4>
              <ul className="space-y-3">
                {footerLinks.community.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center"
                    >
                      {link.name}
                      {link.href.startsWith("http") && (
                        <ExternalLink className="h-3 w-3 ml-1" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <Separator className="bg-slate-800 mb-8" />

          {/* Bottom section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm"
          >
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
              <p>&copy; 2024 Decent Uptime. All rights reserved.</p>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span>Built on</span>
              <div className="flex items-center space-x-1 text-purple-400 font-medium">
                <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span>Solana</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
