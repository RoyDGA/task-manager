import express from "express";
import healthRoutes from "./api/routes/health.routes.js";
import authRoutes from "./api/routes/auth.routes.js";
import taskRoutes from "./api/routes/task.routes.js";
import pool from "./config/database.js";
import { errorMiddleware } from "./api/middlewares/error.middleware.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(healthRoutes);
app.use(authRoutes);
app.use(taskRoutes);

app.use(errorMiddleware);


app.listen(PORT, async () => {
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});

try {
    await pool.query("SELECT NOW()");
    console.log('Conexión postgreSQL correcta');
    
} catch (error) {
    console.log('Error al conectar: ', error);
}