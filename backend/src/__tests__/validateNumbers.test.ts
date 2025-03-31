import { validateNumbers } from '../utils/validateNumbers'

describe('validateNumbers', () => {
	it('deve retornar erro se os números não forem numéricos', () => {
		const result = validateNumbers('a' as any, 5)
		expect(result.valid).toBe(false)
		expect(result.error).toBe('Os valores devem ser numéricos')
		expect(result.status).toBe(400)
	})

	it('deve retornar erro se os números forem negativos', () => {
		const result = validateNumbers(-1, 5)
		expect(result.valid).toBe(false)
		expect(result.error).toBe('Números não podem ser negativos')
		expect(result.status).toBe(400)
	})

	it('deve retornar erro se os números tiverem mais de 12 dígitos', () => {
		const result = validateNumbers(1234567890123, 12345678901234)
		expect(result.valid).toBe(false)
		expect(result.error).toBe('Limite de 12 dígitos excedido')
		expect(result.status).toBe(422)
	})

	it('deve retornar sucesso se os números forem válidos', () => {
		const result = validateNumbers(123, 456)
		expect(result.valid).toBe(true)
		expect(result.status).toBe(200)
	})
})
