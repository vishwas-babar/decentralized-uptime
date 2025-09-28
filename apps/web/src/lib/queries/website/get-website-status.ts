import { API_ROUTES } from "@/lib/api-routes";
import ax from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface WebsiteTick {
   id: string;
   websiteId: string;
   validatorId: string;
   status: "UP" | "DOWN";
   latency: number;
   createdAt: string;
   validator: {
      id: string;
      location: string;
      ip: string;
   };
}

export interface WebsiteWithStatus {
   id: string;
   name: string;
   url: string;
   checkInterval: number;
   contactEmail: string;
   userId: string;
   disabled: boolean;
   createdAt: string;
   updatedAt: string;
   ticks: WebsiteTick[];
   stats: {
      totalTicks: number;
      upTicks: number;
      downTicks: number;
      uptimePercentage: number;
      currentStatus: "UP" | "DOWN" | "UNKNOWN";
      averageLatency: number;
      lastChecked: string | null;
   };
}

export interface WebsiteStatusResponse {
   success: boolean;
   message: string;
   data: WebsiteWithStatus[];
   meta: {
      timeRange: string;
      timestamp: string;
      totalWebsites: number;
   };
}

export const useGetWebsiteStatus = () => {
   return useQuery({
      queryKey: ["get-website-status"],
      queryFn: async (): Promise<WebsiteWithStatus[]> => {
         const res = await ax.get<WebsiteStatusResponse>(
            API_ROUTES.GET_WEBSITE_STATUS
         );
         return res.data.data;
      },
      refetchInterval: 60000, // Refetch every minute to get latest status
   });
};
