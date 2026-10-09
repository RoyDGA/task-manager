import {Router} from "express";
import {authMiddleware} from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { taskSchema } from "../../validators/task.schema.js";
import {
    createTaskController,
    getTasksController,
    getTaskController,
    updateTaskController,
    deleteTaskController
} from "../../controllers/task.controller.js";

const router = Router();

router.post(
    "/tasks", 
    authMiddleware,
    validateBody(taskSchema), 
    createTaskController
);
router.get(
    "/tasks", 
    authMiddleware, 
    getTasksController
);
router.get(
    "/tasks/:id", 
    authMiddleware, 
    getTaskController
);
router.put(
    "/tasks/:id", 
    authMiddleware,
    validateBody(taskSchema),
    updateTaskController
);
router.delete(
    "/tasks/:id", 
    authMiddleware, 
    deleteTaskController
);

export default router;