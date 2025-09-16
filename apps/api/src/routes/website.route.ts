import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";

const router: Router = Router();

router.use(authenticateToken);

router.post("/", (req, res) => {
  // Create a new website to monitor
  res.json({ message: "Create website endpoint" });
});

router.get("/all", (req, res) => {
  // Get all websites for the authenticated user
  res.json({ message: "Get all websites endpoint" });
});

router.get("/status", (req, res) => {
  // Get status of all websites
  res.json({ message: "Get websites status endpoint" });
});

router.get("/:id", (req, res) => {
  // Get specific website by ID
  res.json({ message: `Get website ${req.params.id} endpoint` });
});

router.delete("/:id", (req, res) => {
  // Delete specific website by ID
  res.json({ message: `Delete website ${req.params.id} endpoint` });
});

export default router;
