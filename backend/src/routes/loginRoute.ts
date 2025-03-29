import { Router } from "express";
import { login } from "../controllers/loginController";

const userRouter = Router();

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login de um usuário
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
 *       200:
 *         description: Usuários criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   token:
 *                     type: string
 *                     example: "6434i5ht8v8c5tu45u59c59et9ce9t6y45-c9"
 *       422:
 *        description: Email and password are required
 *       404:
 *        description: Invalid email or password
 *       500:
 *        description: An unknown error occurred
 */
userRouter.post("/login", login);

export default userRouter;
