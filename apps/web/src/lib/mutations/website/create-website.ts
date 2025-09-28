import { API_ROUTES } from "@/lib/api-routes";
import ax from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import type { CreateUrlSchema } from "@repo/schema/types";

export const useCreateWebsite = () => {
   return useMutation({
      mutationFn: async (data: CreateUrlSchema) => {
         const response = await ax.post<{ success: boolean; message: string }>(
            API_ROUTES.CREATE_WEBSITE,
            data
         );
         return response.data;
      },
   });
};
