import { Request, Response } from 'express'
import prisma from '../prisma'
import { validateNumbers } from '../utils/validateNumbers'
import { areSiameseNumbers } from '../utils/siameseNumbers'

export const equalityCheck = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { numero1, numero2 } = req.body
		const id = req.user

		if (!id) {
			res.status(422).json({
				error: 'Invalid request',
			})
			return
		}

		const userExists = await prisma.user.findUnique({
			where: { id: +id },
		})

		if (!userExists) {
			res.status(404).json({ error: 'User not found' })
			return
		}

		if (!numero1 || !numero2) {
			res.status(422).json({
				error: 'Dois números são necessários',
			})
			return
		}

		const validationNumbers = validateNumbers(numero1, numero2)

		if (!validationNumbers.valid) {
			res.status(validationNumbers.status).json({
				error: validationNumbers.error,
			})
			return
		}

		const siameseNumbers = areSiameseNumbers(numero1, numero2)

		const newHistory = await prisma.equalityCheck.create({
			data: {
				numero1,
				numero2,
				resultado: siameseNumbers,
				userId: +id,
			},
		})

		res.status(200).json({
			newHistory: {
				...newHistory,
				numero1: newHistory.numero1.toString(),
				numero2: newHistory.numero2.toString(),
			},
		})
		return
	} catch (error) {
		res.status(500).json({
			error:
				error instanceof Error
					? error.message
					: 'An unknown error occurred',
		})
		return
	}
}
