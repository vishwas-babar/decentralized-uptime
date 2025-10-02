import { Website, WebsiteTick } from "@repo/db";
import prisma from "@repo/db";

export interface WebsiteWithTicks extends Website {
   ticks: (WebsiteTick & {
      validator: {
         id: string;
         location: string;
         ip: string;
      };
   })[];
}

export interface WebsiteStats {
   totalTicks: number;
   upTicks: number;
   downTicks: number;
   uptimePercentage: number;
   currentStatus: "UP" | "DOWN" | "UNKNOWN";
   averageLatency: number;
   lastChecked: Date | null;
}

export interface WebsiteWithStats extends Website {
   ticks: (WebsiteTick & {
      validator: {
         id: string;
         location: string;
         ip: string;
      };
   })[];
   stats: WebsiteStats;
}

/**
 * Calculates website statistics based on ticks data
 * @param website - Website object with ticks
 * @returns Website object with calculated stats
 */
export function calculateWebsiteStats(
   website: WebsiteWithTicks
): WebsiteWithStats {
   const totalTicks = website.ticks.length;
   const upTicks = website.ticks.filter(tick => tick.status === "UP").length;
   const uptimePercentage = totalTicks > 0 ? (upTicks / totalTicks) * 100 : 0;

   // Get the latest status (ticks are ordered by createdAt DESC, so first item is latest)
   const latestTick = website.ticks[0];
   const currentStatus = latestTick ? latestTick.status : "UNKNOWN";

   // Calculate average latency for UP ticks
   const upTicksOnly = website.ticks.filter(tick => tick.status === "UP");
   const averageLatency =
      upTicksOnly.length > 0
         ? upTicksOnly.reduce((sum, tick) => sum + tick.latency, 0) /
           upTicksOnly.length
         : 0;

   const stats: WebsiteStats = {
      totalTicks,
      upTicks,
      downTicks: totalTicks - upTicks,
      uptimePercentage: Math.round(uptimePercentage * 10) / 10, // Round to 1 decimal
      currentStatus,
      averageLatency: Math.round(averageLatency),
      lastChecked: latestTick?.createdAt || null,
   };

   return {
      ...website,
      stats,
   };
}

/**
 * Calculates statistics for multiple websites
 * @param websites - Array of websites with ticks
 * @returns Array of websites with calculated stats
 */
export function calculateWebsitesStats(
   websites: WebsiteWithTicks[]
): WebsiteWithStats[] {
   return websites.map(calculateWebsiteStats);
}

export interface UserDashboardStats {
   totalMonitors: number;
   monitorsThisWeek: number;
   validatorsOnline: number;
   validatorUptime: number;
   aggregateUptime: number;
   uptimeChange: number;
}

/**
 * Calculates comprehensive dashboard statistics for a user
 * @param userId - The user ID to calculate stats for
 * @returns Promise<UserDashboardStats>
 */
export async function calculateUserDashboardStats(
   userId: string
): Promise<UserDashboardStats> {
   // Get total monitors for the user
   const totalMonitors = await prisma.website.count({
      where: { userId },
   });

   // Get monitors created this week
   const oneWeekAgo = new Date();
   oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

   const monitorsThisWeek = await prisma.website.count({
      where: {
         userId,
         createdAt: {
            gte: oneWeekAgo,
         },
      },
   });

   // Get total validators online
   const validatorsOnline = await prisma.validator.count({
      where: {
         isConnected: true,
      },
   });

   // Calculate time periods
   const thirtyDaysAgo = new Date();
   thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

   const sixtyDaysAgo = new Date();
   sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

   // Get user's website IDs
   const userWebsites = await prisma.website.findMany({
      where: { userId },
      select: { id: true },
   });

   const websiteIds = userWebsites.map(w => w.id);

   // Calculate uptime stats
   const [aggregateUptime, previousMonthUptime, validatorUptime] =
      await Promise.all([
         calculateUptimeForPeriod(websiteIds, thirtyDaysAgo),
         calculateUptimeForPeriod(websiteIds, sixtyDaysAgo, thirtyDaysAgo),
         calculateSystemValidatorUptime(thirtyDaysAgo),
      ]);

   const uptimeChange = aggregateUptime - previousMonthUptime;

   return {
      totalMonitors,
      monitorsThisWeek,
      validatorsOnline,
      validatorUptime: Number(validatorUptime.toFixed(1)),
      aggregateUptime: Number(aggregateUptime.toFixed(1)),
      uptimeChange: Number(uptimeChange.toFixed(1)),
   };
}

/**
 * Calculates uptime percentage for given website IDs within a time period
 * @param websiteIds - Array of website IDs
 * @param fromDate - Start date for calculation
 * @param toDate - End date for calculation (optional, defaults to now)
 * @returns Promise<number> - Uptime percentage
 */
async function calculateUptimeForPeriod(
   websiteIds: string[],
   fromDate: Date,
   toDate?: Date
): Promise<number> {
   if (websiteIds.length === 0) return 0;

   const whereClause: any = {
      websiteId: { in: websiteIds },
      createdAt: { gte: fromDate },
   };

   if (toDate) {
      whereClause.createdAt.lt = toDate;
   }

   const [totalTicks, upTicks] = await Promise.all([
      prisma.websiteTick.count({ where: whereClause }),
      prisma.websiteTick.count({
         where: { ...whereClause, status: "UP" },
      }),
   ]);

   return totalTicks > 0 ? (upTicks / totalTicks) * 100 : 0;
}

/**
 * Calculates overall system validator uptime
 * @param fromDate - Start date for calculation
 * @returns Promise<number> - System uptime percentage
 */
async function calculateSystemValidatorUptime(fromDate: Date): Promise<number> {
   const [totalTicks, upTicks] = await Promise.all([
      prisma.websiteTick.count({
         where: { createdAt: { gte: fromDate } },
      }),
      prisma.websiteTick.count({
         where: {
            createdAt: { gte: fromDate },
            status: "UP",
         },
      }),
   ]);

   return totalTicks > 0 ? (upTicks / totalTicks) * 100 : 0;
}
