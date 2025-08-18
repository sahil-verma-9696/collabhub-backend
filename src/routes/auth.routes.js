import { Router } from "express";

import { signup } from "../controllers/auth/signup.controller.js";
import { login } from "../controllers/auth/login.controller.js";
import { logout } from "../controllers/auth/logout.controller.js";
import { protect } from "../middleware/authMiddleware.js";
import { me } from "../controllers/auth/me.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, me);
router.get("/logout",protect,logout)

export default router;
