import { Website, WebsiteTick } from "@repo/db";

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
