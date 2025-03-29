import { Router } from "express";
import { createUser } from "../controllers/userController";

const userRouter = Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cria um usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "usuario@email.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuários criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     example: "user@mail.com"
 *                   passowrd:
 *                     type: string
 *                     example: "123456"
 *       422:
 *        description: Email and password are required
 *       409:
 *        description: Email is already in use
 *       500:
 *        description: An unknown error occurred
 */
userRouter.post("/users", createUser);

export default userRouter;
