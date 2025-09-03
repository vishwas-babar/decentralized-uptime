import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 12002;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Validator Express + TypeScript is live! 🚀");
});

app.post("/data", (req: Request, res: Response) => {
  const body = req.body;
  res.json({ message: "Data received from Validator!", body });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Validator Server running at http://localhost:${PORT}`);
});
