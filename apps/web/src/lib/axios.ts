import { getBearerToken } from "@/utils/token";
import axios from "axios";
const apiBase: string = import.meta.env.VITE_API_BASE_URL;

const ax = axios.create({
  baseURL: apiBase,
  withCredentials: true,
});

ax.interceptors.request.use(config => {
  config.headers["Authorization"] = `Bearer ${getBearerToken()}`;
  return config;
});

export default ax;
