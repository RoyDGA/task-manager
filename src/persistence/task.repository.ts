import pool from "../config/database.js";

export async function createTask(
    title: string,
    description: string,
    dueDate: string,
    status: string,
    userId: number
){
    const result = await pool.query(
        `INSERT INTO task (title, description, due_date, status, user_id)
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING id, title, description, due_date, status, user_id, created_at`, 
        [title, description, dueDate, status, userId]);
        
    return result.rows[0];
}