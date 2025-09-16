const apiBase: string = import.meta.env.VITE_API_BASE_URL;

export const API_ROUTES = {
  LOGIN: `${apiBase}/auth/login`,
  REGISTER: `${apiBase}/auth/register`,
  SESSION: `${apiBase}/auth/session`,
};
