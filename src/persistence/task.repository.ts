import pool from "../config/database.js";

export async function createTask(
    title: string,
    description: string,
    dueDate: string,
    status: string,
    userId: number
){
    const result = await pool.query(
        `INSERT INTO tasks (title, description, due_date, status, user_id)
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING id, title, description, due_date, status, user_id, created_at`, 
        [title, description, dueDate, status, userId]);

    return result.rows[0];
}

export async function getTasksByUserId(userId: number){
    const result = await pool.query(
        `SELECT id, title, description, due_date, status, user_id, created_at 
        FROM tasks WHERE user_id = $1
        ORDER BY created_at DESC`, 
        [userId]
    );

    return result.rows;
}

export async function getTaskById(taskId: number, userId: number){
    const result = await pool.query(
        `SELECT id, title, description, due_date, status, user_id, created_at 
        FROM tasks 
        WHERE id = $1 AND user_id = $2`, 
        [taskId, userId]
    );

    return result.rows[0];
} 