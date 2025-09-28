import prisma from "@repo/db";
import { Request, Response } from "express";
import { UrlSchema } from "@repo/schema";
import { formatZodError } from "../utils/zodError";
import { calculateWebsitesStats } from "../helpers";

export const handleGenerateWebsite = async (req: Request, res: Response) => {
   const { url, name, checkInterval, contactEmail } = req.body;
   const { id: userId } = req.user;

   try {
      const parsed = UrlSchema.safeParse({
         url,
         name,
         checkInterval,
         contactEmail,
      });
      if (!parsed.success) {
         return res.status(400).json({
            success: false,
            message: formatZodError(parsed.error),
            errors: parsed.error.format(),
         });
      }

      const website = await prisma.website.create({
         data: {
            url: parsed.data.url,
            name: parsed.data.name,
            checkInterval: parsed.data.checkInterval,
            contactEmail: parsed.data.contactEmail,
            user: { connect: { id: userId } },
         },
      });

      res.status(201).json({
         success: true,
         message: "Website created successfully",
         data: website,
      });
   } catch (error) {
      console.error("Failed to create the website:", error);
      res.status(500).json({
         success: false,
         message: "Server error",
      });
   }
};

export const handleGetAllWebsiteForUser = async (
   req: Request,
   res: Response
) => {
   const { id: userId } = req.user;

   try {
      const websites = await prisma.website.findMany({
         where: { userId },
      });

      res.status(200).json({
         success: true,
         message: "Websites fetched successfully",
         data: websites,
      });
   } catch (error) {
      console.error("Failed to fetch websites:", error);
      res.status(500).json({
         success: false,
         message: "Server error",
      });
   }
};

export const handleGetWebsiteStatus = async (req: Request, res: Response) => {
   const { id: userId } = req.user;

   try {
      const websites = await prisma.website.findMany({
         where: {
            userId,
            disabled: false,
         },
         include: {
            ticks: {
               take: 50, // Get last 50 ticks
               orderBy: {
                  createdAt: "desc",
               },
               include: {
                  validator: {
                     select: {
                        id: true,
                        location: true,
                        ip: true,
                     },
                  },
               },
            },
         },
         orderBy: {
            createdAt: "desc",
         },
      });

      // Transform the data to include uptime calculations and status summary
      const websitesWithStats = calculateWebsitesStats(websites);

      res.status(200).json({
         success: true,
         message: "Website statuses fetched successfully",
         data: websitesWithStats,
         meta: {
            timeRange: "Last 50 ticks",
            timestamp: new Date().toISOString(),
            totalWebsites: websitesWithStats.length,
         },
      });
   } catch (error) {
      console.error("Failed to fetch website statuses:", error);
      res.status(500).json({
         success: false,
         message: "Server error",
      });
   }
};

export const handleGetWebsiteById = async (req: Request, res: Response) => {
   const { id: userId } = req.user;
   const { id } = req.params;

   try {
      const website = await prisma.website.findFirst({
         where: { id, userId },
      });

      if (!website) {
         return res.status(404).json({
            success: false,
            message: "Website not found",
         });
      }

      res.status(200).json({
         success: true,
         message: "Website fetched successfully",
         data: website,
      });
   } catch (error) {
      console.error("Failed to fetch the website:", error);
      res.status(500).json({
         success: false,
         message: "Server error",
      });
   }
};

export const handleDeleteWebsiteById = async (req: Request, res: Response) => {
   const { id: userId } = req.user;
   const { id } = req.params;

   try {
      const website = await prisma.website.update({
         where: { id, userId },
         data: { disabled: true },
      });

      if (!website) {
         return res.status(404).json({
            success: false,
            message: "Website not found",
         });
      }

      res.status(200).json({
         success: true,
         message: "Website deleted successfully",
      });
   } catch (error) {
      console.error("Failed to delete the website:", error);
      res.status(500).json({
         success: false,
         message: "Server error",
      });
   }
};
