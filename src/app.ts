import express from "express";
import healthRoutes from "./api/routes/health.routes.js";
import authRoutes from "./api/routes/auth.routes.js";
import taskRoutes from "./api/routes/task.routes.js";
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

export default app;