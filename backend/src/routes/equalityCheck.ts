import { Router } from "express";
import { equalityCheck } from "../controllers/equalityCheckController";

const equalityCheckRouter = Router();

/**
 * @swagger
 * /api/irmaos-siameses:
 *   post:
 *     summary: Checa se dois números são siameses
 *     tags: [Checagens]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero1:
 *                 type: integer
 *                 example: 21
 *               numero2:
 *                 type: integer
 *                 example: 12
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
equalityCheckRouter.post("/irmaos-siameses", equalityCheck);

export default equalityCheckRouter;
