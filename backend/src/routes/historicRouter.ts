import { Router } from 'express'
import { historic, deleteHistoric } from '../controllers/historicController'

const historicCheckRouter = Router()

/**
 * @swagger
 * /api/historico:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Lista o histórico de checagens do usuário
 *     tags: [Histórico]
 *     responses:
 *       200:
 *         description: Lista o histórico de checagens do usuário
 *       400:
 *        description: User not authenticated
 *       500:
 *        description: An unknown error occurred
 */
historicCheckRouter.get('/historico', historic)

/**
 * @swagger
 * /api/historico/{id}:
 *   delete:
 *     security:
 *       - BearerAuth: []
 *     summary: Deleta um histórico do usuário
 *     tags: [Histórico]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do histórico a ser excluido
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: History deleted successfully
 *       401:
 *        description: Invalid ID
 *       404:
 *        description: History not found
 *       500:
 *        description: An unknown error occurred
 */
historicCheckRouter.delete('/historico/:id', deleteHistoric)

export default historicCheckRouter
