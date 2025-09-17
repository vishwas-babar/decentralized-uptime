import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import {
   getSessionUser,
   handleLoginUser,
   handleRegisterUser,
} from "../controllers/user.controller";

const router: Router = Router();

router.post("/login", handleLoginUser);

router.post("/register", handleRegisterUser);

router.use(authenticateToken);

router.get("/session", getSessionUser);

export default router;
