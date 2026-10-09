import {Router} from "express";
import {authMiddleware} from "../middlewares/auth.middleware.js";
import {
    createTaskController,
    getTasksController,
    getTaskController,
    updateTaskController,
    deleteTaskController
} from "../../controllers/task.controller.js";

const router = Router();

router.post("/tasks", authMiddleware, createTaskController);
router.get("/tasks", authMiddleware, getTasksController);
router.get("/tasks/:id", authMiddleware, getTaskController);
router.put("/tasks/:id", authMiddleware, updateTaskController);
router.delete("/tasks/:id", authMiddleware, deleteTaskController);

export default router;