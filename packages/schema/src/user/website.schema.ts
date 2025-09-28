import z from "zod";

export const UrlSchema = z.object({
   url: z.url("Invalid URL"),
   name: z
      .string()
      .max(50, "Max 50 character are allowed")
      .min(2, "Min 2 character"),
   checkInterval: z
      .number()
      .min(1, "Minimum check interval is 1 minute")
      .max(1440, "Maximum check interval is 1440 minutes (24 hours)"),
   contactEmail: z.string().email("Invalid email address"),
});
