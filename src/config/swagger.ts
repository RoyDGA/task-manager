import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Manager API",
            version: "1.0.0",
            description: "API para gestionar usuarios y tareas con autenticación JWT.",
        },
        servers: [
            {
                url: "https://task-manager-api-s9pi.onrender.com",
                description: "Servidor de producción en Render",
            },
            {
                url: "http://localhost:3000",
                description: "Servidor local de desarrollo",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Ingresa el token JWT otorgado al iniciar sesión.",
                },
            },
        },
    },
    apis: ["./src/api/routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);