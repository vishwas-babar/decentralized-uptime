import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";

const router: Router = Router();

router.use(authenticateToken);

router.post("/");

router.get("/all");

router.get("/status");

router.get("/:id");

router.delete("/:id");

export default router;
