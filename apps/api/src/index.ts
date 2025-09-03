import express, { Request, Response } from "express";
import { config } from "./config";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, API Express + TypeScript is live! 🚀");
});

const lem = "asdfasdf";

app.post("/data", (req: Request, res: Response) => {
  const body = req.body;
  res.json({ message: "Data received from API!", body });
});

// Start server
app.listen(config.PORT, () => {
  console.log(`✅ API Server running at http://localhost:${config.PORT}`);
});
