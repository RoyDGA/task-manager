import express from "express";
import healthRoutes from "./api/routes/health.routes.js";
import authRoutes from "./api/routes/auth.routes.js";
import pool from "./config/database.js";
import { authMiddleware } from "./api/middlewares/auth.middleware.js";

const app = express();
app.use(express.json());
const PORT = 3000;

app.use(healthRoutes);
app.use(authRoutes);

app.get("/protected", authMiddleware, (_req, res) =>{
    res.json({ 
        message: "Acceso concedido a la ruta protegida",
        userId: res.locals.userId
    });
});

app.listen(PORT, async () => {
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});

try {
    await pool.query("SELECT NOW()");
    console.log('Conexión postgreSQL correcta');
    
} catch (error) {
    console.log('Error al conectar: ', error);
}