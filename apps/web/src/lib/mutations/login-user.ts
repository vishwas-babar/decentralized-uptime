import { useMutation } from "@tanstack/react-query";
import type { LoginUser } from "@repo/schema/types";
import axios from "axios";
import { API_ROUTES } from "../api-routes";

const useLoginUser = () => {
  return useMutation({
    mutationFn: async (data: LoginUser) => {
      const response = await axios.post(API_ROUTES.LOGIN, data);
      if (response.status !== 200) {
        throw new Error("Login failed");
      }
      return response.data;
    },
  });
};

export default useLoginUser;
