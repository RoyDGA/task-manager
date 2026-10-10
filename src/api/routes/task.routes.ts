import {Router} from "express";
import {authMiddleware} from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { taskSchema } from "../../validators/task.schema.js";
import {
    createTaskController,
    getTasksController,
    getTaskController,
    updateTaskController,
    deleteTaskController
} from "../../controllers/task.controller.js";

const router = Router();

/**
 * @openapi
 * /tasks:
 *   post:
 *     tags:
 *       - Tasks
 *     summary: Crear una tarea
 *     description: Crea una tarea asociada al usuario autenticado.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - dueDate
 *               - status
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 200
 *                 example: Terminar la prueba técnica
 *               description:
 *                 type: string
 *                 maxLength: 5000
 *                 example: Documentar los endpoints con Swagger
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-10-15"
 *               status:
 *                 type: string
 *                 enum: [pendiente, en curso, completada]
 *                 example: pendiente
 *     responses:
 *       "201":
 *         description: Tarea creada correctamente.
 *       "400":
 *         description: Datos inválidos.
 *       "401":
 *         description: Token ausente o inválido.
 */
router.post(
    "/tasks", 
    authMiddleware,
    validateBody(taskSchema), 
    createTaskController
);

/**
 * @openapi
 * /tasks:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Listar mis tareas
 *     description: Devuelve las tareas del usuario autenticado.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Lista de tareas obtenida correctamente.
 *       "401":
 *         description: Token ausente o inválido.
 */
router.get(
    "/tasks", 
    authMiddleware, 
    getTasksController
);

/**
 * @openapi
 * /tasks/{id}:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Obtener una tarea por ID
 *     description: Devuelve una tarea perteneciente al usuario autenticado.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea.
 *     responses:
 *       "200":
 *         description: Tarea encontrada.
 *       "401":
 *         description: Token ausente o inválido.
 *       "404":
 *         description: Tarea no encontrada.
 */
router.get(
    "/tasks/:id", 
    authMiddleware, 
    getTaskController
);

/**
 * @openapi
 * /tasks/{id}:
 *   put:
 *     tags:
 *       - Tasks
 *     summary: Actualizar una tarea
 *     description: Actualiza una tarea perteneciente al usuario autenticado.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - dueDate
 *               - status
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 200
 *               description:
 *                 type: string
 *                 maxLength: 5000
 *               dueDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [pendiente, en curso, completada]
 *     responses:
 *       "200":
 *         description: Tarea actualizada correctamente.
 *       "400":
 *         description: Datos inválidos.
 *       "401":
 *         description: Token ausente o inválido.
 *       "404":
 *         description: Tarea no encontrada.
 */
router.put(
    "/tasks/:id", 
    authMiddleware,
    validateBody(taskSchema),
    updateTaskController
);

/**
 * @openapi
 * /tasks/{id}:
 *   delete:
 *     tags:
 *       - Tasks
 *     summary: Eliminar una tarea
 *     description: Elimina una tarea perteneciente al usuario autenticado.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea.
 *     responses:
 *       "200":
 *         description: Tarea eliminada correctamente.
 *       "401":
 *         description: Token ausente o inválido.
 *       "404":
 *         description: Tarea no encontrada.
 */
router.delete(
    "/tasks/:id", 
    authMiddleware, 
    deleteTaskController
);

export default router;