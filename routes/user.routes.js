import { Router } from "express";
import { ROUTES } from "./constants.js";
import {
  updateProfileByUser,
  userProfile,
} from "../controllers/user.controller.js";

export const router = Router();

router.get(ROUTES.USER.PROFILE, userProfile);

router.post(ROUTES.USER.UPDATE, updateProfileByUser);
