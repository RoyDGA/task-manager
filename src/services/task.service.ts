import {
    createTask, 
    getTasksByUserId, 
    getTaskById, 
    updateTask, 
    deleteTask
} from "../persistence/task.repository.js";

export async function createTaskService(
    title: string,
    description: string,
    dueDate: string,
    status: string,
    userId: number
){
    return await createTask(title, description, dueDate, status, userId);
}

export async function getTasksService(userId: number){
    return await getTasksByUserId(userId);
}

export async function getTaskService(
    taskId: number, 
    userId: number
){
    return await getTaskById(taskId, userId);
}

export async function updateTaskService(
    taskId: number,
    title: string,
    description: string,
    dueDate: string,
    status: string,
    userId: number
){
    return await updateTask(
        taskId, 
        title, 
        description, 
        dueDate, 
        status, 
        userId
    );
}

export async function deleteTaskService(
    taskId: number,
    userId: number
){
    return await deleteTask(taskId, userId);
}