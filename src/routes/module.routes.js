import { Router } from "express";
import createModule from "../controllers/module/createModule.js";
import updateModule from "../controllers/module/updateModule.js";
import getModule from "../controllers/module/getModule.js";
import getAllModules from "../controllers/module/getAllModule.js";

const router = Router({ mergeParams: true })

router.get("/", getAllModules);
router.post("/",createModule);
router.get("/:module_id", getModule);
router.put("/:module_id", updateModule);

export default router;