import { useMutation } from "@tanstack/react-query";
import type { RegisterUser } from "@repo/schema/types";
import { API_ROUTES } from "../api-routes";
import ax from "../axios";

const useRegisterUser = () => {
  return useMutation({
    mutationFn: async (data: RegisterUser) => {
      const response = await ax.post(API_ROUTES.REGISTER, data);
      if (response.status !== 201) {
        throw new Error("Registration failed");
      }
      return response.data;
    },
  });
};

export default useRegisterUser;
