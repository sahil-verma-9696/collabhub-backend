import { Router } from "express";
import createTasks from "../controllers/task/createTasks.js";
// import deleteTaskById from "../controllers/task/deleteTaskById.js";
// import updateTaskById from "../controllers/task/updateTaskById.js";
const router = Router({ mergeParams: true });


// router.get("/" , getAllTasks);
router.post("/" , createTasks);
// router.patch("/:task_id" , updateTaskById);
// router.delete("/:task_id" , deleteTaskById);

export default router;
