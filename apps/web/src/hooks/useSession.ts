import { API_ROUTES } from "@/lib/api-routes";
import ax from "@/lib/axios";
import type { UserSession } from "@repo/schema/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useSession = () => {
   const [status, setStatus] = useState<
      "loading" | "authenticated" | "unauthenticated"
   >("loading");
   const [session, setSession] = useState<UserSession | null>(null);

   const { data, error, isLoading } = useQuery({
      queryKey: ["session"],
      queryFn: async () => {
         const response = await ax.get(API_ROUTES.SESSION);
         if (response.status !== 200) {
            throw new Error("Failed to fetch session");
         }
         return response.data;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
   });

   useEffect(() => {
      if (isLoading) {
         setStatus("loading");
      } else if (error) {
         setStatus("unauthenticated");
         setSession(null);
      } else if (data) {
         setStatus("authenticated");
         setSession(data.data);
      }
   }, [data, error, isLoading]);

   return { status, session };
};

export default useSession;
