import { Router } from "express";
import { ROUTES } from "./constants.js";
import {
  updateProfileByUser,
  userProfile,
} from "../controllers/user.controller.js";

export const router = Router();

router.get(ROUTES.USER.PROFILE, userProfile); //✅
// router.get(ROUTES.USER.SEARCH)

router.post(ROUTES.USER.UPDATE, updateProfileByUser); //✅

//TODO:

// router.get(ROUTES.USER.CONNECTIONS)

// router.post(ROUTES.USER.FOLLOW)
// router.post(ROUTES.USER.PREFERENCES)

// router.delete(ROUTES.USER.DELETE);
