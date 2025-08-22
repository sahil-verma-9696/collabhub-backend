import { Router } from "express";
import createTaskById from "../controllers/task/createTaskById.js";
import deleteTaskById from "../controllers/task/deleteTaskById.js";
import updateTaskById from "../controllers/task/updateTaskById.js";
const router = Router();


router.post("/module/:module_id/create" , createTaskById);
router.post("/:task_id" , deleteTaskById);
router.post("/:task_id",  updateTaskById);


export default router;