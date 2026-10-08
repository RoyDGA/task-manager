import express from "express";
import healthRoutes from "./api/routes/health.routes.js";
import pool from "./config/database.js";

const app = express();
const PORT = 3000;

app.use(healthRoutes);

app.listen(PORT, () => {
    console.log('Servidor ejecutandose en el puerto: ', PORT);
});

try {
    await pool.query("SELECT NOW()");
    console.log('Conexión postgreSQL correcta');
    
} catch (error) {
    console.log('Error al conectar: ', error);
}