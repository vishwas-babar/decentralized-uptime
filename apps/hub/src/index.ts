import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 12001;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
   res.send("Hello, Hub Express + TypeScript is live! 🚀");
});

app.post("/data", (req: Request, res: Response) => {
   const body = req.body;
   res.json({ message: "Data received from Hub!", body });
});

// Start server
app.listen(PORT, () => {
   console.log(`✅ Hub Server running at http://localhost:${PORT}`);
});
