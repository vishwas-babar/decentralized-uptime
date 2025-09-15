import { Navigation } from "../components/Navigation";
import { EarningsOverview } from "../components/rewards/EarningsOverview";
import { WithdrawalPanel } from "../components/rewards/WithdrawalPanel";
import { RewardsHistoryTable } from "../components/rewards/RewardsHistoryTable";
import { EarningsBreakdown } from "../components/rewards/EarningsBreakdown";
import { ValidatorContribution } from "../components/rewards/ValidatorContribution";
import { motion } from "framer-motion";

export default function RewardsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,197,94,0.1),transparent)] pointer-events-none" />

      <Navigation />

      <div className="relative max-w-7xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Rewards Dashboard
            </h1>
            <p className="text-slate-400">
              Manage your SOL earnings and withdrawals
            </p>
          </div>

          {/* Earnings Overview Cards */}
          <div className="mb-8">
            <EarningsOverview />
          </div>

          {/* Middle Section - Withdrawal Panel and Earnings Breakdown */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <div>
              <WithdrawalPanel />
            </div>
            <div>
              <EarningsBreakdown />
            </div>
          </div>

          {/* Validator Contribution Section */}
          <div className="mb-8">
            <ValidatorContribution />
          </div>

          {/* Rewards History Table */}
          <div>
            <RewardsHistoryTable />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
