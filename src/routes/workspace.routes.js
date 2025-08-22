import {Router} from "express";
import createWorkSpace from "../controllers/workspace/createWorkspace.js";
import { protect } from "../middleware/authMiddleware.js";
import getWorkspace from "../controllers/workspace/getWorkspace.js";
import getWorkspaceById from "../controllers/workspace/getWorkspaceById.js";
import updateWorkspace from "../controllers/workspace/updateWorkspace.js";
import deleteWorkspace from "../controllers/workspace/deleteWorkspcace.js";

const router = Router();

router.post("/",protect, createWorkSpace);
router.get("/",protect, getWorkspace);
router.get("/:id",protect, getWorkspaceById);
router.put("/:id",protect, updateWorkspace);
router.delete("/:id",protect, deleteWorkspace);

export default router;