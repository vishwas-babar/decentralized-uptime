import z from "zod";

export const UrlSchema = z.object({
   url: z.url("Invalid URL"),
});
