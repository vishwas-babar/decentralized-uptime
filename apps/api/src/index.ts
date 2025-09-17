import express, { Request, Response } from "express";
import { config } from "./config";
import authRoute from "./routes/auth.route";
import websiteRoute from "./routes/website.route";
import validatorRoute from "./routes/validator.route";
import cors from "cors";
import prisma from "@repo/db";

const app = express();

app.use(
   cors({
      origin: config.CORS_ORIGIN,
      credentials: true,
   })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", async (req: Request, res: Response) => {
   try {
      await prisma.$queryRaw`SELECT 1`;
      res.status(200).send("OK");
   } catch (error) {
      res.status(500).send("Database connection error");
   }
});

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/website", websiteRoute);
app.use("/api/v1/validator", validatorRoute);

// Start server
app.listen(config.PORT, () => {
   console.log(`✅ API Server running at http://localhost:${config.PORT}`);
});
