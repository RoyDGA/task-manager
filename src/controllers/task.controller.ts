import type { Request, Response, NextFunction } from "express";
import { 
    createTaskService, 
    getTasksService, 
    getTaskService, 
    updateTaskService, 
    deleteTaskService 
} from "../services/task.service.js";

export async function createTaskController(
    req: Request,
    res: Response,
    next: NextFunction
){
    try {
        const { title, description, dueDate, status} = req.body;
        const userId = res.locals.userId;

        if(!title || !description || !dueDate || !status){
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        const task = await createTaskService(
            title,
            description,
            dueDate,
            status,
            userId
        );

        return res.status(201).json({
            message: "Task created successfully",
            task
        });

    } catch (error) {
        return next(error);
    }
}

export async function getTasksController(
    _req: Request,
    res: Response,
    next: NextFunction
){
    try {
        const userId = res.locals.userId;
        const tasks = await getTasksService(userId);

        return res.status(200).json({ tasks });
    } catch (error) {
        return next(error);
        
    }
}

export async function getTaskController(
    req: Request,
    res: Response,
    next: NextFunction
){
    try {
        const taskId = Number(req.params.id);
        const userId = res.locals.userId;

        if (!Number.isInteger(taskId) || taskId <= 0) {
            return res.status(400).json({
                message: "Task id not valid"
            });
        }

        const task = await getTaskService(taskId, userId);

        if(!task){
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.status(200).json({ task });

    } catch (error) {
        return next(error);
    }

}

export async function updateTaskController(
    req: Request,
    res: Response,
    next: NextFunction
){
    try {
        const taskId = Number(req.params.id);
        const userId = res.locals.userId;
        const { title, description, dueDate, status } = req.body;

        if(!Number.isInteger(taskId) || taskId <= 0){
            return res.status(400).json({
                message: "Invalid task ID"
            });

        }

        if(!title || !description || !dueDate || !status){
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        const task = await updateTaskService(
            taskId,
            title,
            description,
            dueDate,
            status,
            userId
        );

        if(!task){
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.status(200).json({
            message: "Task updated successfully",
            task
        });

    } catch (error) {
        return next(error);
    }
}

export async function deleteTaskController(
    req: Request,
    res: Response,
    next: NextFunction

){
    try {
        const taskId = Number(req.params.id);
        const userId = res.locals.userId;

        if(!Number.isInteger(taskId) || taskId <= 0){
            return res.status(400).json({
                message: "Task id not valid"
            });
        }

        const task = await deleteTaskService(taskId, userId);

        if(!task){
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error){
        return next(error);
    }
}