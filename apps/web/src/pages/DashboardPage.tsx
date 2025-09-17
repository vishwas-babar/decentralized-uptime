import { Navigation } from "../components/Navigation";
import { OverviewCards } from "../components/dashboard/OverviewCards";
import { ActiveMonitorsTable } from "../components/dashboard/ActiveMonitorsTable";
import { ValidatorStatusSection } from "../components/dashboard/ValidatorStatusSection";
import { RewardsTokenPanel } from "../components/dashboard/RewardsTokenPanel";
import { ActivityLogsSection } from "../components/dashboard/ActivityLogsSection";
import { ChartsSection } from "../components/dashboard/ChartsSection";

export default function DashboardPage() {
   return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
         {/* Background decoration */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,197,94,0.1),transparent)] pointer-events-none" />

         <Navigation />

         <div className="relative max-w-7xl mx-auto p-6">
            {/* Overview Cards */}
            <div className="mb-8">
               <OverviewCards />
            </div>

            {/* Middle Section - Monitors and Validators */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
               <div>
                  <ActiveMonitorsTable />
               </div>
               <div>
                  <ValidatorStatusSection />
               </div>
            </div>

            {/* Charts Section */}
            <div className="mb-8">
               <ChartsSection />
            </div>

            {/* Bottom Section - Rewards and Activity */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
               <div className="xl:col-span-2">
                  <RewardsTokenPanel />
               </div>
               <div>
                  <ActivityLogsSection />
               </div>
            </div>
         </div>
      </div>
   );
}
