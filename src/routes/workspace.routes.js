import { Router } from "express";
import createWorkspaceById from "../controllers/workspace/createWorkspaceById.js";

const router = Router();

router.post('/',createWorkspaceById)

export default router;