import {Router} from "express";
import createWorkSpace from "../controllers/workspace/createWorkspace.js";
import getWorkspace from "../controllers/workspace/getWorkspace.js";
import getWorkspaceById from "../controllers/workspace/getWorkspaceById.js";
import updateWorkspace from "../controllers/workspace/updateWorkspace.js";
import deleteWorkspace from "../controllers/workspace/deleteWorkspcace.js";

const router = Router();

router.post("/", createWorkSpace);
router.get("/", getWorkspace);
router.get("/:workspace_id", getWorkspaceById);
router.put("/:workspace_id", updateWorkspace);
router.delete("/:workspace_id", deleteWorkspace);

export default router;