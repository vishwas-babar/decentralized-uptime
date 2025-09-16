import { useMutation } from "@tanstack/react-query";
import type { RegisterUser } from "@repo/schema/types";
import axios from "axios";
import { API_ROUTES } from "../api-routes";

const useRegisterUser = () => {
  return useMutation({
    mutationFn: async (data: RegisterUser) => {
      const response = await axios.post(API_ROUTES.REGISTER, data);
      if (response.status !== 201) {
        throw new Error("Registration failed");
      }
      return response.data;
    },
  });
};

export default useRegisterUser;
