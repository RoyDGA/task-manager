import { randomUUID } from "node:crypto";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import app from "../app.js";

const taskBody = {
    title: "Tarea de integración",
    description: "Tarea creada durante las pruebas de integración",
    dueDate: "2099-12-31",
    status: "pendiente",
};

async function registerAndLogin(name: string) {
    const credentials = {
        name,
        email: `tasks-${randomUUID()}@example.com`,
        password: "TestPassword123!",
    };

    const registration = await request(app)
        .post("/auth/register")
        .send(credentials);

    expect(registration.status).toBe(201);

    const login = await request(app)
        .post("/auth/login")
        .send({
            email: credentials.email,
            password: credentials.password,
        });

    expect(login.status).toBe(200);
    expect(login.body.token).toEqual(expect.any(String));

    return login.body.token;
}

describe("API de tareas", () => {
    let ownerToken: string;
    let otherUserToken: string;
    const createdTaskIds = new Set<number>();

    beforeAll(async () => {
        ownerToken = await registerAndLogin("Propietario de tareas");
        otherUserToken = await registerAndLogin("Otro usuario");
    });

    afterEach(async () => {
        for (const taskId of createdTaskIds) {
            const response = await request(app)
                .delete(`/tasks/${taskId}`)
                .set("Authorization", `Bearer ${ownerToken}`);

            expect(response.status).toBe(200);
        }

        createdTaskIds.clear();
    });

    async function createTask(token = ownerToken) {
        const response = await request(app)
            .post("/tasks")
            .set("Authorization", `Bearer ${token}`)
            .send(taskBody);

        expect(response.status).toBe(201);
        expect(response.body.task).toHaveProperty("id");

        const taskId = response.body.task.id as number;
        if (token === ownerToken) {
            createdTaskIds.add(taskId);
        }

        return response.body.task;
    }

    it("rechaza el acceso a tareas sin token", async () => {
        const response = await request(app).get("/tasks");

        expect(response.status).toBe(401);
    });

    it("rechaza una tarea con datos inválidos", async () => {
        const response = await request(app)
            .post("/tasks")
            .set("Authorization", `Bearer ${ownerToken}`)
            .send({ ...taskBody, status: "invalido" });

        expect(response.status).toBe(400);
    });

    it("crea una tarea para el usuario autenticado", async () => {
        const task = await createTask();

        expect(task).toMatchObject({
            title: taskBody.title,
            description: taskBody.description,
            status: taskBody.status,
            user_id: expect.any(Number),
        });
    });

    it("lista solo las tareas del usuario autenticado", async () => {
        const task = await createTask();
        const response = await request(app)
            .get("/tasks")
            .set("Authorization", `Bearer ${ownerToken}`);

        expect(response.status).toBe(200);
        expect(response.body.tasks.map((item: { id: number }) => item.id))
            .toContain(task.id);
    });

    it("obtiene una tarea por su ID", async () => {
        const task = await createTask();
        const response = await request(app)
            .get(`/tasks/${task.id}`)
            .set("Authorization", `Bearer ${ownerToken}`);

        expect(response.status).toBe(200);
        expect(response.body.task.id).toBe(task.id);
    });

    it("actualiza una tarea propia", async () => {
        const task = await createTask();
        const updatedTask = {
            ...taskBody,
            title: "Tarea actualizada",
            status: "en curso",
        };
        const response = await request(app)
            .put(`/tasks/${task.id}`)
            .set("Authorization", `Bearer ${ownerToken}`)
            .send(updatedTask);

        expect(response.status).toBe(200);
        expect(response.body.task).toMatchObject({
            title: updatedTask.title,
            description: updatedTask.description,
            status: updatedTask.status,
        });
    });

    it("no permite consultar, actualizar ni eliminar la tarea de otro usuario", async () => {
        const task = await createTask();
        const headers = { Authorization: `Bearer ${otherUserToken}` };

        const getResponse = await request(app)
            .get(`/tasks/${task.id}`)
            .set(headers);
        const updateResponse = await request(app)
            .put(`/tasks/${task.id}`)
            .set(headers)
            .send({ ...taskBody, title: "Acceso no autorizado" });
        const deleteResponse = await request(app)
            .delete(`/tasks/${task.id}`)
            .set(headers);

        expect(getResponse.status).toBe(404);
        expect(updateResponse.status).toBe(404);
        expect(deleteResponse.status).toBe(404);
    });

    it("elimina una tarea propia", async () => {
        const task = await createTask();
        const deleteResponse = await request(app)
            .delete(`/tasks/${task.id}`)
            .set("Authorization", `Bearer ${ownerToken}`);

        expect(deleteResponse.status).toBe(200);
        createdTaskIds.delete(task.id);

        const getResponse = await request(app)
            .get(`/tasks/${task.id}`)
            .set("Authorization", `Bearer ${ownerToken}`);

        expect(getResponse.status).toBe(404);
    });
});
