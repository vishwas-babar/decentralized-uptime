import ax from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface UserDashboardStats {
   totalMonitors: number;
   monitorsThisWeek: number;
   validatorsOnline: number;
   validatorUptime: number;
   aggregateUptime: number;
   uptimeChange: number;
}

export interface UserStatsResponse {
   success: boolean;
   data: UserDashboardStats;
   message?: string;
}

export const useGetUserStatsForDashboard = () => {
   return useQuery({
      queryKey: ["get-user-stats-for-dashboard"],
      queryFn: async (): Promise<UserStatsResponse> => {
         const res = await ax.get<UserStatsResponse>("/auth/stats");
         return res.data;
      },
      staleTime: 5 * 60 * 1000,
      retry: 1,
   });
};
