import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("Autenticación", () => {
    const user = {
        name: "Usuario de pruebas",
        email: `test-${Date.now()}@example.com`,
        password: "TestPassword123!",
    };

    it("debe registrar un usuario nuevo", async () => {
        const response = await request(app)
            .post("/auth/register")
            .send(user);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty(
            "message",
            "Usuario registrado correctamente"
        );
        expect(response.body).toHaveProperty("user");
    });

    it("debe iniciar sesión y devolver un token", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password,
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
        expect(typeof response.body.token).toBe("string");
        expect(response.body.token.length).toBeGreaterThan(0);
    });

    it("debe rechazar una contraseña incorrecta", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                email: user.email,
                password: "WrongPassword123!",
            });

        expect(response.status).toBe(401);
    });
});