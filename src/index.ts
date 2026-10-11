import app from "./app.js";
import pool from "./config/database.js";

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