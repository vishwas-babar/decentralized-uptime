import express, { Request, Response } from "express";
import { config } from "./config";
import prisma from "@repo/db";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Start server
app.listen(config.PORT, () => {
  console.log(`✅ API Server running at http://localhost:${config.PORT}`);
});
