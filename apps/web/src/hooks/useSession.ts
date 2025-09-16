import { API_ROUTES } from "@/lib/api-routes";
import type { UserSession } from "@repo/schema/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

const useSession = (): UseQueryResult<UserSession> => {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const response = await axios.get(API_ROUTES.SESSION);
      if (response.status !== 200) {
        throw new Error("Failed to fetch session");
      }
      return response.data;
    },
  });
};

export default useSession;
