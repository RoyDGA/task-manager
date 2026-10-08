import express from "express";
import healthRoutes from "./api/routes/health.routes.js";
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log('Servidor ejecutandose en el puerto: ', PORT);
});