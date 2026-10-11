import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("Autenticación de rutas", () => {
    it("debe rechazar GET /tasks cuando no se envía un token", async () => {
        const response = await request(app).get("/tasks");

        expect(response.status).toBe(401);
    });
});