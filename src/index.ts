import express from "express";
import healthRoutes from "./api/routes/health.routes.js";
import authRoutes from "./api/routes/auth.routes.js";
import taskRoutes from "./api/routes/task.routes.js";
import pool from "./config/database.js";
import { errorMiddleware } from "./api/middlewares/error.middleware.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(healthRoutes);
app.use(authRoutes);
app.use(taskRoutes);

app.use(errorMiddleware);



const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
    try {
        await pool.query("SELECT NOW()");
        console.log("Conexión PostgreSQL correcta");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Servidor ejecutándose en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error("Error al conectar con PostgreSQL:", error);
        process.exit(1);
    }
}

startServer();