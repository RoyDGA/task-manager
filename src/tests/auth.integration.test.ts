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

    it("debe rechazar un correo con formato inválido", async () => {
        const response = await request(app)
            .post("/auth/register")
            .send({ ...user, email: "correo-invalido" });

        expect(response.status).toBe(400);
        expect(response.body.message).toContain("Datos inválidos");
    });

    it("debe rechazar campos requeridos vacíos o faltantes", async () => {
        const emptyNameResponse = await request(app)
            .post("/auth/register")
            .send({ ...user, name: "" });
        const missingPasswordResponse = await request(app)
            .post("/auth/register")
            .send({
                name: user.name,
                email: `missing-password-${Date.now()}@example.com`,
            });

        expect(emptyNameResponse.status).toBe(400);
        expect(emptyNameResponse.body.message).toContain("Datos inválidos");
        expect(missingPasswordResponse.status).toBe(400);
        expect(missingPasswordResponse.body.message).toContain("Datos inválidos");
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