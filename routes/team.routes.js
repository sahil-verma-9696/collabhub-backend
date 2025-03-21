import { Router } from "express";
import { ROUTES } from "./constants.js";
import {
  createTeam,
  listTeam,
  getTeamDetails,
  updateTeam,
  deleteTeam
} from "../controllers/team.controller.js";
import { isProtected } from "../middleware/protected.middleware.js";

export const router = Router();

router.get(ROUTES.TEAM.LIST, isProtected, listTeam);
router.get(ROUTES.TEAM.DETAILS, isProtected, getTeamDetails);

router.post(ROUTES.TEAM.CREATE, isProtected, createTeam);

router.put(ROUTES.TEAM.UPDATE, isProtected, updateTeam);

router.delete(ROUTES.TEAM.DELETE, isProtected, deleteTeam);