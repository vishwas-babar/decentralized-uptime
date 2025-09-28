import { API_ROUTES } from "@/lib/api-routes";
import ax from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetUserWebsites = () => {
   return useQuery({
      queryKey: ["get-user-websites"],
      queryFn: async () => {
         const res = await ax.get(API_ROUTES.GET_USER_WEBSITES, {});
         return res.data.data;
      },
   });
};
