import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import {
   handleDeleteWebsiteById,
   handleGenerateWebsite,
   handleGetAllWebsiteForUser,
   handleGetWebsiteById,
   handleGetWebsiteStatus,
} from "../controllers/website.controller";

const router: Router = Router();

router.use(authenticateToken);

router.post("/", handleGenerateWebsite);

router.get("/all", handleGetAllWebsiteForUser);

router.get("/status", handleGetWebsiteStatus);

router.get("/:id", handleGetWebsiteById);

router.delete("/:id", handleDeleteWebsiteById);

export default router;
