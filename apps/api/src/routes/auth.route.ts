import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import {
   getSessionUser,
   getUserStats,
   handleLoginUser,
   handleRegisterUser,
} from "../controllers/user.controller";

const router: Router = Router();

router.post("/login", handleLoginUser);

router.post("/register", handleRegisterUser);

router.use(authenticateToken);

router.get("/session", getSessionUser);

router.get("/stats", getUserStats);

export default router;
