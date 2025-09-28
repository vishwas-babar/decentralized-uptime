export const API_ROUTES = {
   LOGIN: `/auth/login`,
   REGISTER: `/auth/register`,
   SESSION: `/auth/session`,

   // website routes
   CREATE_WEBSITE: `/website`,
   GET_USER_WEBSITES: `/website/all`,
   GET_WEBSITE_DETAILS: (id: string) => `/website/${id}`,
   // UPDATE_WEBSITE: (id: string) => `/website/${id}`,
   DELETE_WEBSITE: (id: string) => `/website/${id}`,
   GET_WEBSITE_STATUS: `/website/status`,
};
