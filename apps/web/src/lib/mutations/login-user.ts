import { useMutation } from "@tanstack/react-query";
import type { LoginUser } from "@repo/schema/types";
import { API_ROUTES } from "../api-routes";
import ax from "../axios";

const useLoginUser = () => {
  return useMutation({
    mutationFn: async (data: LoginUser) => {
      const response = await ax.post(API_ROUTES.LOGIN, data);
      if (response.status !== 200) {
        throw new Error("Login failed");
      }
      return response.data;
    },
  });
};

export default useLoginUser;
