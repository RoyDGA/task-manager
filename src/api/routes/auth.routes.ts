import {Router} from "express";
import {registerController, loginController} from "../../controllers/auth.controller.js";

const router = Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Registrar un usuario
 *     description: Crea una cuenta nueva para utilizar la API.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: User123
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user123@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: user123
 *     responses:
 *       "201":
 *         description: Usuario registrado correctamente.
 *       "400":
 *         description: Datos inválidos.
 *       "409":
 *         description: El correo ya está registrado.
 *       "500":
 *         description: Error interno del servidor.
 */
router.post("/auth/register", registerController);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Iniciar sesión
 *     description: Verifica las credenciales y devuelve un token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user123@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: user123
 *     responses:
 *       "200":
 *         description: Inicio de sesión correcto.
 *       "401":
 *         description: Credenciales incorrectas.
 *       "500":
 *         description: Error interno del servidor.
 */
router.post("/auth/login", loginController);

export default router;